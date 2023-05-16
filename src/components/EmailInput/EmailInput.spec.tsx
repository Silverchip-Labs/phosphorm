import '@testing-library/jest-dom/extend-expect';
import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import EmailInput, { EmailInputProps } from './EmailInput';
import Form from '../Form';
import userEvent from '@testing-library/user-event';

const defaultProps = {
    name: 'testInput',
    onChange: () => {},
    value: '',
};
const defaultLabel = 'Enter an email address';

function MyEmailInput({ ...props }: Partial<EmailInputProps>) {
    const { value: propValue, onChange } = props;
    const [value, setValue] = useState(propValue || '');
    const handleChange = (name: string, newValue: string) => {
        setValue(newValue);
        onChange?.(name, newValue);
    };
    return (
        <Form onSubmit={() => {}}>
            <EmailInput name={defaultProps.name} {...props} value={value} onChange={handleChange} />
        </Form>
    );
}

describe('EmailInput', () => {
    it('renders without errors', () => {
        render(<MyEmailInput />);
    });

    it('renders input element with expected attributes', () => {
        const { getByLabelText } = render(<MyEmailInput />);
        const inputElement = getByLabelText(defaultLabel);

        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('type', 'email');
        expect(inputElement).toHaveAttribute('name', defaultProps.name);
        expect(inputElement).toHaveAttribute('id', defaultProps.name);
        expect(inputElement).toHaveValue('');
    });

    it('invokes onChange callback when input value changes', async () => {
        const onChange = jest.fn();
        const { getByLabelText } = render(<MyEmailInput onChange={onChange} />);
        const inputElement = getByLabelText(defaultLabel);

        await userEvent.type(inputElement, 'test@example.com');

        expect(onChange).toHaveBeenCalledWith('testInput', 'test@example.com');
    });

    it('displays error when validation fails', async () => {
        const { getByLabelText, getByText } = render(<MyEmailInput />);
        const inputElement = getByLabelText(defaultLabel);

        await userEvent.type(inputElement, 'invalid email');
        fireEvent.blur(inputElement);
        expect(getByText('Please provide a valid email.')).toBeInTheDocument();
    });

    it('does not display error when validation passes', async () => {
        const { getByLabelText, queryByText } = render(<MyEmailInput />);
        const inputElement = getByLabelText(defaultLabel);

        await userEvent.type(inputElement, 'test@example.com');
        fireEvent.blur(inputElement);

        expect(queryByText('Please enter a valid email address.')).toBeNull();
    });
    it('displays an error when custom validation fails', async () => {
        const { getByLabelText, getByText } = render(
            <MyEmailInput customValidate={() => 'Custom error'} />,
        );
        const inputElement = getByLabelText(defaultLabel);

        await userEvent.type(inputElement, 'abc');
        fireEvent.blur(inputElement);
        const errorElement = getByText('Custom error');
        expect(errorElement).toBeInTheDocument();
    });

    it('renders with disabled attribute when disabled prop is true', () => {
        const { getByLabelText } = render(<MyEmailInput disabled={true} />);
        const inputElement = getByLabelText(defaultLabel);

        expect(inputElement).toBeDisabled();
    });
});
