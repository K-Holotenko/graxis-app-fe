import { PageContainer } from 'src/layouts/PageContainer';
import { MyPublicationsLayout } from 'src/layouts/MyPublicationsLayout';
import { AppLayout } from 'src/layouts/AppLayout';
import { Heading } from 'src/components/Heading';

import { MY_PUBLICATIONS_CONFIG } from './utils/config';

export const MyPublicationsPage = () => (
  <PageContainer pageTitle={MY_PUBLICATIONS_CONFIG.PAGE_TITLE}>
    <AppLayout>
      <MyPublicationsLayout
        title={<Heading level={2}>Мої оголошення</Heading>}
        tabs={undefined}
      />
    </AppLayout>
  </PageContainer>
);
