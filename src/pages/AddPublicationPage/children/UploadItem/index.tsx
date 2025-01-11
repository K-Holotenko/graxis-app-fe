import { useEffect, useState } from 'react';
import {
  Image,
  Upload,
  UploadFile,
  UploadProps,
  GetProp,
  ConfigProvider,
} from 'antd';

import { ReactComponent as CameraIcon } from 'src/assets/icons/camera-icon.svg';
import { theme } from 'src/config/theme';
import { useWindowSize } from 'src/hooks/useWindowSize';

import { beforeUpload, getBase64 } from './utils/config';
import styles from './styles.module.scss';

interface UploadItemProps {
  onChange: (files: UploadFile) => void;
  onRemove: (file: UploadFile) => void;
  uploadStates: UploadFile[];
  file: UploadFile;
  index: number;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

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
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (uploadStates[index]) {
      setFileList([uploadStates[index]]);
    } else {
      setFileList([]);
    }
  }, [uploadStates, index, width]);

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
    <ConfigProvider theme={localTheme}>
      <div className={styles.uploadContainer}>
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
      colorFillAlter: theme.whiteColor,
      paddingXS: 0,
    },
  },
};
