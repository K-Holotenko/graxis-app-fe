import { Form } from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { socket } from 'src/sockets';
import { Input } from 'src/components/Input';
import { Container } from 'src/pages/BookingPage/children/Container';
import { Button } from 'src/components/Button';
import SendIcon from 'src/assets/icons/send.svg?react';
import { sendMessage } from 'src/services/Chat';
import { ChatMessage, useBookingStore } from 'src/stores/bookingStore';
import { useUserStore } from 'src/stores/userStore';
import { MessageList } from 'src/pages/BookingPage/children/MessageList';

import styles from './styles.module.scss';

export const Chat = () => {
  const [form] = Form.useForm();

  const { booking, chat, isChatLoading, getChat } = useBookingStore();
  const { user, isLoading } = useUserStore();

  const [messages, setMessages] = useState<ChatMessage[]>(chat?.messages || []);
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  const onFinish = async (values: { text: string }) => {
    if (!booking?.chatId) return;

    await sendMessage(booking.chatId, values.text);

    form.resetFields();

    setMessages([
      ...messages,
      {
        id: '',
        text: values.text,
        senderId: user?.id || '',
        sentAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      },
    ]);
  };

  const onNewMessageEvent = (message: ChatMessage) => {
    setMessages([...messages, message]);
  };

  useEffect(() => {
    if (booking?.chatId) {
      getChat(booking.chatId);
    }
  }, [booking?.chatId, getChat]);

  useEffect(() => {
    if (chat) {
      setMessages(chat.messages);
    }
  }, [chat]);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('chat.new-message', onNewMessageEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('chat.new-message', onNewMessageEvent);
    };
  }, []);

  if (isChatLoading || !chat || !isConnected || isLoading || !user) {
    return (
      <Container>
        <p className={styles.title}>Чат</p>
        <div className={styles.chat}>Loading...</div>
      </Container>
    );
  }

  const participantsNames = {
    [chat.participants[0].id]: chat.participants[0].name,
    [chat.participants[1].id]: chat.participants[1].name,
  };

  return (
    <Container>
      <p className={styles.title}>Чат</p>
      <div className={styles.chat}>
        <MessageList
          messages={messages}
          userId={user.id}
          participantsNames={participantsNames}
        />
      </div>
      <div>
        <Form form={form} onFinish={onFinish}>
          <div className={styles.inputContainer}>
            <Form.Item name="text" className={styles.input}>
              <Input placeholder="Напишіть повідомлення..." />
            </Form.Item>
            <Button
              htmlType="submit"
              className={styles.sendButton}
              icon={<SendIcon />}
            />
          </div>
        </Form>
      </div>
    </Container>
  );
};
