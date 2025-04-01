import { FormInstance } from 'antd';

import { PersonalInfoEditMode } from 'src/pages/UserProfilePage/children/PersonalInfoTab/PersonalInfoEditMode';
import { PersonalInfoPreviewMode } from 'src/pages/UserProfilePage/children/PersonalInfoTab/PersonalInfoPreviewMode';
import { ProfileCard } from 'src/pages/UserProfilePage/children/PersonalInfoTab/ProfileCard';

interface PersonalInfoProps {
  form: FormInstance;
  onChange: () => void;
  onPersonalInfoEditClick: (isEdit: boolean) => void;
  onPersonalInfoValidation: (isValid: boolean) => void;
  isPersonalInfoEditModeEnabled: boolean;
}

export const PersonalInfo = ({
  form,
  isPersonalInfoEditModeEnabled,
  onChange,
  onPersonalInfoEditClick,
  onPersonalInfoValidation,
}: PersonalInfoProps) => (
  <ProfileCard
    handleEditClick={() => {
      onPersonalInfoEditClick(!isPersonalInfoEditModeEnabled);
      // On change is called to update the hasChanged state in the parent component
      onChange();
    }}
  >
    {isPersonalInfoEditModeEnabled ? (
      <PersonalInfoEditMode
        form={form}
        onChange={onChange}
        onPersonalInfoValidation={onPersonalInfoValidation}
      />
    ) : (
      <PersonalInfoPreviewMode />
    )}
  </ProfileCard>
);
