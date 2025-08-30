import { useState, useMemo } from 'react';
import { Dayjs } from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';

import { Heading } from 'src/components/Heading';
import { Picker } from 'src/pages/PublicationPage/children/Picker';
import {
  calculatePrice,
  PricingPeriod,
  getErrorIfRangeIsInvalid,
  pricingPeriodEngToUkrMap,
} from 'src/pages/PublicationPage/children/Price/utils/count';
import { Publication } from 'src/types';
import { useRequireAuth } from 'src/hooks/useRequireAuth';
import { PickerFooter } from 'src/pages/PublicationPage/children/PickerFooter';
import { useBookingStore } from 'src/stores/bookingStore';
import { useAuthStore } from 'src/stores/authStore';

import styles from './styles.module.scss';

interface PriceProps {
  prices: Publication['price'];
  isOwner: boolean;
  bookedDates: Publication['bookedDates'];
}

export const Price = ({ prices, isOwner, bookedDates }: PriceProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuthStore();
  const { requireAuth } = useRequireAuth();
  const { createBooking } = useBookingStore();

  const [selectedRange, setSelectedRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);

  const isRangeSelected = selectedRange[0] !== null;
  const { totalPrice, days, commission } = useMemo(
    () => calculatePrice(selectedRange, prices),
    [selectedRange, prices]
  );

  const rangeError = useMemo(
    () => getErrorIfRangeIsInvalid(selectedRange, prices),
    [selectedRange, prices]
  );

  const handleButtonClick = async (): Promise<void> => {
    if (isRangeSelected) {
      const pathWithDate = location.pathname + location.search;
      const publicationId = location.pathname.split('/')[2];

      const startDate = selectedRange[0]?.format('YYYY-MM-DD');
      const endDate = selectedRange[1]?.format('YYYY-MM-DD');

      if (!user) {
        requireAuth(pathWithDate);

        return;
      }

      const booking = await createBooking(startDate, endDate, publicationId);

      if (booking) {
        navigate(`/booking/${booking.id}/details`);
      }
    }
  };

  const priceItemWidthClassMap: Record<number, string> = {
    1: styles.singlePrice,
    2: styles.dualPrice,
    3: styles.multiPrice,
  };

  return (
    <section>
      <Heading level={3} className={`${styles.title} ${styles.start}`}>
        Вартість
      </Heading>
      <dl className={styles.priceList}>
        {prices.map(({ price, pricingPeriod }) => (
          <div
            key={pricingPeriod}
            className={`${styles.priceItem} ${priceItemWidthClassMap[prices.length]}`}
          >
            <dt className={styles.priceAmount}>₴{price}</dt>
            <dd className={styles.pricePeriod}>
              {pricingPeriodEngToUkrMap[pricingPeriod as PricingPeriod]}
            </dd>
          </div>
        ))}
      </dl>
      <Heading level={3} className={styles.title}>
        Виберіть період оренди
      </Heading>
      <div className={styles.pickerWrapper}>
        <Picker
          onDateChange={setSelectedRange}
          isOwner={isOwner}
          bookedDates={bookedDates}
        />
        {!isOwner && (
          <PickerFooter
            isRangeSelected={isRangeSelected}
            totalPrice={totalPrice}
            days={days}
            commission={commission}
            rangeError={rangeError}
            onClick={handleButtonClick}
          />
        )}
      </div>
    </section>
  );
};
