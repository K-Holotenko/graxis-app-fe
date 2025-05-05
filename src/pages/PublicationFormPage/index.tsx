import { useLocation } from 'react-router-dom';

import { PageContainer } from 'src/layouts/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';

import styles from './styles.module.scss';
import { PublicationForm } from './children/PublicationForm';

export const PublicationFormPage = () => {
  const location = useLocation();
  const isEdit = location.pathname.includes('edit-publication');

  return (
    <PageContainer pageTitle="Нова публікація">
      <AppLayout>
        <section className={styles.section}>
          <h1 className={styles.header}>
            {isEdit ? 'Редагувати оголошення' : 'Додайте оголошення'}
          </h1>
          <PublicationForm />
        </section>
      </AppLayout>
    </PageContainer>
  );
};
