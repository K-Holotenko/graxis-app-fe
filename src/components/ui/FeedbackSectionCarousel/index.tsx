import { Carousel } from 'antd';

import { feedbackMockData } from 'src/components/logic/FeedbackSection/utils/feedbackMockData';
import { FeedbackSectionCard } from 'src/components/ui/FeedbackSectionCard';

export const FeedbackSectionCarousel = () => (
  <Carousel
    dots={false}
    draggable
    infinite={true}
    centerMode
    slidesToShow={2}
    centerPadding="160px"
    responsive={[
      {
        breakpoint: 1200,
        settings: {
          centerPadding: '255px',
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          centerPadding: '145px',
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: '85px',
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          centerMode: false,
          slidesToShow: 1.03,
        },
      },
    ]}
  >
    {feedbackMockData.map((feedback) => (
      <FeedbackSectionCard key={feedback.id} feedback={feedback} />
    ))}
  </Carousel>
);
