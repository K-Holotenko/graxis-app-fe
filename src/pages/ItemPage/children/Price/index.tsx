import React, { useState, useMemo } from 'react';
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

  const priceDetails = useMemo(
    () => calculatePrice(selectedRange, prices),
    [selectedRange, prices]
  );

  const isButtonDisabled = !selectedRange[0] || priceDetails === 0;

  const handleButtonClick = () => {
    if (selectedRange[0] && priceDetails !== 0) {
      const firstDay = selectedRange[0].format('DD/MM/YYYY');
      const lastDay = selectedRange[1]
        ? selectedRange[1].format('DD/MM/YYYY')
        : firstDay;
      const totalDays = selectedRange[1] ? priceDetails.days : 1;
      const totalCost = priceDetails.totalPrice;

      const priceData = {
        firstDay,
        lastDay,
        totalDays,
        totalCost,
      };

      // eslint-disable-next-line no-console
      console.log(priceData);
    }
  };

  return (
    <section className={styles.bookWrap}>
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
      <div className={styles.pickerWrap}>
        <Picker onDateChange={setSelectedRange} />
        <div className={styles.totalPriceWrap}>
          {selectedRange[0] && priceDetails !== 0 ? (
            <div className={styles.periodWrap}>
              <span className={styles.price}>
                {Math.round(priceDetails.totalPrice)} {TEXT.UAH}
              </span>
              <span className={styles.period}>
                {TEXT.FOR} {priceDetails.days} {TEXT.DAYS_PERIOD}
                <br />
                {Math.round(priceDetails.commission)} {TEXT.RESERVATION_COST}
              </span>
            </div>
          ) : (
            <div className={styles.periodWrap}>
              <span className={styles.price}>0 {TEXT.UAH}</span>
              <span className={styles.period}>{TEXT.EMPTY_SELECTION_TEXT}</span>
            </div>
          )}
          <Button
            className={`${styles.button} ${styles.priceBtn}`}
            label={TEXT.SEND_REQUEST}
            isDisabled={isButtonDisabled}
            onClick={handleButtonClick}
          />
        </div>
      </div>
    </section>
  );
};
