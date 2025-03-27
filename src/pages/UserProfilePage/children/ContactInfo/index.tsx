import { useEffect, useState } from 'react';
import { Row, Col, Form, FormInstance } from 'antd';

import EditSrc from 'src/assets/icons/edit-fields-icon.svg?react';
import { useUserStore } from 'src/stores/userStore';
import { ContactInfoPreviewMode } from 'src/pages/UserProfilePage/children/ContactInfoPreviewMode';
import { ContactInfoEditMode } from 'src/pages/UserProfilePage/children/ContactInfoEditMode';

import styles from './styles.module.scss';

interface ContactInfoProps {
  form: FormInstance;
  setIsEditingContactInfoForm: (state: boolean) => void;
  isEditingContactInfoForm: boolean;
}

export const ContactInfo = ({
  form,
  setIsEditingContactInfoForm,
  isEditingContactInfoForm,
}: ContactInfoProps) => {
  const { user } = useUserStore();
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    form.setFieldsValue({ email: user?.email, phoneNumber: user?.phoneNumber });
    checkErrors();
  }, [isEditingContactInfoForm]);

  const checkErrors = () => {
    const numberOfErrors = form
      .getFieldsError()
      .filter(({ errors }) => errors.length > 0).length;

    setErrorCount(numberOfErrors);
  };

  const handleFieldsChange = () => {
    checkErrors();
  };

  const handleEditClick = () => setIsEditingContactInfoForm(true);

  const hasSingleFieldError = errorCount === 1 && isEditingContactInfoForm;
  const hasMultipleFieldErrors = errorCount > 1 && isEditingContactInfoForm;

  return (
    <section
      className={`contact-form-section ${styles.contactInfoContainer} 
      ${isEditingContactInfoForm ? styles.editingContactInfoContainer : ''} 
      ${hasSingleFieldError ? styles.warningContactInfoContainer : ''} 
      ${hasMultipleFieldErrors ? styles.errorContactInfoContainer : ''}`}
    >
      <Row className={styles.contactInfoBlock}>
        <Col>
          <h2
            className={`${styles.contactInfoHeader} 
            ${isEditingContactInfoForm ? styles.editingContactInfoHeader : ''} 
            ${hasSingleFieldError ? styles.warningContactInfoHeader : ''} 
            ${hasMultipleFieldErrors ? styles.errorContactInfoHeader : ''}`}
          >
            Контактна інформація
          </h2>
        </Col>
        <Col>
          {!isEditingContactInfoForm && (
            <EditSrc
              onClick={handleEditClick}
              className={styles.contactInfoEditIcon}
            />
          )}
        </Col>
      </Row>
      <Form layout="vertical" form={form} onFieldsChange={handleFieldsChange}>
        {isEditingContactInfoForm ? (
          <ContactInfoEditMode
            hasSingleFieldError={hasSingleFieldError}
            hasMultipleFieldErrors={hasMultipleFieldErrors}
          />
        ) : (
          <ContactInfoPreviewMode
            user={user || {}}
            handleEditClick={handleEditClick}
          />
        )}
      </Form>
    </section>
  );
};
