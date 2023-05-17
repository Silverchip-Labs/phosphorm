import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import TextInput, { TextInputProps } from './TextInput';
import Form from '../Form';
import userEvent from '@testing-library/user-event';

const defaultProps = {
    name: 'testInput',
    onChange: () => {},
    value: '',
};
function MyTextInput({ ...props }: Partial<TextInputProps>) {
    const { value: propValue, onChange } = props;
    const [value, setValue] = useState(propValue || '');
    const handleChange = (name: string, newValue: string) => {
        setValue(newValue);
        onChange?.(name, newValue);
    };
    return (
        <Form onSubmit={() => {}}>
            <TextInput name={defaultProps.name} {...props} value={value} onChange={handleChange} />
        </Form>
    );
}
describe('TextInput', () => {
    it('renders without errors', () => {
        render(<MyTextInput />);
    });

    it('renders input element with expected attributes', () => {
        const { getByLabelText } = render(<MyTextInput />);
        const inputElement = getByLabelText('Enter text');

        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('type', 'text');
        expect(inputElement).toHaveAttribute('name', defaultProps.name);
        expect(inputElement).toHaveAttribute('id', defaultProps.name);
        expect(inputElement).toHaveValue('');
    });

    it('invokes onChange callback when input value changes', async () => {
        const onChange = jest.fn();
        const { getByLabelText } = render(<MyTextInput onChange={onChange} />);
        const inputElement = getByLabelText('Enter text');

        await userEvent.type(inputElement, 'New value');

        expect(onChange).toHaveBeenCalledWith('testInput', 'New value');
    });

    it('displays error when validation fails', async () => {
        const { getByLabelText, getByText } = render(<MyTextInput minLength={3} maxLength={5} />);
        const inputElement = getByLabelText('Enter text');

        await userEvent.type(inputElement, 'Hi');
        fireEvent.blur(inputElement);
        expect(getByText('Value must have at least 3 characters.')).toBeInTheDocument();

        await userEvent.clear(inputElement);
        await userEvent.type(inputElement, 'This value is too long');
        fireEvent.blur(inputElement);
        expect(getByText('Value cannot have more than 5 characters.')).toBeInTheDocument();
    });

    it('does not display error when validation passes', async () => {
        const { getByLabelText, queryByText } = render(<MyTextInput minLength={3} />);
        const inputElement = getByLabelText('Enter text');

        await userEvent.type(inputElement, 'Hello');
        fireEvent.blur(inputElement);

        expect(queryByText('Value must have at least 3 characters.')).toBeNull();
    });

    it('renders with disabled attribute when disabled prop is true', () => {
        const { getByLabelText } = render(<MyTextInput disabled={true} />);
        const inputElement = getByLabelText('Enter text');

        expect(inputElement).toBeDisabled();
    });
});
