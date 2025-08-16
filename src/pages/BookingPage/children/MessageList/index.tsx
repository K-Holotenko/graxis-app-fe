import dayjs from 'dayjs';
import { Alert } from 'antd';
import { useMemo } from 'react';

import { ChatMessage } from 'src/stores/bookingStore';
import { BookingStatus } from 'src/pages/BookingPage/children/Booking/utils';

import styles from './styles.module.scss';

interface MessageListProps {
  messages: ChatMessage[];
  userId: string;
  participantsNames: Record<string, string>;
  showChat?: boolean;
  bookingStatus: BookingStatus | null;
}

const alertMessages: Partial<Record<BookingStatus, string>> = {
  [BookingStatus.PENDING]:
    'Доступ до чату відкриється після підтвердження оплати.',
  [BookingStatus.CONFIRMED]:
    'Доступ до чату відкриється після підтвердження оплати.',
  [BookingStatus.IN_PROGRESS]: 'Чат буде закрито після повернення товару.',
  [BookingStatus.RETURNED]: 'Ви більше не можете писати в чаті.',
  [BookingStatus.RATED]: 'Ви більше не можете писати в чаті.',
  [BookingStatus.OWNER_RATED]: 'Ви більше не можете писати в чаті.',
  [BookingStatus.RENTER_RATED]: 'Ви більше не можете писати в чаті.',
  [BookingStatus.COMPLETED]: 'Ви більше не можете писати в чаті.',
  [BookingStatus.CANCELLED]: 'Ви більше не можете писати в чаті.',
};

export const MessageList = ({
  messages,
  userId,
  participantsNames,
  showChat,
  bookingStatus,
}: MessageListProps) => {
  const shouldShowAlert = useMemo(
    () =>
      !showChat ||
      bookingStatus === BookingStatus.IN_PROGRESS ||
      bookingStatus === BookingStatus.RETURNED ||
      bookingStatus === BookingStatus.RATED ||
      bookingStatus === BookingStatus.OWNER_RATED ||
      bookingStatus === BookingStatus.RENTER_RATED ||
      bookingStatus === BookingStatus.COMPLETED ||
      bookingStatus === BookingStatus.CANCELLED,
    [showChat, bookingStatus]
  );

  return (
    <>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`${styles.message} ${
            message.senderId === userId ? styles.sent : styles.received
          }`}
        >
          <div className={styles.headerMessage}>
            <span className={styles.messageDetail}>
              {participantsNames[message.senderId]}
            </span>
            <span className={styles.messageDetail}>
              {dayjs(message.sentAt).format('HH:mm')}
            </span>
          </div>
          <p>{message.text}</p>
        </div>
      ))}
      {shouldShowAlert && bookingStatus && (
        <div className={styles.chatDisabledMessage}>
          <Alert
            message={alertMessages[bookingStatus]}
            type="warning"
            className={styles.chatDisabledMessageAlert}
            showIcon
          />
        </div>
      )}
    </>
  );
};
