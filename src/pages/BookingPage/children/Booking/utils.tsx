import { StepProps } from 'antd';

import CheckIcon from 'src/assets/icons/check.svg?react';
import CrossIcon from 'src/assets/icons/cross-icon.svg?react';

const statusToIconMap = {
  finish: <CheckIcon />,
  process: <CheckIcon />,
  wait: <CheckIcon />,
  error: <CrossIcon />,
};

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  RETURNED = 'RETURNED',
  RATED = 'RATED',
  PAID = 'PAID',
  //This status is not available in the backend, but it is used in the frontend
  BOOKED = 'BOOKED',
}

export enum PaymentStatus {
  UNPAID = 'UNPAID',
  PAID = 'PAID',
  FAIL = 'FAIL',
  REFUNDED = 'REFUNDED',
  REFUNDED_IN_PROGRESS = 'REFUNDED_IN_PROGRESS',
}

const statusToStepMap: Record<
  Exclude<BookingStatus, BookingStatus.CANCELLED>,
  number
> = {
  [BookingStatus.PENDING]: 0,
  [BookingStatus.CONFIRMED]: 1,
  [BookingStatus.PAID]: 2,
  [BookingStatus.BOOKED]: 3,
  [BookingStatus.IN_PROGRESS]: 4,
  [BookingStatus.RETURNED]: 5,
  [BookingStatus.RATED]: 6,
  [BookingStatus.COMPLETED]: 7,
};

const getStepStatus = (
  currentStatus: BookingStatus | undefined,
  stepIndex: number
): StepProps['status'] => {
  // Convert PAID to BOOKED for display purposes
  const displayStatus =
    currentStatus === BookingStatus.PAID ? BookingStatus.BOOKED : currentStatus;

  // Get the current step number
  const currentStep =
    statusToStepMap[
      displayStatus as Exclude<BookingStatus, BookingStatus.CANCELLED>
    ] ?? -1;

  // Mark as finished if within current progress
  if (stepIndex <= currentStep) {
    return 'finish';
  }

  return 'wait';
};

export const renderItems = (
  status: BookingStatus | null,
  lastStatus: BookingStatus | undefined
): StepProps[] => {
  const steps: StepProps[] = [
    { title: 'Надіслано' },
    { title: 'Прийнято' },
    { title: 'Сплачено' },
    { title: <span style={{ marginLeft: '-20px' }}>Заброньовано</span> },
    { title: 'В оренді' },
    { title: <span style={{ marginLeft: '-7px' }}>Повернено</span> },
    { title: 'Відгук' },
  ];

  if (!status) return steps;

  // Convert PAID to BOOKED for display purposes
  const displayStatus =
    status === BookingStatus.PAID ? BookingStatus.BOOKED : status;

  const processedSteps = steps.map((step, index) => {
    const statusToUse =
      displayStatus === BookingStatus.CANCELLED ? lastStatus : displayStatus;

    const stepStatus = getStepStatus(statusToUse, index);

    return {
      ...step,
      icon: stepStatus === 'finish' ? statusToIconMap.finish : undefined,
      status: stepStatus,
    };
  });

  // If cancelled, inject the cancelled step after the last completed step
  if (displayStatus === BookingStatus.CANCELLED && lastStatus) {
    const lastCompletedStep =
      statusToStepMap[
        lastStatus === BookingStatus.PAID
          ? BookingStatus.BOOKED
          : (lastStatus as Exclude<BookingStatus, BookingStatus.CANCELLED>)
      ];

    const cancelledStep = {
      title: 'Скасовано',
      icon: statusToIconMap.error,
      status: 'error' as StepProps['status'],
    };

    processedSteps.splice(lastCompletedStep + 1, 0, cancelledStep);
  }

  return processedSteps;
};
