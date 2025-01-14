import './styles.scss';

import { Form, Col, Row } from 'antd';

import { FORMS, TEXT } from 'src/config/constants';
import { TextArea } from 'src/components/TextArea';
import { VALIDATION_CONDITION } from 'src/config/validation';
import { CategoriesDropdown } from 'src/pages/AddPublicationPage/children/CategoriesDropdown';
import { PriceInputs } from 'src/pages/AddPublicationPage/children/PriceInputs';
import { Input } from 'src/components/Input';

import type { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import AddPublicationButton from 'src/pages/AddPublicationPage/children/AddPublicationButton';

interface AddPublicationInputs {
  priceDay: string;
  priceWeek: string;
  priceMonth: string;
}

interface AddPublicationFormProps {
  onFinish?: () => void;
  onFinishFailed?: () => void;
}

export const AddPublicationForm = (props: AddPublicationFormProps) => {
  const [form] = Form.useForm();

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

  return (
    <Form
      form={form}
      name={FORMS.ADD_PUBLICATION_FORM}
      layout="vertical"
      onFinish={props.onFinish || onFinish}
      onFinishFailed={props.onFinishFailed || onFinishFailed}
    >
      <Row gutter={[0, 40]}>
        <Col span={24}>
          <CategoriesDropdown />
        </Col>
        <Col span={24}>
          <Form.Item
            label={TEXT.NAME}
            name="name"
            rules={[VALIDATION_CONDITION.REQUIRED]}
            required={false}
          >
            <Input placeholder={TEXT.INPUT_PUBLICATION_NAME} maxLength={150} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={<p className="addPublicationLabel">{TEXT.DESCRIPTION}</p>}
            name="description"
            rules={[VALIDATION_CONDITION.REQUIRED]}
            required={false}
          >
            <TextArea
              placeholder={TEXT.INPUT_PUBLICATION_DESCRIPTION}
              showCount
              maxLength={1000}
              rows={8}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <PriceInputs />
        </Col>
        <Col span={6} offset={18}>
          <AddPublicationButton />
        </Col>
      </Row>
    </Form>
  );
};
