import { Link } from 'react-router-dom';

import ChevronRight from 'src/assets/icons/chevron-right.svg?react';

import styles from './styles.module.scss';

interface ShelfProps {
  children: React.ReactNode;
  to?: string;
  target?: string;
}

export const Shelf = ({ children, to, target }: ShelfProps) => (
  <Link className={styles.shelf} to={to || ''} target={target || ''}>
    {children}
    {to && <ChevronRight />}
  </Link>
);
