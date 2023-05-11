import React from 'react';
import useFieldValidation from '../../hooks/useFieldValidation';
import { FormInputProps } from '../../types/FormInputProps';

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    name,
    onChange,
    value,
    disabled,
    hideDisabled,
    label = '',
    required = false,
    customValidate,
    textColour = 'black',
    ariaLabel = 'On',
}) => {
    const [error] = useFieldValidation({
        name,
        customValidate,
        value,
    });

    return (
        <div
            className={`checkbox ${disabled ? 'left grey-out' : ''} ${
                hideDisabled && disabled ? 'hide' : ''
            } `}
        >
            <input
                id={name}
                onChange={handleChange}
                type="checkbox"
                checked={value}
                name={name}
                disabled={disabled}
                aria-checked={value ? 'true' : 'false'}
                aria-required={required ? 'true' : 'false'}
            />
            <label htmlFor={name}>
                {/* show hidden text when no placeholder for accessibility */}
                {label.length ? (
                    <span className={`text ${textColour}`}>{label}</span>
                ) : (
                    <span style={{ display: 'none' }}>{ariaLabel}</span>
                )}
                <span className="outer" aria-hidden>
                    <span className="inner" aria-hidden />
                </span>
            </label>
            {!!(error && error.length) && <p className="error red-text text-accent-4">{error}</p>}
        </div>
    );

    function handleChange() {
        const newVal = !value;
        onChange(name, newVal);
    }
};

interface ToggleSwitchProps extends FormInputProps<boolean> {
    /**
     * Whether to hide the input if disabled
     */
    hideDisabled?: boolean;
    /**
     * Colour of the label text - defaults to black, this colour is only a class name and so needs to be set up in CSS if used.
     */
    textColour?: string;
}

export default ToggleSwitch;
