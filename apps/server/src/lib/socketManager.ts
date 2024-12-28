import WebSocket from "ws";
import { redisClient, redisSubscriber } from "./redisClient";

export class SocketManager {
  private combinedSocket: WebSocket | null = null;

  constructor() {
    redisSubscriber.subscribe("pairs-channel", (err) => {
      if (err) {
        console.error("[Redis] Error subscribing to pairs-channel: ", err);
        return;
      }

      console.log("[Redis] Subscribed to pairs-channel");
    });

    redisSubscriber.on("message", async (channel, message) => {
      if (channel === "pairs-channel") {
        if (message === "REFRESH") {
          await this.connect();
        }
      }
    });
  }

  private async connect() {
    if (this.combinedSocket) {
      this.combinedSocket.close();
      this.combinedSocket = null;

      console.log("[Socket] Closed");
    }

    const subscribedPairs = await redisClient.smembers("global:subscribedPairs");

    if (
      !subscribedPairs ||
      !Array.isArray(subscribedPairs) ||
      subscribedPairs.length === 0
    )
      return console.log(
        "[Socket] No subscribed symbols found. Skipping connection."
      );

    const symbols = subscribedPairs.map(
      (_symbol) => _symbol.toLowerCase() + "@ticker"
    );

    const socketURL = `wss://stream.binance.com/stream?streams=${symbols.join(
      "/"
    )}`;

    console.log(
      "[SocketManager] Reconnecting combined WS with symbols:",
      symbols
    );

    this.combinedSocket = new WebSocket(socketURL);

    this.combinedSocket.on("open", () => {
      console.log("[SocketManager] Combined WS connected:", socketURL);
    });

    this.combinedSocket.on("message", (data) => {
      try {
        const parsedMessage = JSON.parse(data.toString());

        if (!parsedMessage || !parsedMessage?.stream || !parsedMessage?.data)
          return;

        const [pair] = parsedMessage.stream.split("@");

        redisClient.publish(
          "ticker-channel",
          JSON.stringify({ pair, data: parsedMessage.data })
        );
      } catch (error) {
        console.error("[SocketManager] Error handling message: ", error);
      }
    });

    this.combinedSocket.on("error", (error) => {
      console.error("[SocketManager] Combined WS error: ", error);
    });

    this.combinedSocket.on("close", () => {
      console.log("[SocketManager] Combined WS closed");
    });
  }
}
