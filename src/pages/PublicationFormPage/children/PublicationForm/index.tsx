import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Col, Row, ConfigProvider, UploadFile } from 'antd';
import { APIProvider } from '@vis.gl/react-google-maps';

import { ROUTES } from 'src/router/routes';
import { FORMS } from 'src/config/constants';
import { TextArea } from 'src/components/TextArea';
import {
  VALIDATION_CONDITION,
  VALIDATION_MESSAGE,
} from 'src/config/validation';
import { CategoriesDropdown } from 'src/pages/PublicationFormPage/children/CategoriesDropdown';
import { PriceInputs } from 'src/pages/PublicationFormPage/children/PriceInputs';
import { SuccessModal } from 'src/pages/PublicationFormPage/children/SuccessModal';
import { Button } from 'src/components/Button';
import { theme } from 'src/config/theme';
import { LocationAutocomplete } from 'src/pages/PublicationFormPage/children/LocationAutocomplete';
import { NotificationType, useNotification } from 'src/hooks/useNotification';
import {
  createPublication,
  deletePublicationImageById,
  MyPublication,
  updatePublication,
} from 'src/services/PublicationService';
import { usePublication } from 'src/hooks/usePublication';
import { UploadList } from 'src/pages/PublicationFormPage/children/UploadList';

import styles from './styles.module.scss';
import { formatPrices, mapPublicationToFormFields } from './utils/utils';

export interface Location {
  country: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
}

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
  const [newPublicationId, setNewPublicationId] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const locationUrl = useLocation();
  const isEdit = locationUrl.pathname.includes('edit-publication');

  const navigate = useNavigate();
  const params = useParams();

  const { openNotification } = useNotification();

  const { publication, isPublicationLoading } = usePublication();

  const [fileIdToRemove, setFileIdToRemove] = useState<string[]>([]);

  useEffect(() => {
    if (!isEdit || !publication || isPublicationLoading) {
      return;
    }

    const formFieldValues = mapPublicationToFormFields(
      publication as MyPublication
    );

    form.setFieldsValue(formFieldValues);
  }, [isEdit, isPublicationLoading, publication]);

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);

    if (!newPublicationId) {
      navigate(ROUTES.SEARCH_RESULTS);
    }

    const path = generatePath(ROUTES.PUBLICATION, {
      id: newPublicationId || '',
    });

    navigate(path);
  };

  const onFinish = async (values: PublicationInputs) => {
    const publicationData = {
      categoryName: values.category,
      title: values.title,
      description: values.description,
      prices: formatPrices(values),
      location: values.location,
      files: values.photos,
    };

    try {
      if (!isEdit) {
        setIsLoading(true);
        const createdPublication = await createPublication(publicationData);

        setNewPublicationId(createdPublication.id);

        showModal();

        return;
      }

      setIsLoading(true);
      await updatePublication(publicationData, publication?.id);
      setIsLoading(false);

      if (fileIdToRemove.length) {
        await Promise.all(
          fileIdToRemove.map((uid) =>
            deletePublicationImageById(params.id, uid)
          )
        );
      }

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

  const collectFileIdToRemove = (fileId: string) => {
    setFileIdToRemove((prev) => Array.from(new Set([...prev, fileId])));
  };

  return (
    <ConfigProvider theme={formTheme}>
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
                label={<label className={styles.formItemLabel}>Назва</label>}
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
                label={<label className={styles.formItemLabel}>Опис</label>}
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
              label={
                <label className={styles.formItemLabel}>Додайте фото</label>
              }
              name="photos"
              rules={[{ required: true, message: 'Додайте фото' }]}
            >
              <UploadList
                isEdit={isEdit}
                collectFileIdToRemove={collectFileIdToRemove}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label={<label className={styles.formItemLabel}>Вартість</label>}
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
              label={<label className={styles.formItemLabel}>Локація</label>}
              name="location"
              rules={[{ required: true, message: 'Введіть локацію' }]}
            >
              <APIProvider apiKey={API_KEY} libraries={['places']}>
                <LocationAutocomplete />
              </APIProvider>
              <p className={styles.helperText}>
                Почніть вводити адресу та оберіть відповідний варіант із списку,
                що з’явиться.
              </p>
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
