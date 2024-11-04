import { PageContainer } from 'components/ui/PageContainer';
import { HOME_PAGE_CONFIG } from './utils/config';
import { AppLayout } from 'layouts/AppLayout';

export const HomePage = () => (
  <PageContainer pageTitle={HOME_PAGE_CONFIG.PAGE_TITLE}>
    <AppLayout>
      <div>Home</div>
    </AppLayout>
  </PageContainer>
);
