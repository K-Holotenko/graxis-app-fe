import { useUserStore } from 'src/stores/userStore';

import styles from './styles.module.scss';

export const ContactInfoPreviewMode = () => {
  const { user } = useUserStore();

  return (
    <div className={styles.contentContainer}>
      <div>
        <div className={styles.nameContainer}>
          <p className={styles.label}>Електронна пошта</p>
          <p className={styles.value}>{user?.email || 'Не вказано'}</p>
        </div>
        <p className={styles.label}>Номер телефону</p>
        <p className={styles.value}>{user?.phoneNumber || 'Не вказано'}</p>
      </div>
    </div>
  );
};
