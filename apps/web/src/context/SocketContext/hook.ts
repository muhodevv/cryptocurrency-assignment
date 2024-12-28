import { useContext } from "react";
import { SocketContext } from "./context";

export const useSocketContext = () => useContext(SocketContext);