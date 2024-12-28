import { createContext } from "react";
import type{ Socket } from "socket.io-client";

export type SocketContextType = {
    socket: null | Socket
}

export const SocketContext = createContext<SocketContextType>({
    socket: null
});