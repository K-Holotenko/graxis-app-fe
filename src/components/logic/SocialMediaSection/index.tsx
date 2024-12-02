import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as AppleIcon } from 'src/assets/icons/apple-icon.svg';
import { ReactComponent as FacebookIcon } from 'src/assets/icons/facebook-icon.svg';
import { ReactComponent as GoogleIcon } from 'src/assets/icons/google-icon.svg';
import { SocialMediaButton } from 'src/components/ui/SocialMediaButton';
import { ROUTES } from 'src/router/routes';
import { useAuthStore } from 'src/stores/authStore';

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
