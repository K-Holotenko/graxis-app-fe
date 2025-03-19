import { useState } from 'react';
import { Row, Col, Input, Space, Form } from 'antd';

import EditSrc from 'src/assets/icons/edit-fields-icon.svg';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { SCREEN_WIDTH, TEXT } from 'src/config/constants';
import {
  VALIDATION_CONDITION,
  VALIDATION_MESSAGE,
} from 'src/config/validation';

import styles from './styles.module.scss';

export const ContactInfo = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState('VasylSymonenko@gmail.com');
  const [countryCode, setCountryCode] = useState('+380');
  const [phone, setPhone] = useState('968756987');

  const { width } = useWindowSize();
  const isMobile = width < SCREEN_WIDTH.MD;

  const hasErrors = form
    .getFieldsError()
    .some(({ errors }) => errors.length > 0);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const rules = [
    { required: true, message: VALIDATION_MESSAGE.REQUIRED },
    {
      pattern: VALIDATION_CONDITION.PHONE_INPUT.pattern,
      message: VALIDATION_MESSAGE.INVALID_PHONE,
    },
  ];

  return (
    <section
      className={`${styles.contactInfoContainer} 
      ${isEditing ? styles.editingInfoContainer : ''} 
      ${hasErrors ? styles.errorInfoContainer : ''}`}
    >
      <Row className={styles.contactInfoBlock}>
        <Col>
          <h2 className={`${styles.contactInfoHeader} `}>
            {TEXT.CONTACT_INFO}
          </h2>
        </Col>
        <Col>
          {!isEditing && (
            <img
              src={EditSrc}
              alt="Редагувати"
              onClick={handleEditClick}
              className={styles.contactInfoEditIcon}
            />
          )}
        </Col>
      </Row>
      <Form
        layout="vertical"
        form={form}
        initialValues={{ email, phone: `${countryCode}${phone}` }}
      >
        <div
          className={`${styles.contactInfoEmailBlock} 
          ${isEditing ? styles.editingContactInfoEmailBlock : ''}
           ${hasErrors ? styles.errorContactInfoEmailBlock : ''}`}
        >
          <label
            className={`${styles.contactInfoLabel} 
            ${isEditing ? styles.editingContactInfoLabel : ''}
            ${hasErrors ? styles.errorContactInfoLabel : ''}`}
          >
            {TEXT.MAIL}
          </label>
          <Form.Item
            name="email"
            rules={[VALIDATION_CONDITION.EMAIL]}
            validateTrigger="onBlur"
          >
            {isEditing ? (
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.contactInfoInput}
              />
            ) : (
              <span className={styles.contactInfoValue}>{email}</span>
            )}
          </Form.Item>
        </div>
        <div className={styles.contactInfoPhoneBlock}>
          <label
            className={`${styles.contactInfoLabel} ${isEditing ? styles.editingContactInfoLabel : ''}`}
          >
            {TEXT.PHONE}
          </label>
          <Form.Item name="phone" rules={rules} validateTrigger="onBlur">
            {isEditing ? (
              <Space.Compact className={styles.contactInfoInput}>
                <Input
                  disabled
                  style={{ width: isMobile ? '70px' : '20%' }}
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                />
                <Input
                  style={{ width: isMobile ? '90%' : '80%' }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Space.Compact>
            ) : (
              <span className={styles.contactInfoValue}>
                {countryCode}
                {phone}
              </span>
            )}
          </Form.Item>
        </div>
      </Form>
    </section>
  );
};
