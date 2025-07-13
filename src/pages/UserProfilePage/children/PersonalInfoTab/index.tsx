import { useEffect, useState } from 'react';
import { FormInstance } from 'antd';

import { useAuthStore } from 'src/stores/authStore';

import { PersonalInfo } from './PersonalInfo';
import { ContactInfo } from './ContactInfo';
import styles from './styles.module.scss';

interface PersonalInfoTabProps {
  form: FormInstance;
  shouldShowDialog: boolean;
  isPersonalInfoEditModeEnabled: boolean;
  isContactInfoEditModeEnabled: boolean;
  isValid: boolean;
  handleShowDialog: (shouldShow: boolean) => void;
  onPersonalInfoEditClick: (isEdit: boolean) => void;
  onContactInfoEditClick: (isEdit: boolean) => void;
  onPersonalInfoValidation: (valid: boolean) => void;
  onContactInfoValidation: (valid: boolean) => void;
}

export const PersonalInfoTab = ({
  form,
  shouldShowDialog,
  isPersonalInfoEditModeEnabled,
  isContactInfoEditModeEnabled,
  isValid,
  handleShowDialog,
  onPersonalInfoEditClick,
  onContactInfoEditClick,
  onPersonalInfoValidation,
  onContactInfoValidation,
}: PersonalInfoTabProps) => {
  const { user } = useAuthStore();
  const [hasPersonalInfoChanged, setHasPersonalInfoChanged] = useState(false);
  const [hasContactInfoChanged, setHasContactInfoChanged] = useState(false);

  const handleFieldChange = () => {
    if (!form.isFieldsTouched() || !user) return;

    const values = form.getFieldsValue();

    const personalInfoFields: Array<keyof typeof user> = [
      'name',
      'surname',
      'avatarUrl',
    ];
    const contactInfoFields: Array<keyof typeof user> = [
      'email',
      'phoneNumber',
    ];

    const personalInfoHasChanges = personalInfoFields.some((field) => {
      if (field === 'avatarUrl') {
        const ifAvatarChanged =
          values.avatarUrl?.file?.status !== 'removed' &&
          form.isFieldTouched('avatarUrl') &&
          values.avatarUrl !== user.avatarUrl;

        return ifAvatarChanged;
      }

      return form.isFieldTouched(field) && values[field] !== user[field];
    });

    const contactInfoHasChanges = contactInfoFields.some(
      (field) => form.isFieldTouched(field) && values[field] !== user[field]
    );

    setHasContactInfoChanged(contactInfoHasChanges);
    setHasPersonalInfoChanged(personalInfoHasChanges);

    const ifSomeFieldChanged = personalInfoHasChanges || contactInfoHasChanges;

    handleShowDialog(ifSomeFieldChanged);
  };

  // Handles dialog visibility when the user clicks on the edit button
  useEffect(() => {
    const isPersonalInfoChangedAndEditEnabled =
      hasPersonalInfoChanged && isPersonalInfoEditModeEnabled;
    const isContactInfoChangedAndEditEnabled =
      hasContactInfoChanged && isContactInfoEditModeEnabled;

    handleShowDialog(
      isContactInfoChangedAndEditEnabled || isPersonalInfoChangedAndEditEnabled
    );
  }, [isPersonalInfoEditModeEnabled, isContactInfoEditModeEnabled]);

  useEffect(() => {
    if (!isValid || !shouldShowDialog) {
      return;
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [shouldShowDialog]);

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.firstCardWrapper}>
        <PersonalInfo
          form={form}
          onChange={handleFieldChange}
          onPersonalInfoValidation={onPersonalInfoValidation}
          onPersonalInfoEditClick={onPersonalInfoEditClick}
          isPersonalInfoEditModeEnabled={isPersonalInfoEditModeEnabled}
        />
      </div>
      <div className={styles.contactInfoWrapper}>
        <ContactInfo
          form={form}
          onChange={handleFieldChange}
          onContactInfoValidation={onContactInfoValidation}
          onContactInfoEditClick={onContactInfoEditClick}
          isContactInfoEditModeEnabled={isContactInfoEditModeEnabled}
        />
      </div>
    </section>
  );
};
