import { useEffect, useState } from 'react';
import { Row, Col, Input, Form } from 'antd';

import EditSrc from 'src/assets/icons/edit-fields-icon.svg';
import { TEXT } from 'src/config/constants';
import {
  VALIDATION_CONDITION,
  VALIDATION_MESSAGE,
} from 'src/config/validation';
import { useUserStore } from 'src/stores/userStore';

import styles from './styles.module.scss';

export const ContactInfo = () => {
  const {
    isEditingContactInfoForm,
    setIsEditingContactInfoForm,
    setContactInfoFormValues,
    user,
  } = useUserStore();

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue('email', user?.email);
    form.setFieldValue('phoneNumber', user?.phoneNumber);
    checkErrors();
  }, [isEditingContactInfoForm]);

  const [errorCount, setErrorCount] = useState(0);

  const { setIsSaveButtonDisabled } = useUserStore();

  const checkErrors = () => {
    const errors = form
      .getFieldsError()
      .filter(({ errors: fieldErrors }) => fieldErrors.length > 0).length;

    setErrorCount(errors);
    setIsSaveButtonDisabled(errors > 0);
  };

  const handleFieldsChange = () => {
    checkErrors();
    setContactInfoFormValues(
      form.getFieldValue('email'),
      form.getFieldValue('phoneNumber')
    );
  };

  const handleEditClick = () => {
    setIsEditingContactInfoForm(true);
  };

  const phoneRules = [
    {
      pattern: VALIDATION_CONDITION.PHONE_INPUT.pattern,
      message: VALIDATION_MESSAGE.INVALID_PHONE,
    },
  ];

  const emailRules = [
    {
      pattern: VALIDATION_CONDITION.EMAIL.pattern,
      message: VALIDATION_MESSAGE.EMAIL,
    },
  ];

  const getFieldClass = (field: string) => {
    const errors = form.getFieldError(field);

    if (errors.length > 0) {
      return styles.errorField;
    }

    return '';
  };

  return (
    <section
      className={`${styles.contactInfoContainer}
    ${isEditingContactInfoForm ? styles.editingInfoContainer : ''}
    ${errorCount === 1 && isEditingContactInfoForm ? styles.warningInfoContainer : ''}
    ${errorCount > 1 && isEditingContactInfoForm ? styles.errorInfoContainer : ''}`}
    >
      <Row className={styles.contactInfoBlock}>
        <Col>
          <h2
            className={`${styles.contactInfoHeader}
            ${isEditingContactInfoForm ? styles.editingInfoHeader : ''}
            ${errorCount === 1 && isEditingContactInfoForm ? styles.warningContactInfoHeader : ''}
            ${errorCount > 1 && isEditingContactInfoForm ? styles.errorContactInfoHeader : ''}`}
          >
            {TEXT.CONTACT_INFO}
          </h2>
        </Col>
        <Col>
          {!isEditingContactInfoForm && (
            <img
              src={EditSrc}
              alt="Редагувати"
              onClick={handleEditClick}
              className={styles.contactInfoEditIcon}
            />
          )}
        </Col>
      </Row>
      <Form layout="vertical" form={form} onFieldsChange={handleFieldsChange}>
        <div
          className={`${styles.contactInfoEmailBlock}
          ${isEditingContactInfoForm ? styles.editingContactInfoEmailBlock : ''}
          ${errorCount === 1 && isEditingContactInfoForm ? styles.warningContactEmailBlock : ''}
          ${errorCount > 1 && isEditingContactInfoForm ? styles.errorContactEmailBlock : ''}`}
        >
          <label
            className={`${styles.contactInfoLabel}
            ${isEditingContactInfoForm ? styles.editingContactInfoLabel : ''}
            ${errorCount === 1 && isEditingContactInfoForm ? styles.warningContactInfoLabel : ''}
            ${errorCount > 1 && isEditingContactInfoForm ? styles.errorContactInfoLabel : ''}
            `}
          >
            {TEXT.MAIL}
          </label>
          {isEditingContactInfoForm ? (
            <Form.Item
              name="email"
              rules={emailRules}
              validateTrigger="onChange"
            >
              <Input
                type="email"
                className={`${styles.contactInfoInput} ${getFieldClass('email')} 
                 ${isEditingContactInfoForm ? styles.editingcontactInfoInput : ''}
                 ${errorCount > 1 && isEditingContactInfoForm ? styles.errorContactInfoLabel : ''}`}
              />
            </Form.Item>
          ) : (
            <span
              className={`${styles.contactInfoValue} ${!user?.email && styles.undefinedContactInfoValue}`}
            >
              {user?.email || 'Не вказано'}
            </span>
          )}
        </div>
        <div>
          <label
            className={`${styles.contactInfoLabel}
            ${isEditingContactInfoForm ? styles.editingContactInfoLabel : ''}
            ${errorCount === 1 && isEditingContactInfoForm ? styles.warningContactInfoLabel : ''}
            ${errorCount > 1 && isEditingContactInfoForm ? styles.errorContactInfoLabel : ''}
            `}
          >
            {TEXT.PHONE}
          </label>
          {isEditingContactInfoForm ? (
            <Form.Item
              name="phoneNumber"
              rules={phoneRules}
              validateTrigger="onChange"
            >
              <Input
                addonBefore={'+380'}
                className={`${styles.contactInfoInput} ${getFieldClass('phoneNumber')}
                 ${isEditingContactInfoForm ? styles.editingcontactInfoInput : ''}
                ${errorCount > 1 && isEditingContactInfoForm ? styles.errorContactInfoInput : ''}`}
              />
            </Form.Item>
          ) : (
            <span
              className={`${styles.contactInfoValue} ${!user?.phoneNumber && styles.undefinedContactInfoValue}`}
            >
              {user?.phoneNumber ? `+380${user.phoneNumber}` : 'Не вказано'}
            </span>
          )}
        </div>
      </Form>
    </section>
  );
};
