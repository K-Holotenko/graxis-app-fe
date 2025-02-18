import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Form, Col, Row, ConfigProvider } from 'antd';
import { APIProvider } from '@vis.gl/react-google-maps';

import { ROUTES } from 'src/router/routes';
import { FORMS, TEXT } from 'src/config/constants';
import { TextArea } from 'src/components/TextArea';
import { VALIDATION_CONDITION } from 'src/config/validation';
import { CategoriesDropdown } from 'src/pages/AddPublicationPage/children/CategoriesDropdown';
import { PriceInputs } from 'src/pages/AddPublicationPage/children/PriceInputs';
import { SuccessModal } from 'src/pages/AddPublicationPage/children/SuccessModal';
import { Button } from 'src/components/Button';
import { UploadList } from 'src/pages/AddPublicationPage/children/UploadList';
import { theme } from 'src/config/theme';
import { LocationAutocomplete } from 'src/pages/AddPublicationPage/children/LocationAutocomplete';

import type { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import styles from './styles.module.scss';

interface AddPublicationInputs {
  priceDay: string;
  priceWeek: string;
  priceMonth: string;
}

interface AddPublicationFormProps {
  onFinish?: () => void;
  onFinishFailed?: () => void;
  className?: string;
}

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';

export const AddPublicationForm = (props: AddPublicationFormProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);

    navigate(ROUTES.HOME);
  };

  const onFinish = (values: AddPublicationInputs) => {
    // eslint-disable-next-line no-console
    console.log('Success:', { values });
  };

  const onFinishFailed = (
    errorInfo: ValidateErrorEntity<AddPublicationInputs>
  ) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', { errorInfo });
  };

  const handleLocationChange = (
    location: google.maps.places.PlaceResult | null
  ) => {
    // eslint-disable-next-line no-console
    console.log('Selected place:', location);
  };

  return (
    <ConfigProvider theme={formTheme}>
      <Form
        form={form}
        name={FORMS.ADD_PUBLICATION_FORM}
        layout="vertical"
        requiredMark={false}
        onFinish={props.onFinish || onFinish}
        onFinishFailed={props.onFinishFailed || onFinishFailed}
      >
        <Row>
          <Col span={24}>
            <CategoriesDropdown labelStyles={styles.label} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <ConfigProvider theme={textAreaTheme}>
              <Form.Item
                label={TEXT.NAME}
                name="name"
                rules={[VALIDATION_CONDITION.REQUIRED]}
                className={styles.label}
              >
                <TextArea
                  placeholder={TEXT.INPUT_PUBLICATION_NAME}
                  showCount
                  autoSize={{ minRows: 1, maxRows: 2 }}
                  maxLength={150}
                  className={styles.textArea}
                />
              </Form.Item>
            </ConfigProvider>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <ConfigProvider theme={textAreaTheme}>
              <Form.Item
                label={TEXT.DESCRIPTION}
                name="description"
                className={styles.label}
                rules={[VALIDATION_CONDITION.REQUIRED]}
              >
                <TextArea
                  placeholder={TEXT.INPUT_PUBLICATION_DESCRIPTION}
                  showCount
                  maxLength={1000}
                  rows={8}
                  className={styles.textArea}
                />
              </Form.Item>
            </ConfigProvider>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              className={styles.label}
              label={TEXT.ADD_PHOTO}
              name="photo"
              rules={[{ required: true, message: TEXT.ADD_PHOTO }]}
            >
              <UploadList />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              className={styles.label}
              label={TEXT.COST}
              name="price"
              rules={[{ required: true, message: TEXT.SET_AT_LEAST_ONE_PRICE }]}
            >
              <PriceInputs />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              className={styles.label}
              label={TEXT.LOCATION_NAME}
              name="location"
              rules={[{ required: true, message: 'Enter location' }]}
            >
              <APIProvider apiKey={API_KEY} libraries={['places']}>
                <LocationAutocomplete onPlaceSelect={handleLocationChange} />
              </APIProvider>
            </Form.Item>
          </Col>
          <Col span={6} offset={18}>
            <Button onClick={showModal} label={TEXT.PUBLISH} />
          </Col>
        </Row>
      </Form>
      <SuccessModal isModalOpen={isModalOpen} handleClose={handleModalClose} />
    </ConfigProvider>
  );
};

const formTheme = {
  components: {
    Form: {
      labelColor: theme.N6,
      itemMarginBottom: 40,
      labelFontSize: 26,
      verticalLabelPadding: 0,
    },
    Input: {
      paddingInline: 12,
    },
  },
};

const textAreaTheme = {
  components: {
    Input: {
      paddingBlock: 12,
    },
  },
};
