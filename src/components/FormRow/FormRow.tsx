import React from 'react';

const FormRow: React.FC<FormRowProps> = ({ children }) => (
    <div className="form-row">{children}</div>
);

interface FormRowProps {
    children: React.ReactNode;
}

export default FormRow;
