import React from 'react';
import './FormField.scss';

/**
 * Intended to wrap a form field and its label, and display any errors. The field's classname is 'form-field'.
 * The label's classname is 'form-label'.
 * The required asterisk's classname is 'form-asterisk'.
 * The error's classname is 'form-error'.
 * @param children
 * @param name
 * @param label
 * @param required
 * @param error
 */
const FormField: React.FC<FormFieldProps> = ({ children, name, label, required, error }) => (
    <div className="form-field">
        {!!label && (
            <label htmlFor={name} className="form-label">
                {label}
                {required && <span className="form-asterisk">*</span>}
            </label>
        )}

        {children}

        {!!error && <p className="form-error">{error}</p>}
    </div>
);

export interface FormFieldProps {
    children: React.ReactNode;
    /**
     * The name of the field, should match the name of the field in the form's state
     */
    name: string;
    /**
     * The label to display for the field
     */
    label?: string | React.ReactNode;
    /**
     * Whether the field is required
     */
    required?: boolean;
    /**
     * The error to display for the field
     */
    error?: string | null;
}

export default FormField;
