import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import PhosphormProvider, { PhosphormContext, PhosphormProviderProps } from './PhosphormProvider';
import { Form } from './index';
import { APIError } from '../types/FieldErrors';

describe('PhosphormProvider', () => {
    const defaultProps: PhosphormProviderProps = {
        onUnauthorized: jest.fn(),
        onBadRequest: jest.fn(),
        onServerError: jest.fn(),
        onForbidden: jest.fn(),
        onNotFound: jest.fn(),
    };

    it('renders without errors', () => {
        render(
            <PhosphormProvider {...defaultProps}>
                <div>Child component</div>
            </PhosphormProvider>,
        );
    });

    it('provides the correct context values', () => {
        const ConsumerComponent = () => {
            const context = React.useContext(PhosphormContext);
            return (
                <div>
                    <span>{context.onUnauthorized ? 'unauthorized' : ''}</span>
                    <span>{context.onBadRequest ? 'bad request' : ''}</span>
                    <span>{context.onServerError ? 'server error' : ''}</span>
                    <span>{context.onForbidden ? 'forbidden' : ''}</span>
                    <span>{context.onNotFound ? 'not found' : ''}</span>
                </div>
            );
        };

        const { getByText } = render(
            <PhosphormProvider {...defaultProps}>
                <ConsumerComponent />
            </PhosphormProvider>,
        );

        expect(getByText('unauthorized')).toBeInTheDocument();
        expect(getByText('bad request')).toBeInTheDocument();
        expect(getByText('server error')).toBeInTheDocument();
        expect(getByText('forbidden')).toBeInTheDocument();
        expect(getByText('not found')).toBeInTheDocument();
    });
});

describe('PhosphormProvider/Form context integration', () => {
    const mockSubmit = jest.fn();
    const mockCancel = jest.fn();
    const mockSuccess = jest.fn();
    const mockUnauthorized = jest.fn();
    const mockBadRequest = jest.fn();
    const mockServerError = jest.fn();
    const mockForbidden = jest.fn();
    const mockNotFound = jest.fn();

    it('calls the appropriate callbacks when form is submitted and canceled', () => {
        const { getByText } = render(
            <PhosphormProvider onUnauthorized={mockUnauthorized} onBadRequest={mockBadRequest}>
                <Form onSubmit={mockSubmit} onCancel={mockCancel} onSuccess={mockSuccess}>
                    <input type="text" name="test-input" />
                </Form>
            </PhosphormProvider>,
        );

        const submitButton = getByText('Submit');
        const cancelButton = getByText('Cancel');

        // Simulate form submission
        fireEvent.click(submitButton);
        expect(mockSubmit).toHaveBeenCalled();

        // Simulate form cancelation
        fireEvent.click(cancelButton);
        expect(mockCancel).toHaveBeenCalled();
    });

    it('calls the onUnauthorized callback when there is an API error with status 401', () => {
        const mockApiError: APIError = {
            response: {
                status: 401,
                data: 'Unauthorized',
            },
            message: 'Unauthorized',
        };

        render(
            <PhosphormProvider onUnauthorized={mockUnauthorized} onBadRequest={mockBadRequest}>
                <Form onSubmit={mockSubmit} onSuccess={mockSuccess} apiError={mockApiError}>
                    <input type="text" name="test-input" />
                </Form>
            </PhosphormProvider>,
        );

        expect(mockUnauthorized).toHaveBeenCalled();
    });

    it('calls the onBadRequest callback when there is an API error with status 400', () => {
        const mockApiError: APIError = {
            response: {
                status: 400,
                data: 'Bad Request',
            },
            message: 'Bad Request',
        };

        render(
            <PhosphormProvider onUnauthorized={mockUnauthorized} onBadRequest={mockBadRequest}>
                <Form onSubmit={mockSubmit} onSuccess={mockSuccess} apiError={mockApiError}>
                    <input type="text" name="test-input" />
                </Form>
            </PhosphormProvider>,
        );

        expect(mockBadRequest).toHaveBeenCalled();
    });
    it('calls the onServerError callback when there is an API error with status 500', () => {
        const mockApiError: APIError = {
            response: {
                status: 500,
                data: 'Server Error',
            },
            message: 'Server Error',
        };

        render(
            <PhosphormProvider onUnauthorized={mockUnauthorized} onServerError={mockServerError}>
                <Form onSubmit={mockSubmit} onSuccess={mockSuccess} apiError={mockApiError}>
                    <input type="text" name="test-input" />
                </Form>
            </PhosphormProvider>,
        );

        expect(mockServerError).toHaveBeenCalled();
    });
    it('calls the onForbidden callback when there is an API error with status 403', () => {
        const mockApiError: APIError = {
            response: {
                status: 403,
                data: 'Forbidden',
            },
            message: 'Forbidden',
        };

        render(
            <PhosphormProvider onUnauthorized={mockUnauthorized} onForbidden={mockForbidden}>
                <Form onSubmit={mockSubmit} onSuccess={mockSuccess} apiError={mockApiError}>
                    <input type="text" name="test-input" />
                </Form>
            </PhosphormProvider>,
        );

        expect(mockForbidden).toHaveBeenCalled();
    });
    it('calls the onNotFound callback when there is an API error with status 404', () => {
        const mockApiError: APIError = {
            response: {
                status: 404,
                data: 'Not Found',
            },
            message: 'Not Found',
        };

        render(
            <PhosphormProvider onUnauthorized={mockUnauthorized} onNotFound={mockNotFound}>
                <Form onSubmit={mockSubmit} onSuccess={mockSuccess} apiError={mockApiError}>
                    <input type="text" name="test-input" />
                </Form>
            </PhosphormProvider>,
        );

        expect(mockNotFound).toHaveBeenCalled();
    });
});
