// import { Form } from 'antd';
// import { VerificationInputFormItem } from '../../../ui/FormItems/VerificationInputFormItem';
// import { SubmitButtonFormItem } from '../../../ui/FormItems/SubmitButtonFormItem';
// import { FORMS, TEXT } from '../../../../config/constants';
// import { VerificationButtonFormItem } from '../../../ui/FormItems/VerificationButtonFormItem';
// import { VERIFICATION_PAGE_CONSTANTS } from '../../../../pages/VerificationPage/utils/constants';

// export const VerificationForm = () => {
//   const onFinish = () => {};
//   const onFinishFailed = () => {};

//   return (
//     <Form
//       name={FORMS.VERIFICATION_FORM}
//       layout="vertical"
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//     >
//       <VerificationButtonFormItem
//         //  type="link"
//         // variant="link"
//         className="mt-20"
//         title={VERIFICATION_PAGE_CONSTANTS.FORM.SEND_AGAIN}
//       />
//       <VerificationInputFormItem
//       //   label={TEXT.PHONE}
//       />

//       <SubmitButtonFormItem title={TEXT.SUBMIT} className="mt-20" />
//     </Form>
//   );
// };

import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SubmitButtonFormItem } from '../../../ui/FormItems/SubmitButtonFormItem';
import { VerificationInputFormItem } from '../../../ui/FormItems/VerificationInputFormItem';
import { FORMS, TEXT } from '../../../../config/constants';
import { useState } from 'react';
import { useAuthStore } from '../../../../stores/authStore';
import { VerificationButtonFormItem } from '../../../ui/FormItems/VerificationButtonFormItem';
import { VERIFICATION_PAGE_CONSTANTS } from '../../../../pages/VerificationPage/utils/constants';

import { ROUTES } from '../../../../router/routes';

export const VerificationForm = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const { loginWithPhoneNumber } = useAuthStore();

  const onFinish = async () => {
    try {
      await loginWithPhoneNumber(sessionStorage.getItem('phone')!, code);
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error(error);
    }
  };
  const onFinishFailed = () => {};

  return (
    <Form
      name={FORMS.VERIFICATION_FORM}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <VerificationButtonFormItem
        className="mt-20"
        title={VERIFICATION_PAGE_CONSTANTS.FORM.SEND_AGAIN}
      />
      <VerificationInputFormItem />
      <SubmitButtonFormItem title={TEXT.SUBMIT} className="mt-20" />
    </Form>
  );
};
