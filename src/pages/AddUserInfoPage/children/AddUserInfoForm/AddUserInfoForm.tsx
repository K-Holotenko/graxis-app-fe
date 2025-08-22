import { useEffect, useState } from 'react';
import {
  ConfigProvider,
  Form,
  Upload,
  UploadFile,
  UploadProps,
  Select,
  Tooltip,
} from 'antd';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

import { Input, InputType } from 'src/components/Input';
import { Button } from 'src/components/Button';
import { FORMS } from 'src/config/constants';
import { theme } from 'src/config/theme';
import { VALIDATION_CONDITION } from 'src/config/validation';
import { beforeUpload } from 'src/pages/PublicationFormPage/children/UploadItem/utils/utils';
import { NotificationType, useNotification } from 'src/hooks/useNotification';
import { ROUTES } from 'src/router/routes';
import { useAuthStore } from 'src/stores/authStore';

import styles from './styles.module.scss';

const cities = [
  {
    label: 'Львів',
    value: 'Львів',
  },
];

export const AddUserInfoForm = () => {
  const [form] = Form.useForm();
  const [isValid, setIsValid] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const navigate = useNavigate();

  const location = useLocation();
  const stateParams = location.state;

  const { isLoading, createUser } = useAuthStore();
  const { openNotification } = useNotification();

  const allValues = Form.useWatch([], form);

  useEffect(() => {
    if (stateParams) {
      form.setFieldsValue({
        name: stateParams.name,
        surname: stateParams.surname,
      });
    }
  }, [stateParams]);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false));
  }, [form, allValues]);

  const triggerNotification = (err: string) => {
    openNotification(NotificationType.ERROR, 'Помилка', err);
  };

  const onFinish = async () => {
    await createUser(
      {
        name: allValues.name,
        surname: allValues.surname,
        avatar: allValues?.avatar?.file,
        city: allValues.city,
      },
      triggerNotification
    );
    navigate(ROUTES.HOME);
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
      <div className={styles.uploadPlaceholder}>Завантажити</div>
    </button>
  );

  return (
    <ConfigProvider theme={localTheme}>
      <Form
        name={FORMS.ADD_USER_INFO_FORM}
        layout="vertical"
        onFinish={onFinish}
        form={form}
        requiredMark={false}
      >
        <Form.Item
          rootClassName={styles.uploadFormItem}
          label="Аватар"
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
          label="Імʼя"
          name="name"
          rules={[VALIDATION_CONDITION.REQUIRED, VALIDATION_CONDITION.NAME]}
          validateTrigger="onChange"
          validateStatus={isValid ? 'success' : undefined}
        >
          <Input placeholder="Введіть імʼя" onChange={onChange} />
        </Form.Item>
        <Form.Item
          label="Прізвище"
          name="surname"
          rules={[VALIDATION_CONDITION.REQUIRED, VALIDATION_CONDITION.NAME]}
          validateTrigger="onChange"
          validateStatus={isValid ? 'success' : undefined}
        >
          <Input placeholder="Введіть прізвище" type={InputType.TEXT} />
        </Form.Item>
        <div className={styles.city}>
          <Form.Item
            rootClassName={styles.cityFormItem}
            label="Місто"
            name="city"
            rules={[VALIDATION_CONDITION.REQUIRED]}
            validateTrigger="onChange"
            validateStatus={isValid ? 'success' : undefined}
          >
            <Select options={cities} className={styles.citySelect} />
          </Form.Item>
          <Tooltip
            color={theme.primary}
            title="Кількість міст тимчасово обмежена, ми працюємо над розширенням можливостей"
            className={styles.cityTooltip}
          >
            <InfoCircleOutlined className={styles.infoIcon} />
          </Tooltip>
        </div>
        <Form.Item>
          <Button
            htmlType="submit"
            size="large"
            isDisabled={!isValid}
            label={isLoading ? undefined : 'Продовжити'}
            isLoading={isLoading}
          />
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
    Select: {
      colorPrimary: theme.N5,
      hoverBorderColor: theme.N4,
      activeBorderColor: theme.N5,
      activeOutlineColor: 'none',
      optionSelectedBg: theme.N2,
    },
  },
};
