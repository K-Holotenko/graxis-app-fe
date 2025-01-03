import logoSrc from 'src/assets/icons/logo.svg';
import { IMAGE_DESCRIPTION } from 'src/config/constants';

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => (
  <img
    src={logoSrc}
    alt={IMAGE_DESCRIPTION.LOGO}
    className={`logo ${className}`}
  />
);
