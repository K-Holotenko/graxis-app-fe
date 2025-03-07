import { AddPublicationForm } from 'src/pages/AddPublicationPage/children/AddPublicationForm';
import { TEXT } from 'src/config/constants';

import styles from './styles.module.scss';

export const AddPublication = () => (
  <section className={styles.section}>
    <h1 className={styles.header}>{TEXT.ADD_ANNOUNCEMENT}</h1>
    <AddPublicationForm />
  </section>
);
