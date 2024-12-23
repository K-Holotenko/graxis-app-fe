import { Form } from 'antd';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TEXT } from 'src/config/constants';

import { inputs, PriceInputs } from '.';

const onFinish = vi.fn();
const onFinishFailed = vi.fn();

afterEach(() => {
  vi.clearAllMocks();
});

describe('PriceInputs', () => {
  it('should throw error if inputs are empty', async () => {
    const { getByTestId, findByText } = render(
      <Form layout="vertical" onFinishFailed={onFinishFailed}>
        <PriceInputs />
        <button data-testid="submit-btn" />
      </Form>
    );

    getByTestId('submit-btn').click();
    await findByText(TEXT.SET_AT_LEAST_ONE_PRICE);

    await waitFor(() => expect(onFinishFailed).toHaveBeenCalled());
  });

  it("shouldn't throw error if at least one price set", async () => {
    const { getByTestId, getByLabelText } = render(
      <Form layout="vertical" onFinish={onFinish}>
        <PriceInputs />
        <button data-testid="submit-btn" />
      </Form>
    );

    userEvent.type(getByLabelText(inputs[1].label), '250');
    getByTestId('submit-btn').click();

    await waitFor(() => expect(onFinish).toHaveBeenCalled());
  });

  it('should accept only positive numbers', () => {
    const { getByLabelText } = render(
      <Form layout="vertical">
        <PriceInputs />
        <button data-testid="submit-btn" />
      </Form>
    );

    userEvent.type(getByLabelText(inputs[0].label), '-1');
    expect(getByLabelText(inputs[0].label)).toHaveValue(0);
  });

  it('should has min/max values', async () => {
    const { getByTestId, getByLabelText, findByText } = render(
      <Form layout="vertical">
        <PriceInputs />
        <button data-testid="submit-btn" />
      </Form>
    );

    const firstInp = getByLabelText(inputs[0].label);
    const submitBtn = getByTestId('submit-btn');

    userEvent.type(firstInp, '0');
    submitBtn.click();
    await findByText(TEXT.MIN_VALUE(10));

    userEvent.type(firstInp, '999999.1');
    submitBtn.click();
    await findByText(TEXT.MAX_VALUE(999_999));
  });

  it('should strip more than 2 decimals', () => {
    const { getByTestId, getByLabelText } = render(
      <Form layout="vertical">
        <PriceInputs />
        <button data-testid="submit-btn" />
      </Form>
    );

    userEvent.type(getByLabelText(inputs[0].label), '10.9999');
    getByTestId('submit-btn').click();

    expect(getByLabelText(inputs[0].label)).toHaveValue(10.99);
  });

  it('should add ".00" at the end', () => {
    const { getByTestId, getByLabelText } = render(
      <Form layout="vertical">
        <PriceInputs />
        <button data-testid="submit-btn" />
      </Form>
    );

    const firstInp = getByLabelText(inputs[0].label) as HTMLInputElement;

    userEvent.type(firstInp, '10');
    // blur first input
    userEvent.click(getByTestId('submit-btn'));
    expect(firstInp.value).toBe('10.00');
  });
});
