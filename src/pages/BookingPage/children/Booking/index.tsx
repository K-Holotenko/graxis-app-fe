import { ConfigProvider, StepProps, Steps } from 'antd';

import CheckIcon from 'src/assets/icons/check.svg?react';
import CrossIcon from 'src/assets/icons/cross-icon.svg?react';
import { theme } from 'src/config/theme';
import { Container } from 'src/pages/BookingPage/children/Container';
import { useBookingStore } from 'src/stores/bookingStore';
import { useBookingStatus } from 'src/hooks/useBookingStatus';

import type { Booking as BookingType } from 'src/services/Booking';
import styles from './styles.module.scss';
import BookingDetails from './BookingDetails';
import { Feedback } from './Feedback';

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
  //These statuses are not available in the backend, but it is used in the frontend
  PAID = 'PAID',
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
  currentStatus: BookingStatus,
  stepIndex: number,
  cancellationStep?: number
): StepProps['status'] => {
  // Convert PAID to BOOKED for display purposes
  const displayStatus =
    currentStatus === BookingStatus.PAID ? BookingStatus.BOOKED : currentStatus;

  if (displayStatus === BookingStatus.CANCELLED) {
    // If cancellationStep is provided, use it; otherwise default to step 1 (after PENDING)
    const cancelledAtStep = cancellationStep ?? 1;

    if (stepIndex < cancelledAtStep) {
      return 'finish'; // Steps before cancellation are completed
    } else if (stepIndex === cancelledAtStep) {
      return 'error'; // The step where cancellation occurred
    } else {
      return 'wait'; // Steps after cancellation
    }
  }

  const currentStep =
    statusToStepMap[
      displayStatus as Exclude<BookingStatus, BookingStatus.CANCELLED>
    ] ?? -1;

  if (stepIndex <= currentStep) {
    return 'finish';
  }

  return 'wait';
};

const determineCancellationStep = (
  booking: BookingType | null,
  lastStatus?: Exclude<BookingStatus, BookingStatus.CANCELLED>
): number => {
  // This function determines at which step the cancellation likely occurred
  // Using lastStatus parameter for precise cancellation step detection
  //
  // If lastStatus is provided, use it to determine exact cancellation point
  // Otherwise, fall back to payment status heuristic

  if (lastStatus) {
    // Cancellation occurs at the step after the last completed status
    return Math.min(statusToStepMap[lastStatus] + 1, 6); // Cap at step 6 (before final rating)
  }

  // Fallback logic when lastStatus is not available
  // Current logic:
  // - If there's no payment info or payment is unpaid, cancellation happened before payment (step 1 - "Прийнято")
  // - If payment was made, cancellation happened after payment (step 3 - "Заброньовано")

  if (!booking?.paymentStatus || booking.paymentStatus === 'UNPAID') {
    return 1; // Cancelled during confirmation phase
  }

  return 3; // Cancelled after payment/booking phase
};

const renderItems = (
  status: BookingStatus | null,
  booking: BookingType | null
): StepProps[] => {
  const steps: StepProps[] = [
    { title: 'Надіслано' },
    { title: 'Прийнято' },
    { title: 'Сплачено' },
    { title: <span style={{ marginLeft: '-18px' }}>Заброньовано</span> },
    { title: 'В оренді' },
    { title: 'Повернено' },
    { title: 'Відгук' },
  ];

  if (!status) return steps;

  // Convert PAID to BOOKED for display purposes
  const displayStatus =
    status === BookingStatus.PAID ? BookingStatus.BOOKED : status;

  // Determine cancellation step if status is cancelled
  // TODO: When backend provides lastStatus before cancellation, pass it here for precise cancellation step detection
  // Example: const lastStatus = booking?.lastStatusBeforeCancellation;
  const cancellationStep =
    displayStatus === BookingStatus.CANCELLED
      ? determineCancellationStep(booking, undefined) // Pass undefined until backend provides lastStatus
      : undefined;

  return steps.map((step, index) => {
    const stepStatus = getStepStatus(displayStatus, index, cancellationStep);
    const isCancelled =
      displayStatus === BookingStatus.CANCELLED && index === cancellationStep;

    return {
      ...step,
      icon:
        stepStatus === 'finish'
          ? statusToIconMap.finish
          : stepStatus === 'error'
            ? statusToIconMap.error
            : undefined,
      status: stepStatus,
      title: isCancelled ? 'Скасовано' : step.title,
    };
  });
};

export const Booking = () => {
  const { booking } = useBookingStore();
  const { bookingStatus } = useBookingStatus();

  const isFeedbackStep =
    bookingStatus === BookingStatus.RETURNED ||
    bookingStatus === BookingStatus.RATED;

  return (
    <Container>
      <div className={styles.booking}>
        <ConfigProvider theme={stepsTheme}>
          <Steps
            className={styles.steps}
            size="small"
            responsive={false}
            labelPlacement="vertical"
            items={renderItems(bookingStatus, booking)}
          />
        </ConfigProvider>
      </div>
      {isFeedbackStep ? <Feedback /> : <BookingDetails />}
    </Container>
  );
};

const stepsTheme = {
  token: {
    lineWidth: 2,
    colorSplit: theme.N3,
    colorPrimary: theme.primary,
    marginXS: 20,
    lineHeight: 1.5,
  },
  components: {
    Steps: {
      titleLineHeight: 1.5,
      fontSize: 16,
      iconSizeSM: 20,
    },
  },
};
