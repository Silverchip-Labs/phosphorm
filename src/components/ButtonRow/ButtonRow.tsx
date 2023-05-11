import React from 'react';
import './ButtonRow.scss';

const ButtonRow: React.FC<ButtonRowProps> = ({ children, alignment = 'center' }) => (
    <div className={`button-row ${alignment}`}>{children}</div>
);

interface ButtonRowProps {
    children: React.ReactNode;
    alignment?: string;
}

export default ButtonRow;
