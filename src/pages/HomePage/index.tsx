import { FeedbackSection } from 'src/components/logic/FeedbackSection';
import { HeroSection } from 'src/components/ui/HeroSection';
import { PageContainer } from 'src/components/ui/PageContainer';
import { PopularGoods } from 'src/components/ui/PopularGoods';
import { AppLayout } from 'src/layouts/AppLayout';
import { HOME_PAGE_CONFIG } from 'src/pages/HomePage/utils/config';

export const HomePage = () => (
  <PageContainer pageTitle={HOME_PAGE_CONFIG.PAGE_TITLE}>
    <AppLayout>
      <HeroSection />
      <PopularGoods />
      <FeedbackSection />
    </AppLayout>
  </PageContainer>
);
