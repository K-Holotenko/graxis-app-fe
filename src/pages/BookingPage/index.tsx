import { Button, Tabs } from 'antd';
import { useEffect, useState } from 'react';

import { socket } from 'src/sockets';
import { BookingLayout } from 'src/layouts/BookingLayout';
import { AppLayout } from 'src/layouts/AppLayout';
import { PageContainer } from 'src/layouts/PageContainer';
import { BookingDialog } from 'src/pages/BookingPage/children/BookingDialog';
import ArrowLeft from 'src/assets/icons/arrow-left.svg?react';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { SCREEN_WIDTH } from 'src/config/constants';
import { createChat, sendMessage } from 'src/services/Chat';

import { Booking } from './children/Booking';
import { Chat } from './children/Chat';
import styles from './styles.module.scss';

const items = [
  {
    key: '1',
    label: 'Деталі',
    children: <Booking />,
  },
  {
    key: '2',
    label: 'Чат',
    children: <Chat />,
  },
];

export const BookingPage = () => {
  const { width } = useWindowSize();
  const isTablet = width < SCREEN_WIDTH.XL;
  const isMobile = width < SCREEN_WIDTH.SM;

  const [, setIsConnected] = useState<boolean>(socket.connected);
  const [newMessage, setNewMessage] = useState<string[]>([]);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onNewMessageEvent = (value: string) => {
      setNewMessage((previous) => [...previous, value]);
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

  // eslint-disable-next-line no-console
  console.log(newMessage);

  return (
    <PageContainer pageTitle="Профіль">
      <AppLayout>
        <ArrowLeft
          className={styles.arrowLeft}
          onClick={() => window.history.back()}
        />
        {isTablet ? (
          <Tabs
            defaultActiveKey="1"
            items={items}
            rootClassName={styles.tabs}
            centered={isMobile}
          />
        ) : (
          <BookingLayout booking={<Booking />} chat={<Chat />} />
        )}
        <BookingDialog />
        <Button onClick={async () => await createChat()}>Create chat</Button>
        <Button
          onClick={async () => await sendMessage('Hello on the other side')}
        >
          Send message
        </Button>
      </AppLayout>
    </PageContainer>
  );
};
