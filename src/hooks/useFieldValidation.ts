import { useCallback, useState, useEffect, useContext } from 'react';

import usePrevious from './usePrevious';
import { FormContext } from '../components/Form/Form';
import { CustomValidateFunction } from '../types/CustomValidateFunction';
import { isEmpty } from '../utils';

function useFieldValidation<TValue>({
    name,
    customValidate,
    required = false,
    value,
    extendedValidate,
}: UseFieldValidationConfig<TValue>): UseFieldValidationErr {
    const {
        addFieldError,
        removeFieldError,
        removeApiError,
        showFieldErrors,
        clientErrors,
        apiErrors,
    } = useContext(FormContext);
    const fieldError = clientErrors[name];
    const apiError = apiErrors?.[name];

    const [errorVisible, setErrorVisible] = useState(false);
    const prevShowError = usePrevious(showFieldErrors);

    const showError = useCallback(() => {
        setErrorVisible(true);
    }, []);

    const addError = useCallback(
        (err: string) => {
            addFieldError(name, err);
        },
        [addFieldError, fieldError, name],
    );

    const removeError = useCallback(() => {
        removeFieldError(name);
        removeApiError(name);
    }, [removeFieldError, name, removeApiError]);

    useEffect(() => {
        if (!prevShowError && showFieldErrors) {
            showError();
        }
    }, [showError, prevShowError, showFieldErrors]);

    useEffect(() => {
        return () => removeError();
    }, [removeError]);

    const validate = useCallback(() => {
        const extendedError = extendedValidate ? extendedValidate(value) : null;
        const customError = customValidate ? customValidate(value) : null;
        if (required && isEmpty(value)) {
            addError('This is a required field.');
        } else if (extendedError) {
            addError(extendedError);
        } else if (customError) {
            addError(customError);
        } else {
            removeError();
        }
    }, [extendedValidate, value, customValidate, required, addError, removeError]);

    useEffect(() => {
        validate();
    }, [validate]);
    let outputError = fieldError || apiError || null;
    if (Array.isArray(outputError)) {
        outputError = outputError.join('\n');
    }
    const visibleError = errorVisible ? outputError : null;
    return [visibleError, showError];
}

interface UseFieldValidationConfig<TValue> {
    name: string;
    value: TValue;
    required?: boolean;
    customValidate?: CustomValidateFunction<TValue>;
    extendedValidate?: CustomValidateFunction<TValue>;
}

type UseFieldValidationErr = [visibleError: string | null, showError: () => void];
export default useFieldValidation;
