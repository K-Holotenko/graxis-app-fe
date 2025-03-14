import { useEffect, useState } from 'react';
import { ConfigProvider, Form, Upload, UploadFile, UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { Input, InputType } from 'src/components/Input';
import { Button } from 'src/components/Button';
import { FORMS, TEXT } from 'src/config/constants';
import { theme } from 'src/config/theme';
import { VALIDATION_CONDITION } from 'src/config/validation';
import { beforeUpload } from 'src/pages/AddPublicationPage/children/UploadItem/utils/config';
import { useUserStore } from 'src/stores/userStore';
import { NotificationType, useNotification } from 'src/hooks/useNotification';
import { ROUTES } from 'src/router/routes';
import { ADD_USER_INFO } from 'src/pages/AddUserInfoPage/utils/config';

import styles from './styles.module.scss';

export const AddUserInfoForm = () => {
  const [form] = Form.useForm();
  const [isValid, setIsValid] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const navigate = useNavigate();

  const { createUser } = useUserStore();
  const { openNotification } = useNotification();

  const allValues = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false));
  }, [form, allValues]);

  const triggerNotification = (err: string) => {
    openNotification(NotificationType.ERROR, 'Помилка', err);
  };

  const onFinish = () => {
    createUser(
      {
        name: allValues.name,
        surname: allValues.surname,
        avatar: allValues.avatar.file,
      },
      triggerNotification
    ).then(() => navigate(ROUTES.HOME));
  };

  const onChange = () => {
    setIsValid(form.isFieldsTouched(true));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const onRemove = (fileToRemove: UploadFile) => {
    const updatedFiles = fileList.filter(
      (file) => file.uid !== fileToRemove.uid
    );

    setFileList(updatedFiles);
    form.setFieldsValue({ avatar: updatedFiles });
  };

  const uploadButton = (
    <button className={styles.uploadButton} type="button">
      <PlusOutlined />
      <div className={styles.uploadPlaceholder}>
        {ADD_USER_INFO.UPLOAD_PLACEHOLDER}
      </div>
    </button>
  );

  return (
    <ConfigProvider theme={localTheme}>
      <Form
        className={styles.form}
        name={FORMS.ADD_USER_INFO_FORM}
        layout="vertical"
        onFinish={onFinish}
        form={form}
        requiredMark={false}
      >
        <Form.Item
          rootClassName={styles.uploadFormItem}
          label={ADD_USER_INFO.USER_AVATAR_LABEL}
          name="avatar"
          validateTrigger="onChange"
          validateStatus={isValid ? 'success' : undefined}
          className={styles.upload}
        >
          <Upload
            showUploadList={{ showPreviewIcon: false }}
            rootClassName={styles.upload}
            listType="picture-circle"
            onChange={handleChange}
            onRemove={() => onRemove(fileList[0])}
            beforeUpload={beforeUpload}
            fileList={fileList}
            accept="image/png, image/jpeg, image/jpg"
          >
            {fileList.length === 1 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item
          rootClassName={styles.nameFormItem}
          label={ADD_USER_INFO.USER_NAME_LABEL}
          name="name"
          rules={[VALIDATION_CONDITION.REQUIRED, VALIDATION_CONDITION.NAME]}
          validateTrigger="onChange"
          validateStatus={isValid ? 'success' : undefined}
        >
          <Input
            placeholder={ADD_USER_INFO.USER_NAME_PLACEHOLDER}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item
          rootClassName={styles.surnameFormItem}
          label={ADD_USER_INFO.USER_SURNAME_LABEL}
          name="surname"
          rules={[VALIDATION_CONDITION.REQUIRED, VALIDATION_CONDITION.NAME]}
          validateTrigger="onChange"
          validateStatus={isValid ? 'success' : undefined}
        >
          <Input
            placeholder={ADD_USER_INFO.USER_SURNAME_PLACEHOLDER}
            type={InputType.TEXT}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" isDisabled={!isValid} label={TEXT.SUBMIT} />
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

const localTheme = {
  components: {
    Form: {
      labelColor: theme.N5,
      itemMarginBottom: 12,
    },
    Upload: {
      paddingXS: 0,
      colorPrimary: theme.primary,
    },
  },
};
