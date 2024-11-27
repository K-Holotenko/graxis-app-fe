import { Col, Row } from 'antd';

import { SocialMediaButton } from '../../../components/ui/SocialMediaButton';
import { ReactComponent as AppleIcon } from '../../../assets/icons/apple-icon.svg';
import { ReactComponent as FacebookIcon } from '../../../assets/icons/facebook-icon.svg';
import { ReactComponent as GoogleIcon } from '../../../assets/icons/google-icon.svg';

import { useAuthStore } from '../../../stores/authStore';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'router/routes';

export const SocialMediaSection = () => {
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithFacebook } = useAuthStore();

  const onAppleClick = () => {};
  const onFacebookClick = () => {
    loginWithFacebook();
  };
  const onGoogleClick = async () => {
    await loginWithGoogle();
    navigate(ROUTES.HOME);
  };

  return (
    <Row justify="space-between" className="mb-34 mt-34" gutter={40}>
      <Col span={8}>
        <SocialMediaButton icon={<GoogleIcon />} onClick={onGoogleClick} />
      </Col>
      <Col span={8}>
        <SocialMediaButton icon={<FacebookIcon />} onClick={onFacebookClick} />
      </Col>
      <Col span={8}>
        <SocialMediaButton icon={<AppleIcon />} onClick={onAppleClick} />
      </Col>
    </Row>
  );
};
