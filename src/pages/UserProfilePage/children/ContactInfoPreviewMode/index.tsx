import styles from './styles.module.scss';

interface ContactInfoPreviewModeProps {
  user: { email?: string; phoneNumber?: string };
  handleEditClick: () => void;
}

export const ContactInfoPreviewMode = ({
  user,
}: ContactInfoPreviewModeProps) => (
  <>
    <div className={styles.contactInfoEmailBlock}>
      <label className={styles.contactInfoLabel}>Електронна пошта</label>
      <span
        className={`${styles.contactInfoValue} ${!user?.email && styles.undefinedContactInfoValue}`}
      >
        {user?.email || 'Не вказано'}
      </span>
    </div>

    <div>
      <label className={styles.contactInfoLabel}>Номер телефону</label>
      <span
        className={`${styles.contactInfoValue} ${!user?.phoneNumber && styles.undefinedContactInfoValue}`}
      >
        {user?.phoneNumber ? `+380${user.phoneNumber}` : 'Не вказано'}
      </span>
    </div>
  </>
);
