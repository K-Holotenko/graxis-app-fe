import { message, UploadProps, Upload, GetProp } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const beforeUpload = (
  file: FileType
): string | false | typeof Upload.LIST_IGNORE => {
  if (file.size > 2 * 1024 * 1024) {
    message.error('Image must smaller than 2MB');

    return Upload.LIST_IGNORE;
  }

  return false;
};
