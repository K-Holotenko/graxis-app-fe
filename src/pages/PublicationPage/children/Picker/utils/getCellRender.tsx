import { Tooltip } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';

import { theme } from 'src/config/theme';
import styles from 'src/pages/PublicationPage/children/Picker/styles.module.scss';

interface GetCellRenderParams {
  currentDate: string | number | Dayjs;
  range: [Dayjs | null, Dayjs | null];
  bookedRanges: [Dayjs, Dayjs][];
  isOwner: boolean;
}

export const getCellRender = ({
  currentDate,
  range,
  bookedRanges,
  isOwner,
}: GetCellRenderParams) => {
  const date = dayjs(currentDate);
  const isDateBookedByOthers = bookedRanges.some(([from, to]) =>
    date.isBetween(from, to, 'day', '[]')
  );

  const isDateWithinSelectedRange =
    range[0] && range[1] && date.isBetween(range[0], range[1], 'day', '[]');
  const isStartDay = range[0] && date.isSame(range[0], 'day');
  const isEndDay = range[1] && date.isSame(range[1], 'day');
  const isToday = date.isSame(dayjs(), 'day');
  const isSingleSelectedDay =
    range[0] && !range[1] && date.isSame(range[0], 'day');

  const unitedInRange = isDateWithinSelectedRange || isDateBookedByOthers;
  const unitedStart =
    isStartDay || bookedRanges.some(([from]) => date.isSame(from, 'day'));
  const unitedEnd =
    isEndDay || bookedRanges.some(([, to]) => date.isSame(to, 'day'));

  const className = [
    styles.dayWrapper,
    unitedInRange ? styles.inRange : '',
    unitedStart ? styles.isStart : '',
    unitedEnd ? styles.isEnd : '',
    isToday ? styles.isToday : '',
    isSingleSelectedDay ? styles.isSelected : '',
    !isOwner && isDateBookedByOthers ? styles.renterBookedColor : '',
  ]
    .filter(Boolean)
    .join(' ');

  const cell = <div className={className}>{date.date()}</div>;

  if (!isOwner && isDateBookedByOthers) {
    return (
      <Tooltip placement="top" title="На ці дати є бронювання" color={theme.N1}>
        {cell}
      </Tooltip>
    );
  }

  return cell;
};
