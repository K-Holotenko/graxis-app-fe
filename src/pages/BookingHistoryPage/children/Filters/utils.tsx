import { Tag } from 'antd';

import { statusToColorMap, statusToLabelMap } from 'src/config/constants';
import { BookingStatus, UserRole } from 'src/types';

export const statusOptions = [
  {
    value: BookingStatus.PENDING,
    label: (
      <Tag color={statusToColorMap[BookingStatus.PENDING]}>
        {statusToLabelMap[BookingStatus.PENDING]}
      </Tag>
    ),
  },
  {
    value: BookingStatus.CONFIRMED,
    label: (
      <Tag color={statusToColorMap[BookingStatus.CONFIRMED]}>
        {statusToLabelMap[BookingStatus.CONFIRMED]}
      </Tag>
    ),
  },
  {
    value: BookingStatus.IN_PROGRESS,
    label: (
      <Tag color={statusToColorMap[BookingStatus.IN_PROGRESS]}>
        {statusToLabelMap[BookingStatus.IN_PROGRESS]}
      </Tag>
    ),
  },
  {
    value: BookingStatus.BOOKED,
    label: (
      <Tag color={statusToColorMap[BookingStatus.BOOKED]}>
        {statusToLabelMap[BookingStatus.BOOKED]}
      </Tag>
    ),
  },
  {
    value: BookingStatus.OWNER_RATED,
    label: (
      <Tag color={statusToColorMap[BookingStatus.OWNER_RATED]}>
        {statusToLabelMap[BookingStatus.OWNER_RATED]}
      </Tag>
    ),
  },
  {
    value: BookingStatus.RENTER_RATED,
    label: (
      <Tag color={statusToColorMap[BookingStatus.RENTER_RATED]}>
        {statusToLabelMap[BookingStatus.RENTER_RATED]}
      </Tag>
    ),
  },
  {
    value: BookingStatus.RATED,
    label: (
      <Tag color={statusToColorMap[BookingStatus.RATED]}>
        {statusToLabelMap[BookingStatus.RATED]}
      </Tag>
    ),
  },
  {
    value: BookingStatus.RETURNED,
    label: (
      <Tag color={statusToColorMap[BookingStatus.RETURNED]}>
        {statusToLabelMap[BookingStatus.RETURNED]}
      </Tag>
    ),
  },
  {
    value: BookingStatus.CANCELLED,
    label: (
      <Tag color={statusToColorMap[BookingStatus.CANCELLED]}>
        {statusToLabelMap[BookingStatus.CANCELLED]}
      </Tag>
    ),
  },
];

export const sortingOptions = [
  { label: 'Від найдешевших до найдорожчих', value: 'price-asc' },
  { label: 'Від найдорожчих до найдешевших', value: 'price-desc' },
  { label: 'Від найстаріших до найновіших', value: 'date-asc' },
  { label: 'Від найновіших до найстаріших', value: 'date-desc' },
];

export const roleOptions = [
  { label: 'Я власник', value: UserRole.OWNER },
  { label: 'Я орендар', value: UserRole.RENTER },
];
