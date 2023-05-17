import React from 'react';
import { render } from '@testing-library/react';
import FormField, { FormFieldProps } from './FormField';

describe('FormField', () => {
    const defaultProps: FormFieldProps = {
        children: <input />,
        name: 'testInput',
    } as const;

    it('renders without errors', () => {
        render(
            <FormField {...defaultProps}>
                <input />
            </FormField>,
        );
    });

    it('renders the label correctly', () => {
        const label = 'Test Label';
        const { getByText } = render(
            <FormField {...defaultProps} label={label}>
                <input />
            </FormField>,
        );
        const labelElement = getByText(label);

        expect(labelElement).toBeInTheDocument();
        expect(labelElement.tagName).toBe('LABEL');
    });

    it('renders the required asterisk when "required" prop is true', () => {
        const label = 'Test Label';
        const { getByText } = render(
            <FormField {...defaultProps} label={label} required>
                <input />
            </FormField>,
        );
        const asteriskElement = getByText('*');

        expect(asteriskElement).toBeInTheDocument();
        expect(asteriskElement.tagName).toBe('SPAN');
        expect(asteriskElement).toHaveClass('form-asterisk');
    });

    it('renders the children correctly', () => {
        const label = 'Test Label';
        const { getByLabelText } = render(
            <FormField {...defaultProps}>
                <input aria-label={label} />
            </FormField>,
        );
        const inputElement = getByLabelText(label);

        expect(inputElement).toBeInTheDocument();
        expect(inputElement.tagName).toBe('INPUT');
    });

    it('renders the error message correctly', () => {
        const error = 'Test Error';
        const { getByText } = render(
            <FormField {...defaultProps} error={error}>
                <input />
            </FormField>,
        );
        const errorElement = getByText(error);

        expect(errorElement).toBeInTheDocument();
        expect(errorElement.tagName).toBe('P');
        expect(errorElement).toHaveClass('form-error');
    });

    it('does not render the label when "label" prop is not provided', () => {
        const { queryByTestId } = render(
            <FormField {...defaultProps}>
                <input />
            </FormField>,
        );
        const labelElement = queryByTestId('form-label');

        expect(labelElement).not.toBeInTheDocument();
    });

    it('does not render the required asterisk when "required" prop is false', () => {
        const label = 'Test Label';
        const { queryByText } = render(
            <FormField {...defaultProps} label={label} required={false}>
                <input />
            </FormField>,
        );
        const asteriskElement = queryByText('*');

        expect(asteriskElement).not.toBeInTheDocument();
    });

    it('does not render the error message when "error" prop is null', () => {
        const { queryByText } = render(
            <FormField {...defaultProps} error={null}>
                <input />
            </FormField>,
        );
        const errorElement = queryByText('Test Error');

        expect(errorElement).not.toBeInTheDocument();
    });
});
