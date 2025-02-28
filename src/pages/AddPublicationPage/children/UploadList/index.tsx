import { useState } from 'react';
import { Carousel, UploadFile, FormInstance } from 'antd';

import { UploadItem } from 'src/pages/AddPublicationPage/children/UploadItem/index';
import { SCREEN_WIDTH } from 'src/config/constants';
import { useWindowSize } from 'src/hooks/useWindowSize';

import styles from './styles.module.scss';

interface UploadListProps {
  form: FormInstance;
}

export const UploadList = ({ form }: UploadListProps) => {
  const { width } = useWindowSize();
  const [uploadStates, setUploadStates] = useState<UploadFile[]>([]);

  const isMobile = width < SCREEN_WIDTH.SM;

  const handleUpdateFiles = (file: UploadFile) => {
    setUploadStates((prev) => {
      const updatedFiles = [...prev, file];

      form.setFieldsValue({ photo: updatedFiles });

      return updatedFiles;
    });
  };

  const handleRemoveFile = (fileToRemove: UploadFile) => {
    const updatedFiles = uploadStates.filter(
      (file) => file.uid !== fileToRemove.uid
    );
    setTimeout(() => {
      setUploadStates(updatedFiles);
    }, 100);
  };

  const renderUploadItems = () =>
    [...Array(6)].map((_, index) => {
      const file = uploadStates[index];
      const fileUid = `${Date.now()}-${index}`;

      return (
        <div key={file ? file.uid : fileUid} className={styles.uploadItem}>
          <UploadItem
            uploadStates={uploadStates}
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
