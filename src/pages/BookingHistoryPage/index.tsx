import { ConfigProvider, Drawer, FloatButton } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterOutlined } from '@ant-design/icons';

import { SingleColumnLayout } from 'src/layouts/SingleColumnLayout';
import { Heading } from 'src/components/Heading';
import { AppLayout } from 'src/layouts/AppLayout';
import { PageContainer } from 'src/layouts/PageContainer';
import { useBookingStore } from 'src/stores/bookingStore';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { SCREEN_WIDTH } from 'src/config/constants';
import { theme } from 'src/config/theme';
import { UserRole } from 'src/types';

import { Filters } from './children/Filters';
import { BookingCard } from './children/BookingCard';
import { filterAndSortBookings } from './utils';
import styles from './styles.module.scss';
import { BookingHistorySkeleton } from './skeletons';

export const BookingHistoryPage = () => {
  const { myBookings, isBookingLoading, getAllMyBookings } = useBookingStore();
  const [searchParams] = useSearchParams();

  const { width } = useWindowSize();
  const isMobile = width < SCREEN_WIDTH.MD;
  const [open, setOpen] = useState(false);

  const role = searchParams.get('role') as UserRole | null;
  const status = searchParams.get('status');
  const sorting = searchParams.get('sorting');

  useEffect(() => {
    getAllMyBookings();
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  const filteredAndSortedBookings = useMemo(
    () => filterAndSortBookings(myBookings, { role, status, sorting }),
    [myBookings, role, status, sorting]
  );

  return (
    <PageContainer pageTitle="Мої бронювання">
      <AppLayout>
        <SingleColumnLayout
          title={<Heading level={2}>Історія бронювань</Heading>}
        >
          <div className={styles.container}>
            <Filters />
            <div className={styles.bookings}>
              {isBookingLoading ? (
                <BookingHistorySkeleton />
              ) : (
                filteredAndSortedBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} role={role} />
                ))
              )}
            </div>
          </div>
          {isMobile && (
            <Drawer
              title="Фільтри"
              placement="bottom"
              open={open}
              className={styles.drawer}
              onClose={() => setOpen(false)}
            >
              <Filters setOpen={setOpen} />
            </Drawer>
          )}
        </SingleColumnLayout>
        {isMobile && (
          <ConfigProvider theme={localTheme}>
            <FloatButton
              className={styles.floatBtn}
              style={{ insetInlineEnd: 24 }}
              shape="square"
              onClick={() => setOpen(true)}
              icon={<FilterOutlined style={{ color: 'white' }} />}
            />
          </ConfigProvider>
        )}
      </AppLayout>
    </PageContainer>
  );
};

const localTheme = {
  components: {
    FloatButton: {
      colorBgElevated: theme.primary,
    },
  },
};
