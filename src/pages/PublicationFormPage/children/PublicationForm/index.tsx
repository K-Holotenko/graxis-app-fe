import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Form, Col, Row, ConfigProvider, UploadFile } from 'antd';
import { APIProvider } from '@vis.gl/react-google-maps';

import { ROUTES } from 'src/router/routes';
import { FORMS, SCREEN_WIDTH } from 'src/config/constants';
import { TextArea } from 'src/components/TextArea';
import {
  VALIDATION_CONDITION,
  VALIDATION_MESSAGE,
} from 'src/config/validation';
import { CategoriesDropdown } from 'src/pages/PublicationFormPage/children/CategoriesDropdown';
import { PriceInputs } from 'src/pages/PublicationFormPage/children/PriceInputs';
import { Button } from 'src/components/Button';
import { theme } from 'src/config/theme';
import { LocationAutocomplete } from 'src/pages/PublicationFormPage/children/LocationAutocomplete';
import { NotificationType, useNotification } from 'src/hooks/useNotification';
import {
  createPublication,
  updatePublication,
} from 'src/services/PublicationService';
import { MyPublication, Location } from 'src/types';
import { usePublication } from 'src/hooks/usePublication';
import { UploadList } from 'src/pages/PublicationFormPage/children/UploadList';
import { useWindowSize } from 'src/hooks/useWindowSize';

import styles from './styles.module.scss';
import { formatPrices, mapPublicationToFormFields } from './utils/utils';

interface PublicationInputs {
  category: string;
  title: string;
  description: string;
  photos: UploadFile[];
  priceDay: number;
  priceWeek: number;
  priceMonth: number;
  location: Location;
}

const API_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY || '';

export const PublicationForm = () => {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const locationUrl = useLocation();
  const isEdit = locationUrl.pathname.includes('edit-publication');

  const navigate = useNavigate();
  const params = useParams();

  const { openNotification } = useNotification();

  const { publication, isPublicationLoading } = usePublication();

  const { width } = useWindowSize();
  const isMobile = useMemo(() => width < SCREEN_WIDTH.SM, [width]);

  useEffect(() => {
    if (!isEdit || !publication || isPublicationLoading) {
      return;
    }

    const formFieldValues = mapPublicationToFormFields(
      publication as MyPublication
    );

    form.setFieldsValue(formFieldValues);
  }, [isEdit, isPublicationLoading, publication]);

  useEffect(() => {
    if (isEdit) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isEdit]);

  const allValues = Form.useWatch([], form);

  const photos = Form.useWatch('photos', form);

  useEffect(() => {
    const priceDay = form.getFieldValue('priceDay');
    const priceWeek = form.getFieldValue('priceWeek');
    const priceMonth = form.getFieldValue('priceMonth');

    form
      .validateFields({ validateOnly: true })
      .then(() => {
        const isAtLeastOnePriceFilled = [priceDay, priceWeek, priceMonth].some(
          (price) => price && +price > 0
        );

        setIsValid(photos?.length && isAtLeastOnePriceFilled);
      })
      .catch(() => setIsValid(false));
  }, [form, allValues, photos]);

  const onFinish = async (values: PublicationInputs) => {
    const publicationData = {
      categoryName: values.category,
      title: values.title,
      description: values.description,
      prices: formatPrices(values),
      location: values.location,
      files: values.photos,
    };

    setIsLoading(true);

    try {
      if (!isEdit) {
        const createdPublication = await createPublication(publicationData);

        const path = generatePath(ROUTES.PUBLICATION, {
          id: createdPublication.id || '',
        });

        openNotification(
          NotificationType.SUCCESS,
          'Готово',
          'Публікацію успішно створено'
        );

        navigate(path);

        return;
      }

      await updatePublication(publicationData, publication?.id);

      openNotification(
        NotificationType.SUCCESS,
        'Готово',
        'Публікацію успішно оновлено'
      );

      navigate(generatePath(ROUTES.PUBLICATION, { id: params.id }));
    } catch {
      openNotification(
        NotificationType.ERROR,
        VALIDATION_MESSAGE.ERROR,
        VALIDATION_MESSAGE.TRY_AGAIN
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ConfigProvider theme={formTheme(isMobile)}>
      <Form
        form={form}
        name={FORMS.ADD_PUBLICATION_FORM}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
      >
        <Row>
          <Col span={24}>
            <CategoriesDropdown labelStyles={styles.formItemLabel} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <ConfigProvider theme={textAreaTheme}>
              <Form.Item
                label={<p className={styles.formItemLabel}>Назва</p>}
                name="title"
                rules={[VALIDATION_CONDITION.REQUIRED]}
              >
                <TextArea
                  placeholder="Введіть назву оголошення"
                  showCount
                  autoSize={{ minRows: 1, maxRows: 2 }}
                  maxLength={150}
                  className={styles.textArea}
                  onChange={(e) =>
                    form.setFieldsValue({ title: e.target.value })
                  }
                />
              </Form.Item>
            </ConfigProvider>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <ConfigProvider theme={textAreaTheme}>
              <Form.Item
                label={<p className={styles.formItemLabel}>Опис</p>}
                name="description"
                rules={[VALIDATION_CONDITION.REQUIRED]}
              >
                <TextArea
                  placeholder="Введіть інформацію про товар"
                  showCount
                  maxLength={1000}
                  rows={8}
                  className={styles.textArea}
                  onChange={(e) =>
                    form.setFieldsValue({ description: e.target.value })
                  }
                />
              </Form.Item>
            </ConfigProvider>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label={<p className={styles.formItemLabel}>Додайте фото</p>}
              name="photos"
              rules={[{ required: true, message: 'Додайте фото' }]}
            >
              <UploadList isEdit={isEdit} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label={<p className={styles.formItemLabel}>Вартість</p>}
              className={styles.label}
              rules={[
                {
                  required: true,
                  message: 'Принаймні одна ціна має бути вказана',
                },
              ]}
            >
              <PriceInputs />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label={<span className={styles.formItemLabel}>Локація</span>}
              name="location"
              rules={[{ required: true }]}
            >
              <APIProvider apiKey={API_KEY} libraries={['places']}>
                <LocationAutocomplete />
              </APIProvider>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Button
            className={styles.submitButton}
            htmlType="submit"
            label={isLoading ? '' : 'Опублікувати'}
            isDisabled={!isValid}
            isLoading={isLoading}
          />
        </Row>
      </Form>
    </ConfigProvider>
  );
};

const formTheme = (isMobile: boolean) => ({
  components: {
    Form: {
      labelColor: theme.N6,
      itemMarginBottom: isMobile ? theme.space200 : theme.space500,
      labelFontSize: 26,
      verticalLabelPadding: theme.space0,
    },
    Input: {
      paddingInline: theme.space150,
    },
  },
});

const textAreaTheme = {
  components: {
    Input: {
      paddingBlock: theme.space150,
    },
  },
};
