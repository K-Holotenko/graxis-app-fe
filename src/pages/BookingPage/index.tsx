import { Tabs } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, generatePath } from 'react-router-dom';

import { ROUTES } from 'src/router/routes';
import { useBookingStore } from 'src/stores/bookingStore';
import { BookingLayout } from 'src/layouts/BookingLayout';
import { AppLayout } from 'src/layouts/AppLayout';
import { PageContainer } from 'src/layouts/PageContainer';
import { BookingDialog } from 'src/pages/BookingPage/children/BookingDialog';
import ArrowLeft from 'src/assets/icons/arrow-left.svg?react';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { SCREEN_WIDTH } from 'src/config/constants';

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
  const { booking, getBooking, connectToBookingStatusUpdate } =
    useBookingStore();

  const navigate = useNavigate();
  const { id, tab } = useParams<{ id: string; tab?: string }>();

  const [activeTab, setActiveTab] = useState<string>(tab || TABS.DETAILS);
  const [bookingNotFound, setBookingNotFound] = useState<boolean>(false);

  const isTablet = useMemo(() => width < SCREEN_WIDTH.LG, [width]);
  const isMobile = useMemo(() => width < SCREEN_WIDTH.SM, [width]);

  useEffect(() => {
    if (!id) {
      setBookingNotFound(true);

      return;
    }

    getBooking(id).then((result) => {
      if (result === null) {
        setBookingNotFound(true);
      }
    });
  }, [id]);

  useEffect(() => {
    if (booking) {
      const unsubscribe = connectToBookingStatusUpdate(booking.id);

      return () => unsubscribe();
    }
  }, [booking]);

  useEffect(() => {
    if (bookingNotFound) {
      navigate(ROUTES.NOT_FOUND);
    }
  }, [bookingNotFound, navigate]);

  const handleTabChange = useCallback(
    (newTab: string) => {
      setActiveTab(newTab as (typeof TABS)[keyof typeof TABS]);
      navigate(`/booking/${id}/${newTab}`, { replace: true });
    },
    [id, navigate]
  );

  return (
    <PageContainer pageTitle={booking?.publication.title || 'Букінг'}>
      <AppLayout>
        <ArrowLeft
          className={styles.arrowLeft}
          onClick={() =>
            navigate(
              generatePath(ROUTES.PUBLICATION, {
                id: booking?.publication.id,
              })
            )
          }
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
