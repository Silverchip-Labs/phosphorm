import React, { useState, useEffect, useMemo, SyntheticEvent, MouseEvent } from 'react';

import useFieldValidation from '../../hooks/useFieldValidation';
import usePrevious from '../../hooks/usePrevious';
import useSelectKeyboardNavigation from './hooks/useSelectKeyboardNavigation';
import useSelectListeners from './hooks/useSelectListeners';
import useSelectDropdownPosition from './hooks/useSelectDropdownPosition';
import FormField from '../FormField';
import { ariaDescriptions, ariaLabels } from './accessibility/Aria';
import { DropdownOption } from '../../types/DropdownOption';
import { FormInputProps } from '../../types/FormInputProps';

// MultiSelect is a multi select dropdown
// pass 'required' prop if it's required
// pass 'search' prop if you want to enable the search
// pass 'disabled' flag if you want to disable the dropdown
// pass a 'placeholder' string if you want to customize the placeholder
// field errors will be output below automatically
// options should be in this form '[{ value: 1, label: "opt 1" }, { value: 2, label: "opt 2" }]'
// value should be an array of selected values i.e '[1, 2]'
// pass an empty array as the default value
const MultiSelect: React.FC<MultiSelectProps> = ({
    name,
    search = false,
    disabled = false,
    value = [],
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
                    className={`form-select multi-select ${disabled ? 'disabled' : ''} ${
                        error ? 'error' : ''
                    }`}
                    ref={selectRef}
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
                    <div className="selected">
                        {selected.map(opt => (
                            <div
                                key={opt.value}
                                className="option"
                                onClick={() => isOpen && setIsOpen(false)}
                            >
                                <p>{opt.label}</p>
                                {!disabled && (
                                    <button
                                        className="remove"
                                        onClick={e => handleDeselect(e, opt.value)}
                                        disabled={disabled}
                                        aria-label={`Remove selected option ${opt.label}`}
                                    >
                                        <i className="fal fa-times" />
                                    </button>
                                )}
                            </div>
                        ))}

                        {!selected.length && <p className="placeholder">{placeholder}</p>}
                    </div>

                    {selected.length && !disabled ? (
                        <button
                            className="remove"
                            onClick={e => handleClearAll(e)}
                            disabled={disabled}
                            aria-label="Remove all selected options"
                        >
                            <i className="fal fa-times" />
                        </button>
                    ) : (
                        ''
                    )}

                    <i className="arrow fal fa-angle-down" />
                </div>

                {isOpen && (
                    <div className="form-select-options" style={dropdownStyles}>
                        {search && !!options.length && (
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
                            aria-describedby={ariaDescriptions.selectOptionsListDescription.id}
                            aria-multiselectable="true"
                        >
                            {!filteredOptions.length && <p>There are no options to display</p>}
                            {filteredOptions.map((opt, i) => (
                                <button
                                    key={opt.value}
                                    ref={e => e && (optionsRef.current[i] = e)}
                                    type="button"
                                    className={`option ${
                                        value.includes(opt.value) ? 'active' : ''
                                    }`}
                                    onClick={(e: MouseEvent) => {
                                        handleSelect(e, opt.value);
                                    }}
                                    onKeyDown={e => handleOptionKeyDown(e, filteredOptions, i)}
                                    role="checkbox"
                                    aria-checked={value.includes(opt.value)}
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
        const selectedOptions: DropdownOption<number>[] = value
            .filter(val => !options.find(({ value }) => value === val))
            .map(val => ({ label: val.toString(), value: val }));

        return options.filter(opt => value.includes(opt.value)).concat(selectedOptions);
    }

    function _getFilteredOptions() {
        if (!search || !searchTerm) return options;

        const formattedTerm = searchTerm.replace(/[^A-Z0-9]/gi, '').toLowerCase();
        return options.filter(opt =>
            opt.label
                .replace(/[^A-Z0-9]/gi, '')
                .toLowerCase()
                .includes(formattedTerm),
        );
    }

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        setSearch(e.target.value);
    }

    function handleDeselect(e: MouseEvent, clicked: number) {
        e.preventDefault();
        e.stopPropagation();

        const newVal = value.filter(item => item !== clicked);
        handleChange(newVal);
        showError();
    }

    function handleSelect(e: MouseEvent, clicked: number) {
        e.preventDefault();

        const newVal = value.includes(clicked)
            ? value.filter(item => item !== clicked)
            : value.concat(clicked);

        handleChange(newVal);
    }

    function handleClearAll(e: SyntheticEvent) {
        e.preventDefault();
        e.stopPropagation();
        showError();

        setIsOpen(false);

        const newVal: number[] = [];
        handleChange(newVal);
    }

    function handleChange(newVal: number[]) {
        onChange(name, newVal);
    }
};

interface MultiSelectProps extends FormInputProps<number[]> {
    /**
     * If true, the select will show search controls
     */
    search?: boolean;
    /**
     * Options to display in the select
     */
    options: DropdownOption<number>[];
    /**
     * Placeholder to display when no option is selected
     */
    placeholder?: string;
}

export default MultiSelect;
