import React, { SyntheticEvent, useCallback } from 'react';

import useFieldValidation from '../../hooks/useFieldValidation';
import FormField from '../FormField/FormField';
import { FormInputProps } from '../../types/FormInputProps';

const TextInput: React.FC<TextInputProps> = ({
    name,
    value,
    onChange,
    label = '',
    placeholder = '',
    required = false,
    validationRegExp,
    minLength,
    maxLength,
    disabled,
    customValidate,
    ariaLabel = 'Enter text',
}) => {
    const memoizedValidate = useCallback(_validate, [minLength, maxLength, validationRegExp]);
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
                type="text"
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

        const newVal = (e.target as HTMLInputElement).value;

        onChange(name, newVal);
    }

    function _validate(val: string) {
        if (!val) return;

        if (minLength && val.length < minLength) {
            return `Value must have at least ${minLength} characters.`;
        }
        if (maxLength && val.length > maxLength) {
            return `Value cannot have more than ${maxLength} characters.`;
        }
        if (validationRegExp && !RegExp(validationRegExp).test(val)) {
            return 'Invalid value provided.';
        }
    }
};

export interface TextInputProps extends FormInputProps<string> {
    /**
     * Placeholder text to display when the input is empty.
     */
    placeholder?: string;
    /**
     * A regular expression to validate the input value against.
     */
    validationRegExp?: string;
    /**
     * The minimum length of the input value.
     */
    minLength?: number;
    /**
     * The maximum length of the input value.
     */
    maxLength?: number;
}

export default TextInput;
