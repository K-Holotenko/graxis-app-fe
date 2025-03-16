import { useState } from 'react';
import { Row, Col, Input, Space } from 'antd';

import EditSrc from 'src/assets/icons/edit-fields-icon.svg';

import styles from './styles.module.scss';

const ContactInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState('VasylSymonenko@gmail.com');
  const [countryCode, setCountryCode] = useState('+380');
  const [phone, setPhone] = useState('968756987');

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div
      className={`${styles.contactInfoContainer} ${isEditing ? styles.editingContainer : ''}`}
    >
      <Row justify="space-between" align="middle" className={styles.test}>
        <Col>
          <h2 className={styles.contactInfoHeader}>Контактна інформація</h2>
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
      <Row gutter={[0, 20]}>
        <Col span={24}>
          <label className={styles.contactInfoLabel}>Електронна пошта</label>
          {isEditing ? (
            <Space.Compact className={styles.inputContainer}>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.contactInfoInput}
              />
            </Space.Compact>
          ) : (
            <span className={styles.contactInfoValue}>{email}</span>
          )}
        </Col>
        <Col span={24}>
          <label className={styles.contactInfoLabel}>Номер телефону</label>
          {isEditing ? (
            <Space.Compact className={styles.inputContainer}>
              <Input
                disabled
                style={{ width: '20%' }}
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              />
              <Input
                style={{ width: '80%' }}
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
        </Col>
      </Row>
    </div>
  );
};

export default ContactInfo;
