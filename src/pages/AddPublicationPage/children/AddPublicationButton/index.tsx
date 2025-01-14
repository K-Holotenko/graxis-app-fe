import { Modal } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import successIconSrc from 'src/assets/icons/success_icon.svg';
import { Button } from 'src/components/Button';
import { Heading } from 'src/components/Heading';
import { TEXT, IMAGE_DESCRIPTION } from 'src/config/constants';
import { ROUTES } from 'src/router/routes';

import styles from './styles.module.scss';

const AddPublicationButton: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autoRedirectTimer, setAutoRedirectTimer] =
    useState<NodeJS.Timeout | null>(null);

  const showModal = () => {
    setIsModalOpen(true);

    const timer = setTimeout(() => {
      navigate(ROUTES.HOME);
      setIsModalOpen(false);
    }, 5000);

    setAutoRedirectTimer(timer);
  };

  const handleOk = () => {
    setIsModalOpen(false);

    if (autoRedirectTimer) {
      clearTimeout(autoRedirectTimer);
      setAutoRedirectTimer(null);
    }

    navigate(ROUTES.HOME);
  };

  const handleCancel = () => {
    setIsModalOpen(false);

    if (autoRedirectTimer) {
      clearTimeout(autoRedirectTimer);
      setAutoRedirectTimer(null);
    }

    navigate(ROUTES.HOME);
  };

  return (
    <>
      <Button onClick={showModal} label={TEXT.PUBLISH} />
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closeIcon={null}
        className={styles.modalWindow}
      >
        <div className={styles.center}>
          <img
            src={successIconSrc}
            alt={IMAGE_DESCRIPTION.SUCCESS}
            className={styles.img}
          />
          <Heading level={2} className={styles.headingLevel2}>
            {TEXT.SUCCESS}
          </Heading>
          <Heading className={styles.headingLevel4} level={4}>
            {TEXT.GOODS_PUBLISHED}
          </Heading>
          <Button
            label={TEXT.OK}
            className={styles.buttonWidth}
            onClick={handleOk}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddPublicationButton;
