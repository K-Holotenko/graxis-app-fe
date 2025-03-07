import { render } from '@testing-library/react';

import { FeedbackSectionCard } from '.';

const mockedFeedbackSingleTest = {
  id: '1',
  title: 'Book',
  image: '',
  authorName: 'John',
  authorSurname: 'Doe',
  review: 'Super!',
  rating: 3,
  createdAt: '2024-11-01T12:00:00Z',
};

describe('FeedbackSectionCard', () => {
  it('should render the feedback card correctly', () => {
    const { getByTestId } = render(
      <FeedbackSectionCard feedback={mockedFeedbackSingleTest} />
    );
    const feedbackCard = getByTestId('feedback-card');

    expect(feedbackCard).toBeInTheDocument();
  });

  it('should render rate stars correctly', () => {
    const { getByTestId } = render(
      <FeedbackSectionCard feedback={mockedFeedbackSingleTest} />
    );
    const rate = getByTestId('feedback-rate');

    expect(rate).toBeInTheDocument();
    const stars = document.querySelectorAll('.ant-rate-star-full');

    expect(stars).toHaveLength(mockedFeedbackSingleTest.rating);
  });

  it('should render date correctly', () => {
    const { getByTestId } = render(
      <FeedbackSectionCard feedback={mockedFeedbackSingleTest} />
    );
    const fullDate = getByTestId('feedback-date');

    expect(fullDate).toHaveTextContent(
      new Date(mockedFeedbackSingleTest.createdAt).toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
      }) +
        ',' +
        new Date(mockedFeedbackSingleTest.createdAt).toLocaleDateString(
          'uk-UA',
          {
            year: 'numeric',
          }
        )
    );
  });

  it('should render name of the good correctly', () => {
    const { getByText } = render(
      <FeedbackSectionCard feedback={mockedFeedbackSingleTest} />
    );
    const goodName = getByText(mockedFeedbackSingleTest.title);

    expect(goodName).toBeInTheDocument();
  });

  it('should render review correctly', () => {
    const { getByText } = render(
      <FeedbackSectionCard feedback={mockedFeedbackSingleTest} />
    );
    const review = getByText(mockedFeedbackSingleTest.review);

    expect(review).toBeInTheDocument();
  });

  it('should render avatar correctly', () => {
    const { getByTestId } = render(
      <FeedbackSectionCard feedback={mockedFeedbackSingleTest} />
    );
    const image = getByTestId('feedback-avatar');

    expect(image).toBeInTheDocument();
  });

  it('should render author name and surname correctly', () => {
    const { getByText } = render(
      <FeedbackSectionCard feedback={mockedFeedbackSingleTest} />
    );
    const nameSurname = getByText(
      `${mockedFeedbackSingleTest.authorName} ${mockedFeedbackSingleTest.authorSurname}`
    );

    expect(nameSurname).toBeInTheDocument();
  });
});
