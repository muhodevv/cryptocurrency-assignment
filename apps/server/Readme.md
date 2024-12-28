# Server

## Run the server

```bash
cd apps/server
yarn dev
```

Note: You need to set the `REDIS_URL` environment variable.

- Example: `REDIS_URL=redis://localhost:6379`

## Architecture for socket

- We are using Redis to store the socket connections across multiple instances of the server.
- When a client connects to the server with pairs list, we store the socket id in Redis with the pairs list as the key.
- If global pairs list is changed, we will broadcast the new pairs or remove the pairs to binance websocket.
- If get message from binance websocket, we will broadcast the message to all the clients that are subscribed to the pairs list.
