import { ConfigProvider, Modal } from 'antd';

import { Button } from 'src/components/Button';
import { ButtonTypes } from 'src/config/constants';

import styles from './styles.module.scss';

interface DeleteModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const DeleteModal = ({
  isOpen,
  onCancel,
  onConfirm,
}: DeleteModalProps) => (
  <ConfigProvider theme={localTheme}>
    <Modal
      open={isOpen}
      onCancel={onCancel}
      classNames={{
        content: styles.myContent,
        body: styles.myBody,
        footer: styles.myFooter,
      }}
      className={styles.modal}
      width="100%"
      closable={false}
      centered
      footer={() => (
        <>
          <Button
            className={styles.deleteBtn}
            label="Видалити"
            onClick={onConfirm}
          />
          <Button
            className={styles.closeBtn}
            label="Скасувати"
            type={ButtonTypes.default}
            onClick={onCancel}
          />
        </>
      )}
    >
      <p className={styles.modalText}>
        Ви впевнені, що хочете видалити публікацію?
      </p>
    </Modal>
  </ConfigProvider>
);

const localTheme = {
  components: {
    Modal: {
      boxShadow: 'transparent',
      marginXS: 0,
    },
  },
};
