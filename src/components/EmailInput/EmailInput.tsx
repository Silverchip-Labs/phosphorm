import React, { SyntheticEvent, useCallback } from 'react';

import useFieldValidation from '../../hooks/useFieldValidation';
import FormField from '../FormField/FormField';
import { FormInputProps } from '../../types/FormInputProps';

const EmailInput: React.FC<EmailInputProps> = ({
    name,
    value,
    onChange,
    label = '',
    placeholder = '',
    required = false,
    validationRegExp,
    disabled,
    customValidate,
    ariaLabel = 'Enter an email address',
}) => {
    const memoizedValidate = useCallback(_validate, [validationRegExp]);
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
                type="email"
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

        if (!validateEmail(val)) {
            return 'Please provide a valid email.';
        }

        if (validationRegExp && !RegExp(validationRegExp).test(val)) {
            return 'Invalid value provided.';
        }
    }
};

function validateEmail(val: string) {
    const reg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(val);
}

export interface EmailInputProps extends FormInputProps<string> {
    /**
     * Placeholder text to display when the input is empty.
     */
    placeholder?: string;
    /**
     * Regular expression to validate the input value against.
     */
    validationRegExp?: string;
}

export default EmailInput;
