import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { ROUTES } from 'src/router/routes';
import { useBookingStore } from 'src/stores/bookingStore';
import { socket } from 'src/sockets';
import { BookingLayout } from 'src/layouts/BookingLayout';
import { AppLayout } from 'src/layouts/AppLayout';
import { PageContainer } from 'src/layouts/PageContainer';
import { BookingDialog } from 'src/pages/BookingPage/children/BookingDialog';
import ArrowLeft from 'src/assets/icons/arrow-left.svg?react';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { SCREEN_WIDTH } from 'src/config/constants';
import { useAuthStore } from 'src/stores/authStore';

import { Booking } from './children/Booking';
import { Chat } from './children/Chat';
import styles from './styles.module.scss';

const TABS = {
  DETAILS: 'details',
  CHAT: 'chat',
} as const;

const items = [
  {
    key: TABS.DETAILS,
    label: 'Деталі',
    children: <Booking />,
  },
  {
    key: TABS.CHAT,
    label: 'Чат',
    children: <Chat />,
  },
];

export const BookingPage = () => {
  const { width } = useWindowSize();
  const { user } = useAuthStore();
  const { booking, getBooking, isBookingLoading } = useBookingStore();
  const navigate = useNavigate();

  const { id, tab } = useParams<{ id: string; tab?: string }>();
  const [activeTab, setActiveTab] = useState<string>(tab || TABS.DETAILS);

  const isTablet = width < SCREEN_WIDTH.LG;
  const isMobile = width < SCREEN_WIDTH.SM;

  useEffect(() => {
    if (id) {
      getBooking(id);
    }
  }, [id, getBooking]);

  useEffect(() => {
    if (user) {
      socket.connect();
    } else {
      socket.disconnect();
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab as (typeof TABS)[keyof typeof TABS]);
    navigate(`/booking/${id}/${newTab}`, { replace: true });
  };

  if (!booking && !isBookingLoading) {
    navigate(ROUTES.NOT_FOUND);
  }

  return (
    <PageContainer pageTitle={booking?.publication.title || 'Букінг'}>
      <AppLayout>
        <ArrowLeft
          className={styles.arrowLeft}
          onClick={() => window.history.back()}
        />
        {isTablet ? (
          <Tabs
            activeKey={activeTab}
            items={items}
            rootClassName={styles.tabs}
            centered={isMobile}
            onChange={handleTabChange}
          />
        ) : (
          <BookingLayout booking={<Booking />} chat={<Chat />} />
        )}
        <BookingDialog />
      </AppLayout>
    </PageContainer>
  );
};
