import { PageContainer } from 'components/ui/PageContainer';
import { HOME_PAGE_CONFIG } from './utils/config';
import { AppLayout } from 'layouts/AppLayout';
import { HeroSection } from 'components/ui/HeroSection';
import { PopularGoods } from 'components/ui/PopularGoods';
import { FeedbackSection } from 'components/logic/FeedbackSection';

export const HomePage = () => (
  <PageContainer pageTitle={HOME_PAGE_CONFIG.PAGE_TITLE}>
    <AppLayout>
      <div>Home</div>
      <HeroSection />
      <PopularGoods />
      <FeedbackSection />
    </AppLayout>
  </PageContainer>
);
