import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Radio, { RadioProps } from './Radio';

const options = [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' },
    { value: 3, label: 'Option 3' },
];

const defaultProps: RadioProps = {
    name: 'testRadio',
    value: null,
    options: options,
    onChange: jest.fn(),
};

describe('Radio', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without errors', () => {
        render(<Radio {...defaultProps} />);
    });

    it('renders the correct number of options', () => {
        const { getAllByRole } = render(<Radio {...defaultProps} />);
        const radioOptions = getAllByRole('radio');

        expect(radioOptions.length).toBe(options.length);
    });

    it('invokes onChange callback when an option is selected', () => {
        const { getByLabelText } = render(<Radio {...defaultProps} />);
        const option = options[0];
        const radioOption = getByLabelText(option.label);

        fireEvent.click(radioOption);

        expect(defaultProps.onChange).toHaveBeenCalledWith(defaultProps.name, option.value);
    });

    // it('displays error when validation fails', () => {
    //     const error = 'This is a validation error';
    //     const { getByText } = render(<Radio {...defaultProps} error={error} />);
    //     const errorElement = getByText(error);
    //
    //     expect(errorElement).toBeInTheDocument();
    // });

    it('does not display error when validation passes', () => {
        const { queryByText } = render(<Radio {...defaultProps} />);
        const errorElement = queryByText('This is a validation error');

        expect(errorElement).toBeNull();
    });

    it('renders with disabled attribute when disabled prop is true', () => {
        const { getByLabelText } = render(<Radio {...defaultProps} disabled={true} />);
        const radioOption = getByLabelText(options[0].label);

        expect(radioOption).toBeDisabled();
    });

    it('no options are selected when value prop is null', () => {
        const { getByLabelText } = render(<Radio {...defaultProps} value={null} />);
        const optionElements = options.map(option => getByLabelText(option.label));
        optionElements.forEach(option => expect(option).not.toBeChecked());
    });

    it('renders the correct option as selected when value prop is provided', () => {
        const selectedValue = 2;
        const { getByLabelText } = render(<Radio {...defaultProps} value={selectedValue} />);
        const radioOption = getByLabelText(
            options.find(option => option.value === selectedValue)!.label,
        );

        expect(radioOption).toBeChecked();
    });
});
