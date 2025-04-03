import { PageContainer } from 'src/layouts/PageContainer';
import { MyPublicationsLayout } from 'src/layouts/MyPublicationsLayout';
import { AppLayout } from 'src/layouts/AppLayout';
import { Heading } from 'src/components/Heading';

export const MyPublicationsPage = () => (
  <PageContainer pageTitle="My Publications">
    <AppLayout>
      <MyPublicationsLayout
        title={<Heading level={2}>Мої оголошення</Heading>}
        tabs={undefined}
      />
    </AppLayout>
  </PageContainer>
);
