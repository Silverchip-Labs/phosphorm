import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ActionButton from './ActionButton';

describe('ActionButton', () => {
    it('renders without errors', () => {
        render(<ActionButton>Button Text</ActionButton>);
    });

    it('renders button element with expected attributes and text', () => {
        const { getByText, getByTestId } = render(<ActionButton>Click me!</ActionButton>);
        const buttonElement = getByTestId('action-button');
        const textElement = getByText('Click me!');

        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).not.toBeDisabled();
        expect(buttonElement).toHaveAttribute('type', 'submit');
        expect(textElement).toBeInTheDocument();
    });

    it('invokes onClick callback when button is clicked', () => {
        const onClick = jest.fn();
        const { getByText } = render(<ActionButton onClick={onClick}>Click me!</ActionButton>);
        const buttonElement = getByText('Click me!');

        fireEvent.click(buttonElement);

        expect(onClick).toHaveBeenCalled();
    });

    it('displays spinner when isPosting prop is true', () => {
        const { getByTestId } = render(<ActionButton isPosting>Click me!</ActionButton>);
        const spinnerElement = getByTestId('spinner');

        expect(spinnerElement).toBeInTheDocument();
    });

    it('displays success icon when success prop is true', () => {
        const { getByTestId } = render(<ActionButton success>Click me!</ActionButton>);
        const successIconElement = getByTestId('success');

        expect(successIconElement).toBeInTheDocument();
    });

    it('does not display spinner or success icon when isPosting and success props are false', () => {
        const { queryByTestId } = render(<ActionButton>Click me!</ActionButton>);
        const spinnerElement = queryByTestId('spinner');
        const successIconElement = queryByTestId('success');

        expect(spinnerElement).toBeNull();
        expect(successIconElement).toBeNull();
    });

    it('renders with disabled attribute when disabled prop is true', () => {
        const { getByTestId } = render(<ActionButton disabled>Click me!</ActionButton>);
        const buttonElement = getByTestId('action-button');

        expect(buttonElement).toBeDisabled();
    });
});
