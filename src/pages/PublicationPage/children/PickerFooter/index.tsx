import { Button } from 'src/components/Button';

import styles from './styles.module.scss';

interface PickerFooterProps {
  isOwner: boolean;
  isRangeSelected: boolean;
  totalPrice: number;
  days: number;
  commission: number;
  rangeError: string | null;
  onClick: () => void;
}

export const PickerFooter = ({
  isOwner,
  isRangeSelected,
  totalPrice,
  days,
  commission,
  rangeError,
  onClick,
}: PickerFooterProps) => {
  if (isOwner) return null;

  return (
    <div>
      <div className={styles.periodWrapper}>
        <span className={styles.price}>
          {isRangeSelected && !rangeError ? `${totalPrice} грн.` : '0 грн.'}
        </span>
        <span className={styles.period}>
          {isRangeSelected ? (
            rangeError ? (
              rangeError
            ) : (
              <>
                На {days} днів (включно з комісією
                <br />
                {commission} грн за бронювання)
              </>
            )
          ) : (
            'Оберіть період оренди'
          )}
        </span>
      </div>
      <Button
        className={styles.priceBtn}
        label="Відправити запит"
        isDisabled={!isRangeSelected || !!rangeError}
        onClick={onClick}
      />
    </div>
  );
};
