// // import { Form } from 'antd';
// // import { VerificationInputFormItem } from '../../../ui/FormItems/VerificationInputFormItem';
// // import { SubmitButtonFormItem } from '../../../ui/FormItems/SubmitButtonFormItem';
// // import { FORMS, TEXT } from '../../../../config/constants';
// // import { VerificationButtonFormItem } from '../../../ui/FormItems/VerificationButtonFormItem';
// // import { VERIFICATION_PAGE_CONSTANTS } from '../../../../pages/VerificationPage/utils/constants';

// // export const VerificationForm = () => {
// //   const onFinish = () => {};
// //   const onFinishFailed = () => {};

// //   return (
// //     <Form
// //       name={FORMS.VERIFICATION_FORM}
// //       layout="vertical"
// //       onFinish={onFinish}
// //       onFinishFailed={onFinishFailed}
// //     >
// //       <VerificationButtonFormItem
// //         //  type="link"
// //         // variant="link"
// //         className="mt-20"
// //         title={VERIFICATION_PAGE_CONSTANTS.FORM.SEND_AGAIN}
// //       />
// //       <VerificationInputFormItem
// //       //   label={TEXT.PHONE}
// //       />

// //       <SubmitButtonFormItem title={TEXT.SUBMIT} className="mt-20" />
// //     </Form>
// //   );
// // };

// import { Form } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import { SubmitButtonFormItem } from '../../../ui/FormItems/SubmitButtonFormItem';
// import { VerificationInputFormItem } from '../../../ui/FormItems/VerificationInputFormItem';
// import { FORMS, TEXT } from '../../../../config/constants';
// import { useState } from 'react';
// import { useAuthStore } from '../../../../stores/authStore';
// import { VerificationButtonFormItem } from '../../../ui/FormItems/VerificationButtonFormItem';
// import { VERIFICATION_PAGE_CONSTANTS } from '../../../../pages/VerificationPage/utils/constants';

// import { ROUTES } from '../../../../router/routes';
// // import { RecaptchaVerifier } from 'firebase/auth';
// // import { firebaseAuth } from '../../../../config/firebase';

// export const VerificationForm = () => {
//   const [code, setCode] = useState('');
//   const navigate = useNavigate();
//   const { loginWithPhoneNumber } = useAuthStore();

//   const onFinish = async () => {
//     try {
//       await loginWithPhoneNumber(sessionStorage.getItem('phone')!, code);
//       navigate(ROUTES.HOME);

//       // setCode(code);
//       console.log(code);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const onFinishFailed = () => {};

//   return (
//     <Form
//       name={FORMS.VERIFICATION_FORM}
//       layout="vertical"
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//     >
//       <VerificationButtonFormItem
//         className="mt-20"
//         title={VERIFICATION_PAGE_CONSTANTS.FORM.SEND_AGAIN}
//       />
//       <VerificationInputFormItem />
//       <SubmitButtonFormItem title={TEXT.SUBMIT} className="mt-20" />
//     </Form>
//   );
// };

// src/components/VerificationForm.tsx
import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { useAuthStore } from '../../../../stores/authStore';
import { FORMS, TEXT } from '../../../../config/constants';
import { VerificationButtonFormItem } from '../../../ui/FormItems/VerificationButtonFormItem';
import { VERIFICATION_PAGE_CONSTANTS } from '../../../../pages/VerificationPage/utils/constants';
import { SubmitButtonFormItem } from '../../../ui/FormItems/SubmitButtonFormItem';
// import { ROUTES } from '../../../../router/routes';
// import { useNavigate } from 'react-router-dom';

export const VerificationForm = () => {
  const [code, setCode] = useState('');
  const { verifyCode, error, user } = useAuthStore();
  // const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await verifyCode(code);
      console.log('Юзера веріфіковано:', user);
    } catch (err) {
      console.error('Помилка підтвердження коду:', err);
    }
  };

  return (
    <Form
      onFinish={handleSubmit}
      name={FORMS.VERIFICATION_FORM}
      layout="vertical"
    >
      <VerificationButtonFormItem
        className="mt-20"
        title={VERIFICATION_PAGE_CONSTANTS.FORM.SEND_AGAIN}
        onSubmit={handleSubmit}
        code={code}
      />
      <Form.Item>
        {/* <Input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        /> */}
        <Input.OTP
          inputMode="numeric"
          formatter={(str) => str.replace(/\D/g, '')}
          onChange={setCode}
        />
      </Form.Item>
      <Form.Item>
        <SubmitButtonFormItem title={TEXT.SUBMIT} className="mt-20" />
      </Form.Item>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Form>
  );
};
