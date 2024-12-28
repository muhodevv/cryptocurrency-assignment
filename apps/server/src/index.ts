import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { tradingRoutes } from './routes/trading.route';
import { SocketManager } from './lib/socketManager';
import { handleDisconnect, handleSendPairs, handleSubscribePairs } from './lib/handleSocket';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

app.use('/api/trading', tradingRoutes);

new SocketManager();

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  const userId = socket.id // Simulate user id;
  
  socket.on("subscribe_pairs", (pairs) => {
    handleSubscribePairs(socket, userId, pairs);
  })

  socket.on("disconnect", () => {
    handleDisconnect(userId);
  });

});

handleSendPairs(io)

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 