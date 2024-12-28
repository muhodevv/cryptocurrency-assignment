import { SocketContext } from "./context";
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL as string);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        const onConnect = () => {
            console.log("Connected to server");
        };
        socket.on("connect", onConnect);
        return () => {
            socket.off("connect", onConnect);
        };
    }, []);

    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
