# Cryptocurrency Dashboard Assignment Project

## Project Description

This project is a cryptocurrency dashboard assignment project. It is a simple dashboard that allows users to view cryptocurrency prices and market data.

## Project Structure

- `apps/server`: The server application.
- `apps/web`: The web application.

## Running the project

### Server

```bash
cd apps/server
yarn dev
```

### Web

```bash
cd apps/web
yarn dev
```

## Environment Variables

For the server, you need to set the `REDIS_URL` environment variable.

- Example: `REDIS_URL=redis://localhost:6379`

For the web, you need to set the `VITE_API_URL` and `VITE_SOCKET_URL` environment variable.

- Example: `VITE_API_URL=http://localhost:3000/api`
- Example: `VITE_SOCKET_URL=ws://localhost:3000`

## Build the project

```bash
cd apps/server
yarn build
```

```bash
cd apps/web
yarn build
```
