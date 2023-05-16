import React, { useCallback, useEffect, useRef, useState } from 'react';
import useTimeout from '../../hooks/useTimeout';
import usePrevious from '../../hooks/usePrevious';
import { APIError, FieldErrorsObj } from '../../types/FieldErrors';
import ButtonRow from '../ButtonRow';
import ActionButton from '../ActionButton';
import { isEmpty } from '../../utils';
import { PhosphormContext } from '../PhosphormProvider';

export const FormContext = React.createContext<FormContextType>({
    addFieldError: () => {},
    removeFieldError: () => {},
    removeApiError: () => {},
    setFormError: () => {},
    showFieldErrors: false,
    setShowFieldErrors: () => {},
    formError: null,
    clientErrors: {},
    apiErrors: null,
});

const Form: React.FC<FormProps> = ({
    children,
    onSubmit,
    onCancel,
    onSuccess,
    omitButtons = false,
    isPosting = false,
    error,
    buttonAlignment = 'right',
    submitDisabled = false,
    postSuccess = false,
    apiError = null,
}) => {
    const phosContext = React.useContext(PhosphormContext);

    const [clientErrors, setClientErrors] = useState<FieldErrorsObj>({});
    // stateful so we can remove field errors on changing fields
    const [apiErrors, setApiErrors] = useState<FieldErrorsObj | null>(null);
    const [showFieldErrors, setShowFieldErrors] = useState(false);
    const addFieldError = useCallback((field: string, error: string) => {
        setClientErrors(clientErrors => ({ ...clientErrors, [field]: error }));
    }, []);

    const removeFieldError = useCallback((field: string) => {
        setClientErrors(clientErrors => {
            const { [field]: _, ...rest } = clientErrors;
            return rest;
        });
    }, []);

    const removeApiError = useCallback((field: string) => {
        setApiErrors(apiErrors => {
            if (!apiErrors) return {};
            const { [field]: _, ...rest } = apiErrors;
            return rest;
        });
    }, []);

    useEffect(() => {
        if (apiError) {
            const { response, message } = apiError;
            if (response?.status === 400 && phosContext?.onBadRequest) {
                phosContext.onBadRequest();
            }
            if (response?.status === 401 && phosContext?.onUnauthorized) {
                phosContext.onUnauthorized();
            }
            if (response?.status === 403 && phosContext?.onForbidden) {
                phosContext.onForbidden();
            }
            if (response?.status === 404 && phosContext?.onNotFound) {
                phosContext.onNotFound();
            }
            if (response?.status === 500 && phosContext?.onServerError) {
                phosContext.onServerError();
            }
            if (response?.status === 400) {
                if (typeof response.data === 'string') {
                    setFormError(response.data);
                } else if ('errors' in response.data) {
                    setApiErrors(response.data.errors);
                    setShowFieldErrors(true);
                } else {
                    setFormError(message);
                }
                return;
            } else if (response && response.status === 401) {
                if (phosContext?.onUnauthorized) {
                    phosContext.onUnauthorized();
                }
            } else {
                setFormError(message);
            }
        } else {
            setApiErrors(null);
            setFormError(null);
        }
    }, [apiError, phosContext]);

    const [formError, setFormError] = useState<string | null>(null);
    const timeout = useTimeout();

    const [success, setSuccess] = useState(false);
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            setSuccess(postSuccess);
        }
    }, [postSuccess]);

    const prevSuccess = usePrevious(success);
    useEffect(() => {
        if (!prevSuccess && success && onSuccess) {
            timeout(onSuccess, 600);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success, prevSuccess, timeout]);

    const ctx: FormContextType = {
        formError,
        setFormError,
        addFieldError,
        removeFieldError,
        removeApiError,
        showFieldErrors,
        setShowFieldErrors,
        clientErrors,
        apiErrors,
    };

    return (
        <FormContext.Provider value={ctx}>
            <form onSubmit={_handleSubmit} data-testid="form">
                {children}
                {!!formError && <p className="form-generic-error">{formError}</p>}
                {!!error && !formError && <p className="form-generic-error">{error}</p>}
                {!omitButtons && (
                    <ButtonRow alignment={buttonAlignment}>
                        {!!onCancel && (
                            <ActionButton
                                source="secondary"
                                type="button"
                                onClick={_handleCancel}
                                disabled={isPosting}
                            >
                                Cancel
                            </ActionButton>
                        )}
                        <ActionButton
                            isPosting={isPosting}
                            type="submit"
                            disabled={submitDisabled}
                            success={success}
                        >
                            Submit
                        </ActionButton>
                    </ButtonRow>
                )}
            </form>
        </FormContext.Provider>
    );

    function _handleCancel(e: React.MouseEvent) {
        e.preventDefault();
        if (!isPosting && onCancel) onCancel();
    }

    function _handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!isEmpty(clientErrors) || !isEmpty(apiErrors)) {
            setShowFieldErrors(true);
        } else if (!isPosting) {
            setFormError(null);
            onSubmit();
        }
    }
};

interface FormContextType {
    formError: string | null;
    setFormError: (error: string | null) => void;
    addFieldError: (field: string, error: string) => void;
    removeFieldError: (field: string) => void;
    removeApiError: (field: string) => void;
    showFieldErrors: boolean;
    setShowFieldErrors: (show: boolean) => void;
    clientErrors: FieldErrorsObj;
    apiErrors: FieldErrorsObj | null;
}

export interface FormProps {
    children?: React.ReactNode;
    /**
     * Whether the form is currently posting - e.g. loading from React Query
     */
    isPosting?: boolean;
    /**
     * Whether to omit the buttons from the form
     */
    omitButtons?: boolean;
    /**
     * Function to call when the form is submitted
     */
    onSubmit: () => void;
    /**
     * Function to call when the form posts successfully (based on end of isPosting and postSuccess)
     */
    onSuccess?: () => void;
    /**
     * Function to call when the form is cancelled
     */
    onCancel?: () => void | undefined;
    /**
     * Generic error to display at the bottom of the form
     */
    error?: string | undefined | null;
    /**
     * Alignment of the buttons
     */
    buttonAlignment?: 'left' | 'center' | 'right';
    /**
     * Whether the submit button is disabled
     */
    submitDisabled?: boolean;
    /**
     * Whether the form has posted successfully
     */
    postSuccess?: boolean;
    /**
     * API errors to display at bottom of form / field errors
     */
    apiError?: APIError | null;
}

export default Form;
