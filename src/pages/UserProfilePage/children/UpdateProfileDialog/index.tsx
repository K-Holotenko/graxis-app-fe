import { Col, FormInstance, Row } from 'antd';

import { ButtonTypes } from 'src/config/constants';
import { Button } from 'src/components/Button';
import { useUserStore } from 'src/stores/userStore';
import { NotificationType, useNotification } from 'src/hooks/useNotification';

import styles from './styles.module.scss';

interface UpdateProfileDialogProps {
  form: FormInstance;
  setIsEditingContactInfoForm: (state: boolean) => void;
}

export const UpdateProfileDialog = ({
  form,
  setIsEditingContactInfoForm,
}: UpdateProfileDialogProps) => {
  const { updateUser } = useUserStore();
  const { openNotification } = useNotification();
  const showError = (description: string) => {
    openNotification(NotificationType.ERROR, 'Помилка', description);
  };

  const handleUpdateUser = () => {
    updateUser(
      {
        email: form.getFieldValue('email'),
        phoneNumber: form.getFieldValue('phoneNumber'),
      },
      showError
    );
  };

  const isSaveButtonDisabled = form
    .getFieldsError()
    .some(({ errors }) => errors.length > 0);

  return (
    <Row>
      <Col className={styles.buttonsContainer}>
        <Button
          type={ButtonTypes.default}
          className={styles.buttonCancelChanges}
          label="Скасувати зміни"
          onClick={() => setIsEditingContactInfoForm(false)}
        />
        <Button
          type={ButtonTypes.primary}
          className={styles.buttonSaveChanges}
          label="Зберегти зміни"
          onClick={handleUpdateUser}
          isDisabled={isSaveButtonDisabled}
        />
      </Col>
    </Row>
  );
};
