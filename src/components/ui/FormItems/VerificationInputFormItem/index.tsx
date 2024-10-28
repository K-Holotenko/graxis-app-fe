import { Form, Input } from 'antd';
// import type { GetProps } from 'antd';

// type OTPProps = GetProps<typeof Input.OTP>;

export const VerificationInputFormItem = () => (
  <Form.Item
  // label="Success"
  //  hasFeedback
  //   validateStatus="success"
  >
    <Input.OTP
      inputMode="numeric"
      formatter={(str) => str.replace(/\D/g, '')}
    />
  </Form.Item>
);

/* <Form.Item label="Success" hasFeedback validateStatus="success">
  <Input.OTP />
</Form.Item>; */

// import { Form, Input } from 'antd';
// import { VALIDATION_MESSAGE } from '../../../../config/validation';

// interface FieldType {
//   email: string;
// }

// interface EmailInputFormItemProps {
//   label: string;
// }

// export const EmailInputFormItem = ({
//   label = 'Email',
// }: EmailInputFormItemProps) => (
//   <Form.Item<FieldType>
//     label={label}
//     name="email"
//     rules={[{ required: true, message: VALIDATION_MESSAGE.REQUIRED }]}
//   >
//     <Input />
//   </Form.Item>
// );
