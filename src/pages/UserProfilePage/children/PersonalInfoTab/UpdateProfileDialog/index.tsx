import { Col, FormInstance, Row } from 'antd';

import { ButtonTypes } from 'src/config/constants';
import { Button } from 'src/components/Button';
import { useUserStore } from 'src/stores/userStore';
import { NotificationType, useNotification } from 'src/hooks/useNotification';

import styles from './styles.module.scss';

interface UpdateProfileDialogProps {
  form: FormInstance;
  isValid: boolean;
  onPersonalInfoEditClick: (isEdit: boolean) => void;
  onContactInfoEditClick: (isEdit: boolean) => void;
  handleShowDialog: (shouldShow: boolean) => void;
}

export const UpdateProfileDialog = ({
  form,
  isValid,
  onPersonalInfoEditClick,
  onContactInfoEditClick,
  handleShowDialog,
}: UpdateProfileDialogProps) => {
  const { user, updateUser } = useUserStore();

  const { openNotification } = useNotification();
  const showError = (description: string) => {
    openNotification(NotificationType.ERROR, 'Помилка', description);
  };

  const handleUpdateUser = () => {
    updateUser(
      {
        name: form.getFieldValue('name') || undefined,
        surname: form.getFieldValue('surname') || undefined,
        email: form.getFieldValue('email') || undefined,
        phoneNumber: form.getFieldValue('phoneNumber') || undefined,
        avatar: form.getFieldValue('avatarUrl')?.file || undefined,
      },
      showError
    );

    onPersonalInfoEditClick(false);
    onContactInfoEditClick(false);
    handleShowDialog(false);
  };

  const cancelChanges = () => {
    onPersonalInfoEditClick(false);
    onContactInfoEditClick(false);
    handleShowDialog(false);

    form.setFieldsValue({
      name: user?.name,
      surname: user?.surname,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      avatarUrl: user?.avatarUrl,
    });
  };

  return (
    <Row>
      <Col className={styles.buttonsContainer}>
        <Button
          type={ButtonTypes.default}
          className={styles.buttonCancelChanges}
          label="Скасувати зміни"
          onClick={cancelChanges}
        />
        <Button
          type={ButtonTypes.primary}
          className={styles.buttonSaveChanges}
          label="Зберегти зміни"
          onClick={handleUpdateUser}
          isDisabled={!isValid}
        />
      </Col>
    </Row>
  );
};
