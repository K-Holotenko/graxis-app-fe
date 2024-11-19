import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from 'router/routes';
import { Image } from 'antd';
import EditSrc from 'assets/icons/edit-icon.svg';
import './styles.scss';

export const VerificationNumberLink = () => {
  const location = useLocation();
  const phone = sessionStorage.getItem('phone');

  const params = new URLSearchParams(location.search);
  const fromPage = params.get('from') || ROUTES.LOGIN;

  return (
    <Link to={fromPage} className="phone-link">
      {phone}
      <Image src={EditSrc} alt="Edit" preview={false} />
    </Link>
  );
};
