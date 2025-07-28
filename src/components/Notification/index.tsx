import { Badge } from 'antd';
import { Link, generatePath } from 'react-router-dom';

import { ROUTES } from 'src/router/routes';
import ChevronRight from 'src/assets/icons/chevron-right.svg?react';

import styles from './styles.module.scss';

interface NotificationProps {
  title: string;
  description: string;
  time: string;
  date: string;
  seen: boolean;
  id: string;
  isOpen?: boolean;
}

export const Notification = ({
  title,
  description,
  time,
  date,
  isOpen,
  seen,
  id,
}: NotificationProps) => (
  <Link
    to={generatePath(ROUTES.NOTIFICATIONS, { id })}
    replace={isOpen}
    className={styles.link}
  >
    <div
      className={`${styles.notificationItem} ${isOpen ? styles.notificationItemOpen : ''}`}
    >
      <div className={styles.notificationItemHeader}>
        <p className={styles.text}>{time}</p>
        <Badge dot={!seen} offset={[10, 0]}>
          <p className={styles.text}>{date}</p>
        </Badge>
      </div>
      <p className={styles.notificationItemTitle}>{title}</p>
      <div className={styles.notificationItemFooter}>
        <p className={`${styles.description} ${isOpen ? styles.textOpen : ''}`}>
          {description}
        </p>
        <ChevronRight
          className={`${isOpen ? styles.chevronDown : styles.chevronRight}`}
        />
      </div>
    </div>
  </Link>
);
