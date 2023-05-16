import '@testing-library/jest-dom/extend-expect';
import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import Checkbox, { CheckboxProps } from './Checkbox';
import Form from '../Form';

const defaultProps: CheckboxProps = {
    name: 'testCheckbox',
    value: false,
    onChange: jest.fn(),
};
const requiredErrorText = 'This is a required field.';

function MyCheckbox({ ...props }: Partial<CheckboxProps>) {
    const { value: propValue, onChange } = props;
    const [value, setValue] = useState(propValue || false);
    const handleChange = (name: string, newValue: boolean) => {
        setValue(newValue);
        onChange?.(name, newValue);
    };
    return (
        <Form onSubmit={() => {}}>
            <Checkbox name={defaultProps.name} {...props} value={value} onChange={handleChange} />
        </Form>
    );
}
describe('Checkbox', () => {
    it('renders without errors', () => {
        render(<MyCheckbox {...defaultProps} />);
    });

    it('renders checkbox input element with expected attributes', () => {
        const { getByTestId } = render(<MyCheckbox {...defaultProps} />);
        const checkboxElement = getByTestId('checkbox');

        expect(checkboxElement).toBeInTheDocument();
        expect(checkboxElement).toHaveAttribute('type', 'checkbox');
        expect(checkboxElement).toHaveAttribute('name', 'testCheckbox');
        expect(checkboxElement).toHaveAttribute('id', 'testCheckbox');
        expect(checkboxElement).not.toBeChecked();
        expect(checkboxElement).not.toBeDisabled();
    });

    it('invokes onChange callback when checkbox is clicked', () => {
        const onChange = jest.fn();
        const { getByTestId } = render(<MyCheckbox {...defaultProps} onChange={onChange} />);
        const checkboxElement = getByTestId('checkbox');

        fireEvent.click(checkboxElement);

        expect(onChange).toHaveBeenCalledWith('testCheckbox', true);
    });

    it('displays label text when provided', () => {
        const labelText = 'My Checkbox';
        const { getByLabelText } = render(<MyCheckbox {...defaultProps} label={labelText} />);
        const labelElement = getByLabelText(labelText);

        expect(labelElement).toBeInTheDocument();
    });

    it('displays placeholder text when label is not provided', () => {
        const placeholderText = 'Select me';
        const { getByText } = render(
            <MyCheckbox {...defaultProps} placeholder={placeholderText} />,
        );
        const placeholderElement = getByText(placeholderText);

        expect(placeholderElement).toBeInTheDocument();
    });

    it('displays custom label when label is a React node', () => {
        const customLabel = <strong>Custom Label</strong>;
        const { getByText } = render(<MyCheckbox {...defaultProps} label={customLabel} />);
        const customLabelElement = getByText('Custom Label');

        expect(customLabelElement).toBeInTheDocument();
    });

    it('renders with checked attribute when value prop is true', () => {
        const { getByTestId } = render(<MyCheckbox {...defaultProps} value={true} />);
        const checkboxElement = getByTestId('checkbox');

        expect(checkboxElement).toBeChecked();
    });

    it('renders with disabled attribute when disabled prop is true', () => {
        const { getByTestId } = render(<MyCheckbox {...defaultProps} disabled={true} />);
        const checkboxElement = getByTestId('checkbox');

        expect(checkboxElement).toBeDisabled();
    });

    it('renders with required attribute when required prop is true', () => {
        const { getByTestId } = render(<MyCheckbox {...defaultProps} required={true} />);
        const checkboxElement = getByTestId('checkbox');

        expect(checkboxElement).toHaveAttribute('aria-required', 'true');
    });

    it('displays error when validation fails', async () => {
        const { getByText, getByTestId } = render(<MyCheckbox {...defaultProps} required={true} />);
        const checkboxElement = getByTestId('checkbox');

        fireEvent.blur(checkboxElement);
        const errorElement = getByText(requiredErrorText);

        expect(errorElement).toBeInTheDocument();
    });

    it('does not display error when validation passes', () => {
        const { queryByText } = render(<MyCheckbox {...defaultProps} required={false} />);
        const errorElement = queryByText(requiredErrorText);
        expect(errorElement).toBeNull();
    });
});
