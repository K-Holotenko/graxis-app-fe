import { fireEvent, render } from '@testing-library/react';
import { Form } from 'antd';

import { PhoneInputFormItem } from './index';

const label = 'Phone Number';

describe('PhoneInputFormItem', () => {
  it('should allow entry of digits', () => {
    const { getByLabelText } = render(
      <Form>
        <PhoneInputFormItem label={label} className="" />
      </Form>
    );
    const inputEl = getByLabelText(label) as HTMLInputElement;

    fireEvent.change(inputEl, { target: { value: '12345' } });
    expect(inputEl.value).toBe('12345');
  });

  it("shouldn't allow entry of not digits", () => {
    const { getByLabelText } = render(
      <Form>
        <PhoneInputFormItem label={label} className="" />
      </Form>
    );
    const inputEl = getByLabelText(label) as HTMLInputElement;

    fireEvent.change(inputEl, { target: { value: '¡Qué fantástico día!' } });
    expect(inputEl.value).toBe('');

    fireEvent.change(inputEl, { target: { value: 'Life ~ i1s ~ beautiful' } });
    expect(inputEl.value).toBe('1');
  });

  it('should allow a max of 9 characters', () => {
    const { getByLabelText } = render(
      <Form>
        <PhoneInputFormItem label={label} className="" />
      </Form>
    );
    const inputEl = getByLabelText(label) as HTMLInputElement;

    expect(inputEl.maxLength).toBe(9);
  });
});
