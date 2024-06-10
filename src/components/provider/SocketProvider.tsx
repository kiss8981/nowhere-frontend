"use client";

import { useAddEvent } from "@/stores/eventStore";
import { SocketEvent } from "@/types/Socket";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket as SocketIO } from "socket.io-client";

type ClientSocketType = SocketIO<SocketEvent>;

interface ISocketContext {
  socket: ClientSocketType | null;
  isConnected: boolean;
}

const SocketContext = createContext<ISocketContext>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<ClientSocketType | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket: ClientSocketType = io(
      process.env.NEXT_PUBLIC_API_URL as string,
      {
        transports: ["websocket"],
      }
    );

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("connect_error", (error: Error) => {
      console.error(error);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socket);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
