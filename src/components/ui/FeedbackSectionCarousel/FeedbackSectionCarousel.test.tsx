import { render } from '@testing-library/react';
import { FeedbackSectionCarousel } from '.';

describe('FeedbackSectionCarousel', () => {
  it('should render carousel correctly', () => {
    const { container } = render(<FeedbackSectionCarousel />);
    const carousel = container.querySelector('.ant-carousel ');

    expect(carousel).toBeInTheDocument();
  });

  it('should render amount of feedback cards correctly', () => {
    const { getAllByTestId } = render(<FeedbackSectionCarousel />);
    const feedbackCards = getAllByTestId('feedback-card');

    expect(feedbackCards).toHaveLength(13);
  });
});
