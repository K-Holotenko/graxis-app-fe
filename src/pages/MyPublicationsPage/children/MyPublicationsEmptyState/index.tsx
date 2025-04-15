import { useNavigate } from 'react-router-dom';

import { Button } from 'src/components/Button';
import NoMyPublicationsImg from 'src/assets/icons/no-my-publications.svg?react';
import PlusIcon from 'src/assets/icons/plus-icon.svg?react';

import styles from './styles.module.scss';

interface MyPublicationsEmptyStateProps {
  message: string;
  buttonLabel: string;
  route: string;
  showIcon?: boolean;
}

export const MyPublicationsEmptyState = ({
  message,
  buttonLabel,
  route,
  showIcon = false,
}: MyPublicationsEmptyStateProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <NoMyPublicationsImg className={styles.noMyPublicationsImg} />
      <p className={styles.message}>{message}</p>
      <Button
        className={styles.button}
        label={buttonLabel}
        icon={showIcon ? <PlusIcon /> : undefined}
        iconPosition="end"
        onClick={() => navigate(route)}
      />
    </div>
  );
};
