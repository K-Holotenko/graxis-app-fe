import { useState } from 'react';
import { Carousel, ConfigProvider, Form, UploadFile } from 'antd';

import { UploadItem } from 'src/pages/AddPublicationPage/children/UploadItem/index';
import { TEXT } from 'src/config/constants';

import styles from './styles.module.scss';

export const UploadList = () => {
  const [uploadStates, setUploadStates] = useState<UploadFile[]>([]);

  const handleUpdateFiles = (file: UploadFile) => {
    setUploadStates((prev) => [...prev, file]);
  };

  const handleRemoveFile = (fileToRemove: UploadFile) => {
    setUploadStates((prevFiles) =>
      prevFiles.filter((file) => file.uid !== fileToRemove.uid)
    );
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            itemMarginBottom: 0,
          },
        },
      }}
    >
      <Form.Item
        label={<span className={styles.formItemLabel}>{TEXT.ADD_PHOTO}</span>}
        name="photo"
        rules={[{ required: true, message: TEXT.ADD_PHOTO }]}
      >
        <Carousel
          className={styles.uploadList}
          dots={false}
          draggable
          responsive={[
            {
              breakpoint: 9999,
              settings: {
                rows: 2,
                slidesPerRow: 3,
              },
            },
            {
              breakpoint: 992,
              settings: {
                rows: 3,
                slidesPerRow: 2,
              },
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: '10',
              },
            },
          ]}
        >
          {[...Array(6)].map((_, index) => {
            const file = uploadStates[index];
            const fileUid = file?.uid || `${Date.now()}-${index}`;

            return (
              <div key={fileUid} className={styles.uploadItem}>
                <UploadItem
                  file={file || ({ uid: fileUid } as UploadFile)}
                  onChange={handleUpdateFiles}
                  onRemove={handleRemoveFile}
                />
              </div>
            );
          })}
        </Carousel>
      </Form.Item>
    </ConfigProvider>
  );
};
