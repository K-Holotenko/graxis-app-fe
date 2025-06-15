import { GRAXIS_API_URL } from 'src/config/constants';

import CookieService from './CookieService';

export const createChat = async (): Promise<unknown> => {
  const token = `Bearer ${CookieService.getCookie('accessToken')}`;

  const response = await fetch(`${GRAXIS_API_URL}/chat/create`, {
    method: 'POST',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bookingId: '5MsyAzI2DY18Li4md9zP',
      participantIds: [
        'FL4frfAtbdbFI6YhcTAkkwJ2r242',
        'X0RcrNMkOmROrAv54VHA5XZFlVE3',
      ],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create chat');
  }

  return response.json();
};

export const getChat = async (): Promise<unknown> => {
  const token = `Bearer ${CookieService.getCookie('accessToken')}`;

  const response = await fetch(
    `${GRAXIS_API_URL}/chat/fhiFbu5rrVNlBMsrHLsP/message`,
    {
      method: 'GET',
      headers: { Authorization: token },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to get chat');
  }

  return response.json();
};

export const sendMessage = async (text: string): Promise<unknown> => {
  const token = `Bearer ${CookieService.getCookie('accessToken')}`;

  const response = await fetch(
    `${GRAXIS_API_URL}/chat/fhiFbu5rrVNlBMsrHLsP/message`,
    {
      method: 'POST',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  return response.json();
};
//vHer1mSrEhL1zdEZ9Mp8 - bookingId
