import useFieldValidation from '../../hooks/useFieldValidation';
import React, { useCallback, useEffect } from 'react';
import { DropdownOption } from '../../types/DropdownOption';
import { FormInputProps } from '../../types/FormInputProps';
import FormField from '../FormField';

const Radio: React.FC<RadioProps> = ({
    name,
    disabled = false,
    value = null,
    options = [],
    onChange,
    label = '',
    customValidate,
    required = false,
}) => {
    const [error, showError] = useFieldValidation({
        name,
        customValidate,
        required,
        value,
    });

    const handleChange = useCallback(
        (newVal: number) => {
            console.log({ name, newVal });
            onChange(name, newVal);
        },
        [name, onChange],
    );

    useEffect(() => {
        if (!value) {
            handleChange(options[0]?.value);
        }
    }, [value, handleChange, options]);

    return (
        <FormField name={name} label={label} required={required} error={error}>
            <div className="form-radio-list">{options.map(renderOption)}</div>
        </FormField>
    );

    function renderOption(opt: DropdownOption<number>) {
        const id = `radio_${name}_${opt.value}`;
        return (
            <div className="form-radio" key={id}>
                <input
                    type="radio"
                    value={opt.value}
                    id={id}
                    name={name}
                    onChange={() => handleChange(opt.value)}
                    disabled={disabled}
                    checked={value === opt.value}
                    aria-checked={value === opt.value ? 'true' : 'false'}
                />
                <label
                    className={`content ${disabled ? 'disabled' : ''}`}
                    htmlFor={id}
                    onClick={showError}
                >
                    <div className="outer-box" aria-hidden>
                        <div
                            className={`inner-box ${value === opt.value ? 'active' : ''}`}
                            aria-hidden
                        ></div>
                    </div>
                    <p>{opt.label}</p>
                </label>
            </div>
        );
    }
};

export interface RadioProps extends FormInputProps<number | null> {
    /**
     * The options to display
     */
    options: DropdownOption<number>[];
}

export default Radio;
