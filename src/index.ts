import express from "express";
import cors from "cors";
import path from "path";
import * as dotenv from "dotenv";
import http from "http";
import { WhatsAppClient } from "./services/whatsappClient";
import { initializeWebSocket } from "./websocket/socket";
import chatsRouter from "./routes/chats";
import statusRouter from "./routes/status";
import userRouter from "./routes/user";
import { routeLogger } from "./middleware/routeLogger";
import { checkClientLoggedIn } from "./middleware/clientConnection";

dotenv.config();

const app = express(); // تعريف واحد فقط
const server = http.createServer(app);

// استخدام middleware
app.use(cors());
app.use(express.json());
app.use(routeLogger);

// تعريف Routes
app.use("/chats", checkClientLoggedIn, chatsRouter);
app.use("/status", checkClientLoggedIn, statusRouter);
app.use("/user", userRouter);

// Initialize WebSocket
initializeWebSocket(server);

// بدء السيرفر
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
