import { CustomValidateFunction } from './CustomValidateFunction';

export interface FormInputProps<T> {
    /**
     * The name of the input. This is used as the key in the form's state object.
     */
    name: string;
    /**
     * The value of the input. This is used as the value in the form's state object.
     */
    value: T;
    /**
     * The function called to update the form's state object.
     */
    onChange: onChangeFunction<T>;
    /**
     * Whether to disable the input.
     */
    disabled?: boolean;
    /**
     * Whether the input is required to be filled in to submit the form
     */
    required?: boolean;
    /**
     * A custom function to call when validating this form input.
     */
    customValidate?: CustomValidateFunction<T>;
    /**
     * a classname to apply to the input for styling
     */
    overrideClass?: string;
    /**
     * Aria label for the input
     */
    ariaLabel?: string;
    /**
     * Label to display above the input.
     */
    label?: string;
}

export type onChangeFunction<T> = (name: string | any, value: T) => void;
