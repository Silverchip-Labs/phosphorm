import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Form, { FormProps, FormContext } from './Form';
import { APIError } from '../../types/FieldErrors';
import { TextInput } from '../index';

const apiError: APIError = {
    message: 'An error occurred',
    response: {
        status: 400,
        data: {
            errors: {
                field1: 'Field 1 is required',
                field2: 'Field 2 is invalid',
            },
        },
    },
};

describe('Form', () => {
    const defaultProps: FormProps = {
        onSubmit: jest.fn(),
    };

    it('renders without errors', () => {
        render(<Form {...defaultProps} />);
    });

    it('invokes onSubmit callback when form is submitted', () => {
        const onSubmit = jest.fn();
        const { getByTestId } = render(<Form {...defaultProps} onSubmit={onSubmit} />);
        const formElement = getByTestId('form');

        fireEvent.submit(formElement);

        expect(onSubmit).toHaveBeenCalled();
    });

    it('displays form error when error prop is provided', () => {
        const errorText = 'An error occurred';
        const { getByText } = render(<Form {...defaultProps} error={errorText} />);
        const errorElement = getByText(errorText);

        expect(errorElement).toBeInTheDocument();
    });

    it('displays generic error when error prop is provided', () => {
        const formErrorText = 'Form error';
        const { getByText } = render(<Form {...defaultProps} error={formErrorText} />);
        const formErrorElement = getByText(formErrorText);

        expect(formErrorElement).toBeInTheDocument();
    });

    it('displays cancel button when onCancel prop is provided', () => {
        const onCancel = jest.fn();
        const { getByText } = render(<Form {...defaultProps} onCancel={onCancel} />);
        const cancelButton = getByText('Cancel');

        expect(cancelButton).toBeInTheDocument();
    });

    it('invokes onCancel callback when cancel button is clicked', () => {
        const onCancel = jest.fn();
        const { getByText } = render(<Form {...defaultProps} onCancel={onCancel} />);
        const cancelButton = getByText('Cancel');

        fireEvent.click(cancelButton);

        expect(onCancel).toHaveBeenCalled();
    });

    it('disables submit button when submitDisabled prop is true', () => {
        const { getByText } = render(<Form {...defaultProps} submitDisabled={true} />);
        const submitButton = getByText('Submit').parentElement;
        expect(submitButton).toBeDisabled();
    });

    it('displays success state when postSuccess prop is true', () => {
        const { getByTestId, rerender } = render(<Form {...defaultProps} postSuccess={false} />);
        rerender(<Form {...defaultProps} postSuccess={true} />);
        const successIcon = getByTestId('success');

        expect(successIcon).toBeInTheDocument();
    });

    it('displays API errors when apiError prop is provided', () => {
        const { getByText } = render(
            <Form {...defaultProps} apiError={apiError}>
                <TextInput name={'field1'} value={'balloon'} onChange={() => {}} />
                <TextInput name={'field2'} value={'balloons'} onChange={() => {}} />
            </Form>,
        );
        const submitButton = getByText('Submit');
        fireEvent.click(submitButton);
        const field1Error = getByText('Field 1 is required');
        const field2Error = getByText('Field 2 is invalid');

        expect(field1Error).toBeInTheDocument();
        expect(field2Error).toBeInTheDocument();
    });

    it('removes api error when removeApiError is called', () => {
        const TestComponent = () => {
            const { removeApiError } = React.useContext(FormContext);
            const handleClick = () => {
                removeApiError('field1');
            };
            return (
                <div>
                    <TextInput name={'field1'} value={''} onChange={() => {}} />
                    <button onClick={handleClick}>Remove Error</button>
                </div>
            );
        };

        const { getByRole, queryByText } = render(
            <Form {...defaultProps} apiError={apiError}>
                <TestComponent />
            </Form>,
        );

        const removeButton = getByRole('button', { name: 'Remove Error' });

        expect(queryByText('Field 1 is required')).toBeInTheDocument();

        fireEvent.click(removeButton);

        expect(queryByText('Field 1 is required')).toBeNull();
    });
});
