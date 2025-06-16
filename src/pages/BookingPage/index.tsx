import { Tabs } from 'antd';

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
      </AppLayout>
    </PageContainer>
  );
};
