import React, { SyntheticEvent, useCallback, useRef, useState } from 'react';

import useFieldValidation from '../../hooks/useFieldValidation';
import { FormInputProps } from '../../types/FormInputProps';
import FormField from '../FormField/FormField';

const minRows = 1;
const maxRows = 10;

const TextArea: React.FC<TextAreaProps> = ({
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

    const [rows, setRows] = useState(minRows);
    const inputRef = useRef<HTMLTextAreaElement | null>(null);

    return (
        <FormField name={name} label={label} required={required} error={error}>
            <textarea
                ref={inputRef}
                rows={rows}
                className={`form-input text-area ${error ? 'error' : ''}`}
                placeholder={placeholder}
                name={name}
                id={name}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disabled}
                aria-label={ariaLabel}
                aria-multiline="true"
                aria-required={required ? 'true' : 'false'}
            />
        </FormField>
    );

    function handleChange(e: SyntheticEvent) {
        e.preventDefault();

        fitRows();
        onChange(name, (e.target as HTMLTextAreaElement).value);
    }

    function handleBlur() {
        showError();
    }

    function fitRows() {
        const input = inputRef.current;
        const prevRows = input?.rows;

        if (input) {
            input.rows = minRows; // reset number of rows in textarea

            const computedInput = window.getComputedStyle(input);
            const padding =
                parseFloat(computedInput.paddingTop) + parseFloat(computedInput.paddingBottom);
            const lineHeight = parseFloat(computedInput.lineHeight);
            const scrollHeight = input.scrollHeight - padding;

            const curRows = Math.floor(scrollHeight / lineHeight);

            if (curRows === prevRows) {
                input.rows = curRows;
            }

            if (curRows >= maxRows) {
                input.rows = maxRows;
                input.scrollTop = input.scrollHeight;
            }
            setRows(curRows < maxRows ? curRows : maxRows);
        }
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

export interface TextAreaProps extends FormInputProps<string> {
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

export default TextArea;
