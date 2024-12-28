import { Socket, Server } from "socket.io";
import { redisClient, redisSubscriber } from "./redisClient";

export async function handleSubscribePairs(
  socket: Socket,
  userId: string,
  pairs: string[]
) {
  const prevPairs = await redisClient.smembers(`user:${userId}:pairs`);

  const prevPairsSet = new Set(prevPairs || []);
  const newPairsSet = new Set(pairs);

  const addedNewPairs = Array.from(newPairsSet).filter(
    (pair) => !prevPairsSet.has(pair)
  );
  const removedPairs = Array.from(prevPairsSet).filter(
    (pair) => !newPairsSet.has(pair)
  );

  for (const pair of addedNewPairs) {
    await redisClient.sadd(`user:${userId}:pairs`, pair);
    const count = await redisClient.incr(`pair:count:${pair}`);

    if (count === 1) {
      await redisClient.sadd(`global:subscribedPairs`, pair);
    }

    socket.join(pair);

    console.log(
      `[Socket.IO] User ${userId} added subscription to ${pair}, count=${count}`
    );
  }

  for (const pair of removedPairs) {
    await redisClient.srem(`user:${userId}:pairs`, pair);
    const count = await redisClient.decr(`pair:count:${pair}`);

    if (count === 0) {
      await redisClient.del(`pair:count:${pair}`);
      await redisClient.srem("global:subscribedPairs", pair);
    }

    socket.leave(pair);
    console.log(
      `[Socket.IO] User ${userId} removed subscription to ${pair}, count=${count}`
    );
  }

  await redisClient.publish("pairs-channel", `REFRESH`);

}

export async function handleSendPairs(socket: Server,) {
  redisSubscriber.subscribe("ticker-channel", (err) => {
    if (err) {
      console.error("[Redis] Error subscribing to ticker-channel: ", err);
      return;
    }

    console.log("[Redis] Subscribed to ticker-channel");
  });

  redisSubscriber.on("message", (channel, message) => {
    if (channel === "ticker-channel") {
      try {
        const parsedMessage = JSON.parse(message);
        const { pair, data } = parsedMessage;

        socket.to(pair?.toUpperCase()).emit("ticker", data);
      } catch (error) {
        console.error("[Socket.IO] Error handling message: ", error);
      }
    }
  });
}

export async function handleDisconnect(userId: string) {
  await redisClient.del(`user:${userId}:pairs`);
}

