import { Form, Spin } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

import { socket } from 'src/sockets';
import { Input } from 'src/components/Input';
import { Container } from 'src/pages/BookingPage/children/Container';
import { Button } from 'src/components/Button';
import SendIcon from 'src/assets/icons/send.svg?react';
import { sendMessage } from 'src/services/Chat';
import { ChatMessage, useBookingStore } from 'src/stores/bookingStore';
import { useAuthStore } from 'src/stores/authStore';
import { MessageList } from 'src/pages/BookingPage/children/MessageList';
import { BookingStatus } from 'src/pages/BookingPage/children/Booking/utils';
import { useBookingStatus } from 'src/hooks/useBookingStatus';

import styles from './styles.module.scss';

export const Chat = () => {
  const [form] = Form.useForm();

  const {
    booking,
    chat,
    isChatLoading,
    isBookingLoading,
    getChat,
    getBooking,
  } = useBookingStore();
  const { user, isLoading } = useAuthStore();
  const { bookingStatus } = useBookingStatus();

  const { id } = useParams();

  const [messages, setMessages] = useState<ChatMessage[]>(chat?.messages || []);
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  const onFinish = async (values: { text: string }) => {
    if (!booking?.chatId) return;

    await sendMessage(booking.chatId, values.text);

    form.resetFields();

    setMessages([
      ...messages,
      {
        id: dayjs().unix().toString(),
        text: values.text,
        senderId: user?.id || '',
        sentAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      },
    ]);
  };

  const onNewMessageEvent = (data: {
    chatId: string;
    message: ChatMessage;
  }) => {
    const completeMessage: ChatMessage = {
      id: data.message.id,
      text: data.message.text,
      senderId: data.message.senderId,
      sentAt: data.message.sentAt,
    };

    setMessages((prevMessages) => [...prevMessages, completeMessage]);
  };

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;

    if (!chatContainer) return;

    const { scrollHeight, scrollTop, clientHeight } = chatContainer;

    // A threshold to determine if the user is "close enough" to the bottom.
    const scrollOffset = scrollHeight - (scrollTop + clientHeight);

    // Only auto-scroll if the user is already at the bottom (or very close to it)
    // This prevents snapping the user to the bottom if they've scrolled up to read history.
    if (scrollOffset <= 100) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!isChatLoading && chat && isConnected && !isLoading && user) {
      const chatContainer = chatContainerRef.current;

      if (chatContainer && messages.length > 0) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  }, [isChatLoading, chat, isConnected, isLoading, user]);

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

  useEffect(() => {
    const shouldUpdateBooking =
      id &&
      booking &&
      bookingStatus === BookingStatus.PAID &&
      !booking.publicationAddressShow;

    if (shouldUpdateBooking) {
      getBooking(id);
    }
  }, [booking, bookingStatus, id]);

  const isChatDisabled = useMemo(
    () =>
      !booking?.chatShow ||
      bookingStatus === BookingStatus.RETURNED ||
      bookingStatus === BookingStatus.RATED ||
      bookingStatus === BookingStatus.CANCELLED ||
      bookingStatus === BookingStatus.COMPLETED,
    [booking, bookingStatus]
  );

  if (isChatLoading || isBookingLoading || !chat || !user) {
    return (
      <Container>
        <p className={styles.title}>Чат</p>
        <div className={styles.spinnerContainer}>
          <Spin
            indicator={
              <LoadingOutlined
                style={{ fontSize: 36, color: '#003342' }}
                spin
              />
            }
          />
        </div>
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
      <div className={styles.chat} ref={chatContainerRef}>
        <MessageList
          messages={messages}
          userId={user.id}
          participantsNames={participantsNames}
          showChat={booking?.chatShow}
          bookingStatus={bookingStatus}
        />
      </div>
      <div className={styles.formContainer}>
        <Form form={form} onFinish={onFinish}>
          <div className={styles.inputContainer}>
            <Form.Item name="text" className={styles.input}>
              <Input
                placeholder="Напишіть повідомлення..."
                disabled={isChatDisabled}
              />
            </Form.Item>
            <Button
              htmlType="submit"
              className={styles.sendButton}
              icon={<SendIcon />}
              isDisabled={isChatDisabled}
            />
          </div>
        </Form>
      </div>
    </Container>
  );
};
