import React, { useState, useMemo } from 'react';

import useSelectKeyboardNavigation from './hooks/useSelectKeyboardNavigation';
import useSelectListeners from './hooks/useSelectListeners';
import useSelectDropdownPosition from './hooks/useSelectDropdownPosition';
import { FormInputProps } from '../../types/FormInputProps';
import { DropdownOption } from '../../types/DropdownOption';
import { ariaDescriptions, ariaLabels } from './accessibility/Aria';

const MiniSelect: React.FC<MiniSelectProps> = ({
    name,
    disabled = false,
    value,
    options = [],
    onChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const { node } = useSelectListeners({ setIsOpen });

    const selected = useMemo(_getSelected, [value, options]);

    const { optionsRef, handleMainInputKeyDown, handleOptionKeyDown } = useSelectKeyboardNavigation(
        { setIsOpen },
    );
    const { selectRef, dropdownStyles } = useSelectDropdownPosition({ isOpen });

    return (
        <div ref={node}>
            <div ref={selectRef} className={`form-select mini ${disabled ? 'disabled' : ''}`}>
                <button
                    className="form-select-button"
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                    onFocus={() => setIsOpen(false)}
                    onKeyDown={handleMainInputKeyDown}
                    aria-labelledby={ariaLabels.selectOpenDropdownOptions.id}
                />
                <p>{selected?.label}</p>
                <i className="arrow fal fa-angle-down" />
            </div>

            {isOpen && (
                <div className="form-select-options mini" style={dropdownStyles}>
                    <div
                        className="options-list"
                        role="listbox"
                        aria-describedby={ariaDescriptions.selectOptionsListDescription.id}
                    >
                        {options.map((opt, i) => (
                            <button
                                key={`${opt.value} - ${i}`}
                                ref={e => e && (optionsRef.current[i] = e)}
                                type="button"
                                className={`option ${value === opt.value ? 'active' : ''}`}
                                onClick={e => {
                                    e.preventDefault();
                                    handleChange(opt.value);
                                    setIsOpen(false);
                                }}
                                onKeyDown={e => handleOptionKeyDown(e, options, i)}
                                role="option"
                                aria-selected={value === opt.value}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    function _getSelected() {
        return options.find(item => item.value === value);
    }

    function handleChange(val: number) {
        if (value === val) return;
        onChange(name, val);
    }
};

interface MiniSelectProps extends FormInputProps<number> {
    /**
     * Options to display in the select
     */
    options: DropdownOption<number>[];
}

export default MiniSelect;
