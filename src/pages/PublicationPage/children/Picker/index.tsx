import { FC, useEffect } from 'react';
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
  const [searchParams, setSearchParams] = useSearchParams();

  const startDateStr = searchParams.get('startDate');
  const endDateStr = searchParams.get('endDate');
  const startDate = startDateStr ? dayjs(startDateStr, 'DD/MM/YYYY') : null;
  const endDate =
    endDateStr && endDateStr !== startDateStr
      ? dayjs(endDateStr, 'DD/MM/YYYY')
      : null;
  const range: [Dayjs | null, Dayjs | null] = [startDate, endDate];

  useEffect(() => {
    if (startDateStr) {
      const newRange: [Dayjs | null, Dayjs | null] = [
        dayjs(startDateStr, 'DD/MM/YYYY'),
        endDateStr && endDateStr !== startDateStr
          ? dayjs(endDateStr, 'DD/MM/YYYY')
          : null,
      ];

      onDateChange(newRange);
    }
  }, [startDateStr, endDateStr, onDateChange]);

  const clearDates = () => {
    onDateChange([null, null]);
    setSearchParams({});
  };

  const handleSelect = (date: Dayjs) => {
    let newRange: [Dayjs | null, Dayjs | null] =
      range[0] && !range[1] ? [range[0], date] : [date, null];

    if (newRange[0] && newRange[1]) {
      newRange = [newRange[0], newRange[1]].sort(
        (a, b) => a!.valueOf() - b!.valueOf()
      ) as [Dayjs, Dayjs];
    }

    onDateChange(newRange);
    if (newRange[0]) {
      const formattedStart = newRange[0].format('DD/MM/YYYY');
      const formattedEnd = newRange[1]
        ? newRange[1].format('DD/MM/YYYY')
        : formattedStart;

      setSearchParams({ startDate: formattedStart, endDate: formattedEnd });
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
