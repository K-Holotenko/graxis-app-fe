import { useEffect } from 'react';
import { Socket } from 'socket.io-client';

import { socket } from 'src/sockets';
import { useAuthStore } from 'src/stores/authStore';
import { User } from 'src/types';

interface UseSocketConnection {
  socket: Socket;
  isConnected: boolean;
  user: User | null;
}

export const useSocketConnection = (): UseSocketConnection => {
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      socket.connect();
    } else {
      socket.disconnect();
    }

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return {
    socket,
    isConnected: socket.connected,
    user,
  };
};
