import { useState } from 'react';
import { Row, Col, Input, Space } from 'antd';

import EditSrc from 'src/assets/icons/edit-fields-icon.svg';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { SCREEN_WIDTH, TEXT } from 'src/config/constants';

import styles from './styles.module.scss';

const ContactInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState('VasylSymonenko@gmail.com');
  const [countryCode, setCountryCode] = useState('+380');
  const [phone, setPhone] = useState('968756987');

  const { width } = useWindowSize();
  const isMobile = width < SCREEN_WIDTH.MD;

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div
      className={`${styles.contactInfoContainer} ${isEditing ? styles.editingContainer : ''}`}
    >
      <Row
        justify="space-between"
        align="middle"
        className={styles.contactInfoBlock}
      >
        <Col>
          <h2 className={styles.contactInfoHeader}>{TEXT.CONTACT_INFO}</h2>
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
      <Row gutter={[0, isMobile ? 16 : 20]}>
        <Col span={24}>
          <label className={styles.contactInfoLabel}>{TEXT.MAIL}</label>
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
          <label className={styles.contactInfoLabel}>{TEXT.PHONE}</label>
          {isEditing ? (
            <Space.Compact className={styles.inputContainer}>
              <Input
                disabled
                style={{ width: isMobile ? '70px' : '20%' }}
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
