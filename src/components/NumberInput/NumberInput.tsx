import React, { SyntheticEvent, useCallback } from 'react';

import useFieldValidation from '../../hooks/useFieldValidation';
import FormField from '../FormField/FormField';
import { FormInputProps } from '../../types/FormInputProps';

const NumberInput: React.FC<NumberInputProps> = ({
    name,
    value,
    onChange,
    label = '',
    placeholder = '',
    required = false,
    minNumber,
    maxNumber,
    disabled,
    customValidate,
    ariaLabel = 'Enter a number',
}) => {
    const memoizedValidate = useCallback(_validate, [minNumber, maxNumber]);
    const [error, showError] = useFieldValidation({
        name,
        required,
        value,
        customValidate,
        extendedValidate: memoizedValidate,
    });

    return (
        <FormField name={name} label={label} required={required} error={error}>
            <input
                type="number"
                className={`form-input text-area ${error ? 'error' : ''}`}
                placeholder={placeholder}
                name={name}
                id={name}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disabled}
                aria-label={ariaLabel}
                aria-required={required ? 'true' : 'false'}
            />
        </FormField>
    );

    function handleBlur() {
        showError();
    }

    function handleChange(e: SyntheticEvent) {
        e.preventDefault();

        const newVal = (e.target as HTMLInputElement).valueAsNumber;

        if (!isNaN(newVal)) {
            onChange(name, newVal);
        }
    }

    function _validate(val: number) {
        if (!val) return;

        if (minNumber && val < minNumber) {
            return `Value cannot be less than ${minNumber},`;
        }
        if (maxNumber && val > maxNumber) {
            return `Value cannot be greater than ${maxNumber}.`;
        }
    }
};

export interface NumberInputProps extends FormInputProps<number> {
    /**
     * Placeholder text to display when the input is empty
     */
    placeholder?: string;
    /**
     * Minimum value for the input
     */
    minNumber?: number;
    /**
     * Maximum value for the input
     */
    maxNumber?: number;
}

export default NumberInput;
