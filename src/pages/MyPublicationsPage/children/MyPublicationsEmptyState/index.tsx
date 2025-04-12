import { useNavigate } from 'react-router-dom';

import { Button } from 'src/components/Button';
import NoMypblications from 'src/assets/icons/no-my-publications.svg?react';
import PlusIcon from 'src/assets/icons/plus-icon.svg?react';

import styles from './styles.module.scss';

interface MyPublicationsEmptyStateProps {
  message: string;
  buttonLabel: string;
  navigateTo: string;
  showIcon?: boolean;
}

export const MyPublicationsEmptyState = ({
  message,
  buttonLabel,
  navigateTo,
  showIcon = false,
}: MyPublicationsEmptyStateProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <NoMypblications className={styles.noMyPublicationsImg} />
      <p className={styles.message}>{message}</p>
      <Button
        className={styles.button}
        label={buttonLabel}
        icon={showIcon ? <PlusIcon /> : undefined}
        iconPosition="end"
        onClick={() => navigate(navigateTo)}
      />
    </div>
  );
};
