import { useEffect, useState } from 'react';
import { Form, Upload, UploadProps, UploadFile, FormInstance } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { VALIDATION_CONDITION } from 'src/config/validation';
import { beforeUpload } from 'src/pages/AddPublicationPage/children/UploadItem/utils/config';
import { Input, InputType } from 'src/components/Input';
import { useUserStore } from 'src/stores/userStore';

import styles from './styles.module.scss';

interface PersonalInfoEditModeProps {
  form: FormInstance;
  onChange: () => void;
  onPersonalInfoValidation: (isValid: boolean) => void;
}

export const PersonalInfoEditMode = ({
  form,
  onChange,
  onPersonalInfoValidation,
}: PersonalInfoEditModeProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isValid, setIsValid] = useState(false);
  const { user } = useUserStore();

  const allValues = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => {
        onPersonalInfoValidation(true);
        setIsValid(true);
      })
      .catch(() => {
        onPersonalInfoValidation(false);
        setIsValid(false);
      });
  }, [form, allValues]);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const onRemove = (fileToRemove: UploadFile) => {
    const updatedFiles = fileList.filter(
      (file) => file.uid !== fileToRemove.uid
    );

    setFileList(updatedFiles);
  };

  const uploadButton = (
    <button className={styles.uploadButton} type="button">
      <PlusOutlined />
      <div className={styles.uploadPlaceholder}>Завантажити</div>
    </button>
  );

  return (
    <Form
      className={styles.form}
      name="updateUserPersonalInfoForm"
      layout="vertical"
      initialValues={{
        name: user?.name,
        surname: user?.surname,
        avatar: user?.avatarUrl,
      }}
      onValuesChange={onChange}
      form={form}
      requiredMark={false}
    >
      <Form.Item
        rootClassName={styles.uploadFormItem}
        label="Аватар"
        name="avatarUrl"
        validateTrigger="onChange"
        validateStatus={isValid ? 'success' : undefined}
        className={styles.upload}
      >
        <Upload
          showUploadList={{ showPreviewIcon: false }}
          listType="picture-circle"
          onChange={handleChange}
          onRemove={() => onRemove(fileList[0])}
          beforeUpload={beforeUpload}
          fileList={fileList}
          accept="image/png, image/jpeg, image/jpg"
          rootClassName={styles.upload}
        >
          {fileList.length === 1 ? null : uploadButton}
        </Upload>
      </Form.Item>
      <div className={styles.inputsContainer}>
        <Form.Item
          rootClassName={styles.nameFormItem}
          label="Імʼя"
          name="name"
          rules={[VALIDATION_CONDITION.REQUIRED, VALIDATION_CONDITION.NAME]}
          validateTrigger="onChange"
          validateStatus={isValid ? 'success' : undefined}
        >
          <Input placeholder="Введіть імʼя" />
        </Form.Item>
        <Form.Item
          rootClassName={styles.surnameFormItem}
          label="Прізвище"
          name="surname"
          rules={[VALIDATION_CONDITION.REQUIRED, VALIDATION_CONDITION.NAME]}
          validateTrigger="onChange"
          validateStatus={isValid ? 'success' : undefined}
        >
          <Input placeholder="Введіть прізвище" type={InputType.TEXT} />
        </Form.Item>
      </div>
    </Form>
  );
};
