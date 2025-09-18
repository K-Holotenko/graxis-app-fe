import { PageContainer } from 'src/layouts/PageContainer';
import { SingleColumnLayout } from 'src/layouts/SingleColumnLayout';
import { AppLayout } from 'src/layouts/AppLayout';
import { Heading } from 'src/components/Heading';

import { MyTabs } from './children/Tabs';

export const MyPublicationsPage = () => (
  <PageContainer pageTitle="Мої оголошення">
    <AppLayout>
      <SingleColumnLayout title={<Heading level={2}>Мої оголошення</Heading>}>
        <MyTabs />
      </SingleColumnLayout>
    </AppLayout>
  </PageContainer>
);
