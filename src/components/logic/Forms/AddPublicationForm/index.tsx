import { Col, Form, Row } from 'antd';

import { TextAreaFormItem } from 'src/components/ui/FormItems/TextAreaFormItem';
import { FORMS, TEXT } from 'src/config/constants';
import { VALIDATION_CONDITION } from 'src/config/validation';
import { CategoriesDropdown } from 'src/components/ui/CategoriesDropdown';

export const AddPublicationForm = () => {
  const onFinish = () => {};
  const onFinishFailed = () => {};

  return (
    <Form
      name={FORMS.ADD_PUBLICATION_FORM}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row gutter={[0, 40]}>
        <Col span={24}>
          <TextAreaFormItem
            name="name"
            label={TEXT.NAME}
            placeholder={TEXT.INPUT_PUBLICATION_NAME}
            maxLength={150}
            showCount
            rules={[VALIDATION_CONDITION.REQUIRED]}
          />
        </Col>
        <Col span={24}>
          <TextAreaFormItem
            name="description"
            label={TEXT.DESCRIPTION}
            placeholder={TEXT.INPUT_PUBLICATION_DESCRIPTION}
            maxLength={1000}
            rows={8}
            showCount
            rules={[VALIDATION_CONDITION.REQUIRED]}
          />
        </Col>
        <Col span={24}>
          <CategoriesDropdown />
        </Col>
      </Row>
    </Form>
  );
};
