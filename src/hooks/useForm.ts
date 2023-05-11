// general form creation
import { useCallback, useState } from 'react';

function useForm<TForm extends object>(initialData: TForm): UseForm<TForm> {
    const [formData, setFormData] = useState(initialData);

    const handleChange = useCallback(
        <T>(name: keyof TForm, value: T) => {
            setFormData(prev => ({ ...prev, [name]: value }));
        },
        [setFormData],
    );

    const resetData = useCallback(
        (data?: TForm) => {
            if (!data) {
                setFormData(initialData);
            } else {
                setFormData(data);
            }
        },
        [initialData, setFormData],
    );

    return [formData, handleChange, resetData];
}
type UseForm<TForm> = [
    formData: TForm,
    handleChange: <T>(name: keyof TForm, value: T) => void,
    resetData: (data?: TForm) => void,
];

export default useForm;
