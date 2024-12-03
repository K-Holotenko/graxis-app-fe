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
    responsive={[
      {
        breakpoint: 1700,
        settings: {
          centerPadding: '108px',
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          centerPadding: '275px',
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          centerPadding: '205px',
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 950,
        settings: {
          centerPadding: '135px',
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: '105px',
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 570,
        settings: {
          centerMode: false,
          slidesToShow: 1.02,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1.03,
          centerMode: false,
        },
      },
    ]}
  >
    {feedbackMockData.map((feedback) => (
      <FeedbackSectionCard key={feedback.id} feedback={feedback} />
    ))}
  </Carousel>
);
