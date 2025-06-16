import dayjs from 'dayjs';

import { ChatMessage } from 'src/stores/bookingStore';

import styles from './styles.module.scss';

export const MessageList = ({
  messages,
  userId,
  participantsNames,
}: {
  messages: ChatMessage[];
  userId: string;
  participantsNames: Record<string, string>;
}) => (
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
  </>
);
