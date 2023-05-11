import React, { useState, useEffect, useMemo, SyntheticEvent } from 'react';

import useFieldValidation from '../../hooks/useFieldValidation';
import usePrevious from '../../hooks/usePrevious';
import useSelectKeyboardNavigation from './hooks/useSelectKeyboardNavigation';
import useSelectListeners from './hooks/useSelectListeners';
import useSelectDropdownPosition from './hooks/useSelectDropdownPosition';
import { FormInputProps } from '../../types/FormInputProps';
import { DropdownOption } from '../../types/DropdownOption';
import { ariaDescriptions, ariaLabels } from './accessibility/Aria';
import FormField from '../FormField';

// Select is a single select dropdown
// pass 'required' flag if it's required
// pass 'search' flag if you want to enable the search
// pass 'disabled' flag if you want to disable the dropdown
// pass a 'placeholder' string if you want to customize the placeholder
// pass a 'label' string if you want to output a field name above the select.
// field errors will be output below automatically
// options should be in this form '[{ value: 1, label: "opt 1" }, { value: 2, label: "opt 2" }]'
// value should be the selected 'value' not option(the number not the object)
// pass `null` as the default value
const Select: React.FC<SelectProps> = ({
    name,
    search = false,
    disabled = false,
    value = null,
    options = [],
    onChange,
    label = '',
    placeholder = 'Select...',
    required,
    customValidate,
}) => {
    const [error, showError] = useFieldValidation({
        name,
        required,
        customValidate,
        value,
    });

    const [searchTerm, setSearch] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const prevIsOpen = usePrevious(isOpen);

    useEffect(() => {
        if (!isOpen && prevIsOpen) {
            showError();
        }
    }, [isOpen, showError, prevIsOpen]);

    const { node } = useSelectListeners({ setIsOpen });

    const filteredOptions = useMemo(_getFilteredOptions, [search, searchTerm, options]);
    const selected = useMemo(_getSelected, [value, options]);

    const shouldSearchShow = search && !!options.length;

    const {
        optionsRef,
        searchRef,
        handleMainInputKeyDown,
        handleSearchKeyDown,
        handleOptionKeyDown,
    } = useSelectKeyboardNavigation({
        shouldSearchShow,
        setIsOpen,
    });

    const { selectRef, dropdownStyles } = useSelectDropdownPosition({ isOpen });

    return (
        <FormField name={name} label={label} required={required} error={error}>
            <div ref={node}>
                <div
                    ref={selectRef}
                    className={`form-select ${disabled ? 'disabled' : ''} ${error ? 'error' : ''}`}
                >
                    <button
                        className="form-select-button"
                        type="button"
                        onClick={() => !disabled && setIsOpen(!isOpen)}
                        disabled={disabled}
                        onFocus={() => setIsOpen(false)}
                        onKeyDown={handleMainInputKeyDown}
                        aria-labelledby={ariaLabels.selectOpenDropdownOptions.id}
                    />
                    {!selected ? (
                        <p className="placeholder">{placeholder}</p>
                    ) : (
                        <>
                            <p>{selected.label}</p>
                            {!disabled && (
                                <button
                                    className="remove"
                                    type="button"
                                    disabled={disabled}
                                    onClick={e => {
                                        e.preventDefault();
                                        e.stopPropagation();

                                        handleChange(null);
                                    }}
                                    aria-label={`Remove selected option ${selected.label}`}
                                >
                                    <i className="fal fa-times" />
                                </button>
                            )}
                        </>
                    )}
                    <i className="arrow fal fa-angle-down" />
                </div>

                {isOpen && (
                    <div className="form-select-options" style={dropdownStyles}>
                        {shouldSearchShow && (
                            <div className="search" onClick={e => e.stopPropagation()}>
                                <input
                                    ref={searchRef}
                                    className="form-input"
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    onKeyDown={handleSearchKeyDown}
                                    aria-labelledby={ariaLabels.searchOptions.id}
                                />
                            </div>
                        )}
                        <div
                            className="options-list"
                            role="listbox"
                            aria-describedby={ariaDescriptions.selectOptionsListDescription.id}
                        >
                            {!filteredOptions.length && <p>There are no options to display</p>}

                            {filteredOptions.map((opt, i) => (
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
                                    onKeyDown={e => handleOptionKeyDown(e, filteredOptions, i)}
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
        </FormField>
    );

    function _getSelected() {
        return options.find(item => item.value === value);
    }

    function _getFilteredOptions() {
        if (!search || !searchTerm) return options;
        return options.filter(opt =>
            opt.label
                .replace(/[^A-Z0-9]/gi, '')
                .toLowerCase()
                .includes(searchTerm.replace(/[^A-Z0-9]/gi, '').toLowerCase()),
        );
    }

    function handleSearchChange(e: SyntheticEvent) {
        e.preventDefault();

        setSearch((e.target as HTMLTextAreaElement).value);
    }

    function handleChange(val: number | null) {
        if (value === val) return;
        onChange(name, val);
    }
};

interface SelectProps extends FormInputProps<number | null> {
    /**
     * If true, the select will show search controls
     */
    search?: boolean;
    /**
     * Options to display in the select
     */
    options?: DropdownOption<number>[];
    /**
     * Placeholder to display when no option is selected
     */
    placeholder?: string;
}

export default Select;
