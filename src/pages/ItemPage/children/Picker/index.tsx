import React, { useState } from 'react';
import { ConfigProvider, DatePicker, type GetProps } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/uk';
import ukUA from 'antd/es/date-picker/locale/uk_UA';

import { theme } from 'src/config/theme';
import { TEXT } from 'src/config/constants';

import styles from './styles.module.scss';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
dayjs.extend(isBetween);
dayjs.locale('uk');

export const Picker: React.FC<{
  onDateChange: (dates: [Dayjs | null, Dayjs | null]) => void;
}> = ({ onDateChange }) => {
  const [range, setRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);

  const clearDates = () => {
    setRange([null, null]);
    onDateChange([null, null]);
  };

  const handleSelect = (date: Dayjs) => {
    let newRange: [Dayjs | null, Dayjs | null];

    if (!range[0] || (range[0] && range[1])) {
      newRange = [date, null];
    } else {
      newRange = [range[0], date].sort(
        (a, b) => a!.valueOf() - b!.valueOf()
      ) as [Dayjs, Dayjs];
    }

    setRange(newRange);
    onDateChange(newRange);
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) =>
    current && current < dayjs().startOf('day');

  const deleteButton = () => (
    <div className={styles.deleteBtnWrap}>
      <button
        disabled={!range[0] && !range[1]}
        className={styles.deleteBtn}
        onClick={clearDates}
      >
        {TEXT.DELETE_DATE}
      </button>
    </div>
  );

  const getCellRender = (current: string | number | Dayjs) => {
    const currentDate = dayjs(current);

    const isInRange =
      range[0] &&
      range[1] &&
      currentDate.isBetween(range[0], range[1], 'day', '[]');
    const isStart = range[0] && currentDate.isSame(range[0], 'day');
    const isEnd = range[1] && currentDate.isSame(range[1], 'day');
    const isToday = currentDate.isSame(dayjs(), 'day');

    const isSelected =
      range[0] && !range[1] && currentDate.isSame(range[0], 'day');

    return (
      <div
        className={`
          ${styles.dayWrapper} ${isInRange ? styles.inRange : ''} 
          ${isStart ? styles.isStart : ''} 
          ${isEnd ? styles.isEnd : ''} ${isToday ? styles.isToday : ''} 
          ${isSelected ? styles.isSelected : ''} 
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
