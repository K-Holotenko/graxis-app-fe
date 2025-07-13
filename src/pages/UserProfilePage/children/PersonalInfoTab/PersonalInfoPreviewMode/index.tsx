import { Avatar } from 'antd';

import { useAuthStore } from 'src/stores/authStore';

import styles from './styles.module.scss';

export const PersonalInfoPreviewMode = () => {
  const { user } = useAuthStore();

  return (
    <div className={styles.contentContainer}>
      <Avatar
        size={{ xs: 100, sm: 100, md: 168, lg: 168, xl: 168, xxl: 168 }}
        src={user?.avatarUrl}
        className={styles.avatar}
      >
        {user?.name?.charAt(0)}
        {user?.surname?.charAt(0)}
      </Avatar>
      <div className={styles.infoContainer}>
        <div className={styles.nameContainer}>
          <p className={styles.label}>Імʼя</p>
          <p className={styles.value}>{user?.name || 'Не вказано'}</p>
        </div>
        <p className={styles.label}>Прізвище</p>
        <p className={styles.value}>{user?.surname || 'Не вказано'}</p>
      </div>
    </div>
  );
};
