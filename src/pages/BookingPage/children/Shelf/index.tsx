import { Link } from 'react-router-dom';

import ChevronRight from 'src/assets/icons/chevron-right.svg?react';

import styles from './styles.module.scss';

interface ShelfProps {
  children: React.ReactNode;
  to?: string;
}

export const Shelf = ({ children, to }: ShelfProps) => (
  <Link className={styles.shelf} to={to || ''}>
    {children}
    {to && <ChevronRight />}
  </Link>
);
