import { useState } from 'react';
import {
  Image,
  message,
  Upload,
  UploadFile,
  UploadProps,
  GetProp,
  ConfigProvider,
} from 'antd';

import { ReactComponent as CameraIcon } from 'src/assets/icons/camera-icon.svg';
import { theme } from 'src/config/theme';

import styles from './styles.module.scss';

interface UploadItemProps {
  onChange: (files: UploadFile) => void;
  onRemove: (file: UploadFile) => void;
  file: UploadFile;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const beforeUpload = (file: FileType) => {
  if (file.size > 2 * 1024 * 1024) {
    message.error('Image must smaller than 2MB');

    return Upload.LIST_IGNORE;
  }

  return false;
};

export const UploadItem: React.FC<UploadItemProps> = ({
  onChange,
  onRemove,
  file,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async () => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
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
    <ConfigProvider
      theme={{
        components: {
          Upload: {
            colorBgMask: 'transparent',
            colorPrimary: 'transparent',
            colorBorder: 'transparent',
            colorFillAlter: theme.whiteColor,
            paddingXS: 0,
          },
        },
      }}
    >
      <div className={styles.upLoadWrap}>
        <Upload
          className={styles.upLoad}
          listType="picture-card"
          onPreview={handlePreview}
          onChange={handleChange}
          onRemove={() => onRemove(file)}
          beforeUpload={beforeUpload}
          fileList={fileList}
          accept="image/png, image/jpeg, image/heic, image/heif, image/webp"
        >
          {uploadButton}
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
