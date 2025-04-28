import { useState, useMemo } from 'react';
import { Dayjs } from 'dayjs';
import { useLocation } from 'react-router-dom';

import { Heading } from 'src/components/Heading';
import { Picker } from 'src/pages/PublicationPage/children/Picker';
import { Button } from 'src/components/Button';
import {
  calculatePrice,
  getErrorIfRangeIsInvalid,
  pricingPeriodEngToUkrMap,
} from 'src/pages/PublicationPage/children/Price/utils/count';
import { Publication } from 'src/services/PublicationService';
import { useRequireAuth } from 'src/hooks/useRequireAuth';

import styles from './styles.module.scss';

interface PriceProps {
  prices: Publication['price'];
  isOwner: boolean;
  bookedDates: [];
}

export const Price = ({ prices, isOwner, bookedDates }: PriceProps) => {
  const { requireAuth } = useRequireAuth();

  const location = useLocation();

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

  const handleButtonClick = (): void => {
    if (isRangeSelected) {
      const pathWithDate = location.pathname + location.search;

      requireAuth(pathWithDate);
    }
  };

  const priceItemWidthClassMap = {
    1: styles.singlePrice,
    2: styles.dualPrice,
    3: styles.multiPrice,
  };

  const getPriceItemClass = () =>
    priceItemWidthClassMap[prices.length as 1 | 2 | 3];

  return (
    <section>
      <Heading level={3} className={`${styles.title} ${styles.start}`}>
        Вартість
      </Heading>
      <dl className={styles.priceList}>
        {prices.map(({ price, pricingPeriod }) => (
          <div
            key={pricingPeriod}
            className={`${styles.priceItem} ${getPriceItemClass()}`}
          >
            <dt className={styles.priceAmount}>₴{price}</dt>
            <dd className={styles.pricePeriod}>
              {pricingPeriodEngToUkrMap[pricingPeriod]}
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
          <div>
            {isRangeSelected ? (
              <div className={styles.periodWrapper}>
                <span className={styles.price}>
                  {rangeError ? 0 : totalPrice} грн.
                </span>
                <span className={styles.period}>
                  {rangeError || (
                    <>
                      На {days} днів {'('}включно з комісією
                      <br />
                      {commission} грн за бронювання{')'}
                    </>
                  )}
                </span>
              </div>
            ) : (
              <div className={styles.periodWrapper}>
                <span className={styles.price}>0 грн.</span>
                <span className={styles.period}>Оберіть період оренди</span>
              </div>
            )}
            <Button
              className={`${styles.button} ${styles.priceBtn}`}
              label="Відправити запит"
              isDisabled={!isRangeSelected || !!rangeError}
              onClick={handleButtonClick}
            />
          </div>
        )}
      </div>
    </section>
  );
};
