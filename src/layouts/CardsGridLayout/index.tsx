import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface CardsGridLayoutProps {
  children: ReactNode;
}

export const CardsGridLayout = ({ children }: CardsGridLayoutProps) => (
  <section className={styles.cardsGridLayout}>{children}</section>
);
