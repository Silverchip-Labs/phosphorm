import useFieldValidation from '../../hooks/useFieldValidation';
import { FormInputProps } from '../../types/FormInputProps';
import FormField from '../FormField/FormField';
import React from 'react';

const Checkbox: React.FC<CheckboxProps> = ({
    name,
    value,
    onChange,
    label = '',
    placeholder = '',
    required = false,
    disabled = false,
    customValidate,
    ariaLabel = 'Yes',
}) => {
    const [error, showError] = useFieldValidation({
        name,
        required,
        value,
        customValidate,
    });

    return (
        <FormField name={name} label={label} required={required} error={error}>
            <div className="form-checkbox">
                <input
                    type="checkbox"
                    name={name}
                    id={name}
                    checked={value}
                    onChange={handleChange}
                    disabled={disabled}
                    aria-checked={value ? 'true' : 'false'}
                    aria-required={required ? 'true' : 'false'}
                    data-testid="checkbox"
                    onBlur={showError}
                />
                <label className={`content ${disabled ? 'disabled' : ''}`} htmlFor={name}>
                    <div className="outer-box" aria-hidden>
                        <i className={`inner-box far fa-check ${value ? 'active' : ''}`}></i>
                    </div>
                    {/* show hidden text when no placeholder for accessibility */}
                    {!!placeholder ? (
                        <p>{placeholder}</p>
                    ) : (
                        <p style={{ display: 'none' }}>{ariaLabel}</p>
                    )}
                </label>
            </div>
        </FormField>
    );

    function handleChange() {
        const newVal = !value;
        onChange(name, newVal);
        showError();
    }
};

export interface CheckboxProps extends Omit<FormInputProps<boolean>, 'label'> {
    /**
     * Placeholder text to show when no label is provided
     */
    placeholder?: string;
    label?: string | React.ReactNode;
}

export default Checkbox;
