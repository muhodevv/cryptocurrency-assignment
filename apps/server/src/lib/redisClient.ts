import Redis from "ioredis";

const redisOptions = {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: Number(process.env.REDIS_PORT) || 6379,
}

const redisClient = new Redis(redisOptions);

const redisSubscriber = new Redis(redisOptions);

redisClient.on("connect", () => {
  console.log("[Redis] Connected");
});

redisClient.on("error", (err) => {
  console.error("[Redis] Error: ", err);
});

redisSubscriber.on("connect", () => {
  console.log("[Redis] Subscriber Connected");
});

redisSubscriber.on("error", (err) => {
  console.error("[Redis] Subscriber Error: ", err);
});

export { redisClient, redisSubscriber };
