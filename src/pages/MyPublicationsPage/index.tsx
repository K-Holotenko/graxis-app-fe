import { PageContainer } from 'src/layouts/PageContainer';
import { MyPublicationsLayout } from 'src/layouts/MyPublicationsLayout';
import { AppLayout } from 'src/layouts/AppLayout';
import { Heading } from 'src/components/Heading';

import { MyTabs } from './children/Tabs';

export const MyPublicationsPage = () => (
  <PageContainer pageTitle="Мої оголошення">
    <AppLayout>
      <MyPublicationsLayout
        title={<Heading level={2}>Мої оголошення</Heading>}
        tabs={<MyTabs />}
      />
    </AppLayout>
  </PageContainer>
);
