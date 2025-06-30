import { Carousel, UploadFile, Form, App } from 'antd';
import { useParams } from 'react-router-dom';

import { UploadItem } from 'src/pages/PublicationFormPage/children/UploadItem/index';
import { SCREEN_WIDTH } from 'src/config/constants';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { deletePublicationImageById } from 'src/services/PublicationService';

import styles from './styles.module.scss';

interface UploadListProps {
  isEdit: boolean;
}

export const UploadList = ({ isEdit }: UploadListProps) => {
  const form = Form.useFormInstance();
  const { id } = useParams();
  const { modal } = App.useApp();

  const { width } = useWindowSize();
  const currentFiles: UploadFile[] = form.getFieldValue('photos') || [];

  const isMobile = width < SCREEN_WIDTH.SM;

  const handleUpdateFiles = (file: UploadFile) => {
    const updatedFiles = [...currentFiles, file];

    form.setFieldsValue({ photos: updatedFiles });

    return updatedFiles;
  };

  const handleRemoveFile = async (fileToRemove: UploadFile) => {
    const updatedFiles = currentFiles.filter(
      (file) => file.uid !== fileToRemove.uid
    );

    if (isEdit && id) {
      modal.confirm({
        title: 'Ви впевнені, що хочете видалити це фото?',
        content: 'Це дія не може бути відмінена',
        className: styles.customModal,
        centered: true,
        okText: 'Підтвердити',
        cancelText: 'Скасувати',
        okType: 'danger',
        onOk: async () => {
          await deletePublicationImageById(id, fileToRemove.uid);
        },
        onCancel: () => {
          form.setFieldsValue({ photos: currentFiles });
        },
      });
    }

    setTimeout(() => {
      form.setFieldsValue({ photos: updatedFiles });
    }, 100);
  };

  const renderUploadItems = () =>
    [...Array(6)].map((_, index) => {
      const file = currentFiles[index];

      const fileUid = `${Date.now()}-${index}`;

      return (
        <div key={file ? file.uid : fileUid} className={styles.uploadItem}>
          <UploadItem
            uploadStates={currentFiles}
            file={file || ({ uid: fileUid } as UploadFile)}
            index={index}
            onChange={handleUpdateFiles}
            onRemove={handleRemoveFile}
          />
        </div>
      );
    });

  return isMobile ? (
    <Carousel
      className={styles.uploadList}
      dots={false}
      draggable
      slidesToShow={3}
      centerPadding="10px"
      infinite={false}
    >
      {renderUploadItems()}
    </Carousel>
  ) : (
    <div className={styles.uploadListDesktop}>{renderUploadItems()}</div>
  );
};
