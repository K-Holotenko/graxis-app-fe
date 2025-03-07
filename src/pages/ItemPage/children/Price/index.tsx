import { useState, useMemo } from 'react';
import { Dayjs } from 'dayjs';

import { Heading } from 'src/components/Heading';
import { Picker } from 'src/pages/ItemPage/children/Picker';
import { Button } from 'src/components/Button';
import { calculatePrice } from 'src/pages/ItemPage/children/Price/utils/count';
import { TEXT } from 'src/config/constants';

import styles from './styles.module.scss';

interface PriceItem {
  amount: number;
  period: string;
}

interface PriceProps {
  prices: PriceItem[];
}

export const Price: React.FC<PriceProps> = ({ prices }) => {
  const [selectedRange, setSelectedRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);
  const [, setPriceData] = useState<null | {
    firstDay: string;
    lastDay: string;
    totalDays: number;
    totalCost: number;
  }>(null);

  const isRangeSelected = selectedRange[0] !== null;
  const { totalPrice, days, commission } = useMemo(
    () => calculatePrice(selectedRange, prices),
    [selectedRange, prices]
  );

  const handleButtonClick = () => {
    if (isRangeSelected) {
      const firstDay = selectedRange[0]?.format('DD/MM/YYYY') || '';
      const lastDay = selectedRange[1]?.format('DD/MM/YYYY') || firstDay;

      setPriceData({
        firstDay,
        lastDay,
        totalDays: selectedRange[1] ? days : 1,
        totalCost: totalPrice,
      });
    }
  };

  return (
    <section>
      <Heading level={3} className={`${styles.title} ${styles.start}`}>
        {TEXT.COST}
      </Heading>
      <dl className={styles.priceList}>
        {prices.map(({ amount, period }) => (
          <div key={period} className={styles.priceItem}>
            <dt className={styles.priceAmount}>₴{amount}</dt>
            <dd className={styles.pricePeriod}>{period}</dd>
          </div>
        ))}
      </dl>
      <Heading level={3} className={styles.title}>
        {TEXT.CHOOSE_RENT_PERIOD}
      </Heading>
      <div className={styles.pickerWrapper}>
        <Picker onDateChange={setSelectedRange} />
        <div>
          {isRangeSelected ? (
            <div className={styles.periodWrapper}>
              <span className={styles.price}>
                {totalPrice} {TEXT.UAH}
              </span>
              <span className={styles.period}>
                {TEXT.FOR} {days} {TEXT.DAYS_PERIOD}
                <br />
                {commission} {TEXT.RESERVATION_COST}
              </span>
            </div>
          ) : (
            <div className={styles.periodWrapper}>
              <span className={styles.price}>0 {TEXT.UAH}</span>
              <span className={styles.period}>{TEXT.EMPTY_SELECTION_TEXT}</span>
            </div>
          )}
          <Button
            className={`${styles.button} ${styles.priceBtn}`}
            label={TEXT.SEND_REQUEST}
            isDisabled={!isRangeSelected}
            onClick={handleButtonClick}
          />
        </div>
      </div>
    </section>
  );
};
