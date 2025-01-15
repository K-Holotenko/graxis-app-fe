import { Modal } from 'antd';

import successIconSrc from 'src/assets/icons/success_icon.svg';
import { Button } from 'src/components/Button';
import { Heading } from 'src/components/Heading';
import { TEXT, IMAGE_DESCRIPTION } from 'src/config/constants';

import styles from './styles.module.scss';

interface SuccessModalProps {
  isModalOpen: boolean;
  handleClose?: () => void;
}

export const SuccessModal = ({
  isModalOpen,
  handleClose,
}: SuccessModalProps) => (
  <>
    <Modal
      open={isModalOpen}
      onOk={handleClose}
      onCancel={handleClose}
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
        <p className={styles.description}>{TEXT.GOODS_PUBLISHED}</p>
        <Button
          label={TEXT.OK}
          className={styles.buttonWidth}
          onClick={handleClose}
        />
      </div>
    </Modal>
  </>
);
