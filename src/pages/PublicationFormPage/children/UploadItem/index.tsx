import { useEffect, useState } from 'react';
import { Image, Upload, UploadFile, UploadProps, ConfigProvider } from 'antd';
import { RcFile } from 'antd/es/upload/interface';

import CameraIcon from 'src/assets/icons/camera-icon.svg?react';
import { theme } from 'src/config/theme';
import { useWindowSize } from 'src/hooks/useWindowSize';

import { beforeUpload, getBase64 } from './utils/utils';
import styles from './styles.module.scss';

interface UploadItemProps {
  onChange: (files: UploadFile) => void;
  onRemove: (file: UploadFile) => void;
  uploadStates: UploadFile[];
  file: UploadFile;
  index: number;
}

export const UploadItem: React.FC<UploadItemProps> = ({
  onChange,
  onRemove,
  file,
  uploadStates,
  index,
}) => {
  const { width } = useWindowSize();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile<RcFile>[]>([]);

  useEffect(() => {
    if (uploadStates[index]) {
      setFileList([uploadStates[index]]);
    } else {
      setFileList([]);
    }
  }, [uploadStates, index, width]);

  const handlePreview = async () => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as never);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    const filteredList = newFileList.filter((f) => !!f.originFileObj);

    setFileList(filteredList);
    if (filteredList.length > 0) {
      onChange(filteredList[0]);
    }
  };

  const uploadButton = (
    <button className={styles.button} type="button">
      <CameraIcon className={styles.cameraIcon} />
    </button>
  );

  return (
    <ConfigProvider theme={localTheme}>
      <div className={styles.uploadContainer}>
        <Upload
          listType="picture-card"
          onPreview={handlePreview}
          onChange={handleChange}
          onRemove={() => onRemove(file)}
          beforeUpload={beforeUpload}
          fileList={fileList}
          accept="image/png, image/jpeg, image/jpg"
        >
          {fileList.length === 1 ? null : uploadButton}
        </Upload>
        {previewImage && (
          <Image
            wrapperStyle={{ display: 'none' }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(''),
            }}
            src={previewImage}
          />
        )}
      </div>
    </ConfigProvider>
  );
};

const localTheme = {
  components: {
    Upload: {
      colorPrimary: 'transparent',
      colorBorder: 'transparent',
      colorFillAlter: theme.N1,
      paddingXS: 0,
    },
  },
};
