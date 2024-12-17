import { AddPublicationForm } from 'src/components/logic/Forms/AddPublicationForm';

import styles from './styles.module.scss';
import { TEXT } from 'src/config/constants';

export const AddPublication = () => (
  <section className={styles.section}>
    <h1 className={styles.header}>{TEXT.ADD_ANNOUNCEMENT}</h1>
    <AddPublicationForm />
  </section>
);
