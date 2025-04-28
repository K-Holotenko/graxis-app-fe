import { Tooltip } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';

import { theme } from 'src/config/theme';
import styles from 'src/pages/PublicationPage/children/Picker/styles.module.scss';

interface GetCellRenderParams {
  current: string | number | Dayjs;
  range: [Dayjs | null, Dayjs | null];
  bookedRanges: [Dayjs, Dayjs][];
  isOwner: boolean;
}

export const getCellRender = ({
  current,
  range,
  bookedRanges,
  isOwner,
}: GetCellRenderParams) => {
  const currentDate = dayjs(current);
  const isBookedDay = bookedRanges.some(([from, to]) =>
    currentDate.isBetween(from, to, 'day', '[]')
  );

  const isInRange =
    range[0] &&
    range[1] &&
    currentDate.isBetween(range[0], range[1], 'day', '[]');
  const isStartDay = range[0] && currentDate.isSame(range[0], 'day');
  const isEndDay = range[1] && currentDate.isSame(range[1], 'day');
  const isToday = currentDate.isSame(dayjs(), 'day');
  const isSelected =
    range[0] && !range[1] && currentDate.isSame(range[0], 'day');

  const unitedInRange = isInRange || isBookedDay;
  const unitedStart =
    isStartDay ||
    bookedRanges.some(([from]) => currentDate.isSame(from, 'day'));
  const unitedEnd =
    isEndDay || bookedRanges.some(([, to]) => currentDate.isSame(to, 'day'));

  const className = [
    styles.dayWrapper,
    unitedInRange ? styles.inRange : '',
    unitedStart ? styles.isStart : '',
    unitedEnd ? styles.isEnd : '',
    isToday ? styles.isToday : '',
    isSelected ? styles.isSelected : '',
    !isOwner && isBookedDay ? styles.renterBookedColor : '',
  ]
    .filter(Boolean)
    .join(' ');

  const cell = <div className={className}>{currentDate.date()}</div>;

  if (!isOwner && isBookedDay) {
    return (
      <Tooltip placement="top" title="На ці дати є бронювання" color={theme.N1}>
        {cell}
      </Tooltip>
    );
  }

  return cell;
};
