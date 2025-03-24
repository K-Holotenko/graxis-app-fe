import { Col, Row } from 'antd';

import { ButtonTypes, TEXT } from 'src/config/constants';
import { Button } from 'src/components/Button';
import { useUserStore } from 'src/stores/userStore';

import styles from './styles.module.scss';

export const CancelAndSaveButtons = () => {
  const {
    setIsEditingContactInfoForm,
    saveContactInfoFormValues,
    isSaveButtonDisabled,
  } = useUserStore();

  return (
    <Row>
      <Col className={styles.buttonsContainer}>
        <Button
          type={ButtonTypes.default}
          className={styles.buttonCancelChanges}
          label={TEXT.CANCEL_CHANGES}
          onClick={() => setIsEditingContactInfoForm(false)}
        />
        <Button
          type={ButtonTypes.primary}
          className={styles.buttonSaveChanges}
          label={TEXT.SAVE_CHANGES}
          onClick={() => saveContactInfoFormValues()}
          isDisabled={isSaveButtonDisabled}
        />
      </Col>
    </Row>
  );
};
