import { api } from './api';

export const createChat = async (
  bookingId: string,
  participantIds: string[]
): Promise<unknown> => {
  const response = await api.post(`/chat/create`, {
    bookingId,
    participantIds,
  });

  return response.data;
};

export const getChat = async (id: string): Promise<unknown> => {
  const response = await api.get(`/chat/${id}`);

  return response.data;
};

export const sendMessage = async (
  id: string,
  text: string
): Promise<unknown> => {
  const response = await api.post(`/chat/${id}/message`, {
    text,
  });

  return response.data;
};
