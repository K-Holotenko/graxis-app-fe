import EditIcon from 'src/assets/icons/edit-fields-icon.svg?react';

import styles from './styles.module.scss';

interface ProfileCardProps {
  children: React.ReactNode;
  handleEditClick: () => void;
}

export const ProfileCard = ({
  children,
  handleEditClick,
}: ProfileCardProps) => (
  <div className={styles.card}>
    <EditIcon className={styles.editIcon} onClick={handleEditClick} />
    {children}
  </div>
);
