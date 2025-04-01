import { FormInstance } from 'antd';

import { ContactInfoPreviewMode } from 'src/pages/UserProfilePage/children/PersonalInfoTab/ContactInfoPreviewMode';
import { ContactInfoEditMode } from 'src/pages/UserProfilePage/children/PersonalInfoTab/ContactInfoEditMode';
import { ProfileCard } from 'src/pages/UserProfilePage/children/PersonalInfoTab/ProfileCard';

import styles from './styles.module.scss';

interface ContactInfoProps {
  form: FormInstance;
  onChange: () => void;
  onContactInfoEditClick: (isEdit: boolean) => void;
  onContactInfoValidation: (isValid: boolean) => void;
  isContactInfoEditModeEnabled: boolean;
}

export const ContactInfo = ({
  form,
  onChange,
  onContactInfoEditClick,
  onContactInfoValidation,
  isContactInfoEditModeEnabled,
}: ContactInfoProps) => (
  <ProfileCard
    handleEditClick={() => {
      onContactInfoEditClick(!isContactInfoEditModeEnabled);
      // On change is called to update the hasChanged state in the parent component
      onChange();
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className={styles.header}>Контактна інформація</h2>

      {isContactInfoEditModeEnabled ? (
        <ContactInfoEditMode
          form={form}
          onChange={onChange}
          onContactInfoValidation={onContactInfoValidation}
        />
      ) : (
        <ContactInfoPreviewMode />
      )}
    </div>
  </ProfileCard>
);
