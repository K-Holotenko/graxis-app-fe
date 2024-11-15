import { PageContainer } from 'components/ui/PageContainer';
import { HOME_PAGE_CONFIG } from './utils/config';
import { AppLayout } from 'layouts/AppLayout';
import { FeedbackSection } from 'components/logic/FeedbackSection';

export const HomePage = () => (
  <PageContainer pageTitle={HOME_PAGE_CONFIG.PAGE_TITLE}>
    <AppLayout>
      <div>Home</div>
      <FeedbackSection />
    </AppLayout>
  </PageContainer>
);
