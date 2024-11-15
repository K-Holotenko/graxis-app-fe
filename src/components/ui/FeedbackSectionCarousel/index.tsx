import { Carousel } from 'antd';
import { FeedbackSectionCard } from '../FeedbackSectionCard';
import feedbackMockData from '../../logic/FeedbackSection/utils/feedbackMockData.json';

export const FeedbackSectionCarousel = () => (
  <Carousel
    dots={false}
    draggable
    infinite={true}
    centerMode
    slidesToShow={2}
    centerPadding="350px"
    responsive={[
      {
        breakpoint: 1700,
        settings: {
          centerMode: true,
          centerPadding: '140px',
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          centerMode: true,
          centerPadding: '180px',
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          centerMode: true,
          centerPadding: '110px',
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: false,
          slidesToShow: 1.02,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1.01,
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
