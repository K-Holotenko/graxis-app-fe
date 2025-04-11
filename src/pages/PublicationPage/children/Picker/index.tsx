import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ConfigProvider, DatePicker, type GetProps } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/uk';
import ukUA from 'antd/es/date-picker/locale/uk_UA';

import { theme } from 'src/config/theme';

import styles from './styles.module.scss';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
dayjs.extend(isBetween);
dayjs.locale('uk');

export const Picker: FC<{
  onDateChange: (dates: [Dayjs | null, Dayjs | null]) => void;
}> = ({ onDateChange }) => {
  const [range, setRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);

  const [searchParams, setSearchParams] = useSearchParams();

  const shouldStartNewRange = !range[0] || (range[0] && range[1]);

  useEffect(() => {
    const startDateStr = searchParams.get('startDate');
    const endDateStr = searchParams.get('endDate');

    if (!startDateStr) return;

    const startDate = dayjs(startDateStr, 'DD/MM/YYYY');
    const endDate =
      endDateStr && endDateStr !== startDateStr
        ? dayjs(endDateStr, 'DD/MM/YYYY')
        : null;

    const newRange: [Dayjs | null, Dayjs | null] = [startDate, endDate];

    setRange(newRange);
    onDateChange(newRange);
  }, [searchParams, onDateChange]);

  const clearDates = () => {
    setRange([null, null]);
    onDateChange([null, null]);

    setSearchParams({});
  };

  const handleSelect = (date: Dayjs) => {
    let newRange: [Dayjs | null, Dayjs | null] = [date, null];

    if (!shouldStartNewRange) {
      newRange = [range[0], date].sort(
        (a, b) => a!.valueOf() - b!.valueOf()
      ) as [Dayjs, Dayjs];
    }

    setRange(newRange);
    onDateChange(newRange);

    if (newRange[0]) {
      const startDate = newRange[0].format('DD/MM/YYYY');
      const endDate = newRange[1]
        ? newRange[1].format('DD/MM/YYYY')
        : startDate;

      setSearchParams({ startDate, endDate });
    }
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) =>
    current && current < dayjs().startOf('day');

  const deleteButton = () => (
    <div className={styles.deleteBtnWrapper}>
      <button
        disabled={!range[0] && !range[1]}
        className={styles.deleteBtn}
        onClick={clearDates}
      >
        Видалити дати
      </button>
    </div>
  );

  const getCellRender = (current: string | number | Dayjs) => {
    const currentDate = dayjs(current);

    const isInRange =
      range[0] &&
      range[1] &&
      currentDate.isBetween(range[0], range[1], 'day', '[]');
    const isStartDay = range[0] && currentDate.isSame(range[0], 'day');
    const isEndDay = range[1] && currentDate.isSame(range[1], 'day');
    const isToday = currentDate.isSame(dayjs(), 'day');

    const isSelected =
      range[0] && !range[1] && currentDate.isSame(range[0], 'day');
    const rangeStyles = isInRange ? styles.inRange : '';
    const startStyles = isStartDay ? styles.isStart : '';
    const endStyles = isEndDay ? styles.isEnd : '';
    const todayStyles = isToday ? styles.isToday : '';
    const selectedStyles = isSelected ? styles.isSelected : '';

    return (
      <div
        className={`
        ${styles.dayWrapper} 
        ${rangeStyles} 
        ${startStyles} 
        ${endStyles} 
        ${todayStyles} 
        ${selectedStyles}
      `}
      >
        {currentDate.date()}
      </div>
    );
  };

  return (
    <ConfigProvider theme={localTheme}>
      <DatePicker
        popupClassName={styles.datePicker}
        getPopupContainer={(node) => node?.parentElement || document.body}
        disabledDate={disabledDate}
        superNextIcon={false}
        superPrevIcon={false}
        className={styles.picker}
        open
        value={range[0]}
        onChange={handleSelect}
        format="DD.MM.YYYY"
        locale={ukUA}
        renderExtraFooter={deleteButton}
        cellRender={getCellRender}
      />
    </ConfigProvider>
  );
};

const localTheme = {
  components: {
    DatePicker: {
      fontFamily: theme.fontBody,
      cellBgDisabled: 'transparent',
      cellHoverWithRangeBg: theme.secondary,
      cellHeight: 28,
      colorText: theme.N6,
      boxShadowSecondary: 'none',
      colorSplit: 'transparent',
    },
  },
};
