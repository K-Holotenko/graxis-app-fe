import styles from './styles.module.scss';

interface HomeSectionTitleProps {
  title: string;
}

export const HomeSectionTitle = ({ title }: HomeSectionTitleProps) => (
  <h2 className={styles.homeSectionTitle}>{title}</h2>
);
