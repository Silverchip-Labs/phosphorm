import React from 'react';
import './ActionButton.scss';

const ActionButton: React.FC<ActionButtonProps> = ({
    children,
    type = 'submit',
    source = 'primary',
    icon,
    isPosting = false,
    success = false,
    disabled = false,
    onClick = () => {},
}) => (
    <button
        className={`button ${source}`}
        type={type}
        disabled={isPosting || disabled}
        onClick={onClick}
    >
        {icon && !isPosting && <i className={`icon far fa-fw fa-${icon}`}></i>}
        {isPosting && <i className="icon far fa-fw fa-spinner fa-spin"></i>}
        {!isPosting && success && <i className="icon far fa-fw fa-check"></i>}
        <span className="text">{children}</span>
    </button>
);

export interface ActionButtonProps {
    children: React.ReactNode;
    /** The type of button */
    type?: 'submit' | 'button' | 'reset';
    /** The source of the button - controls the styling of the button */
    source?: 'primary' | 'secondary' | 'positive' | 'negative';
    /** The icon to display on the button - this will only work if Font Awesome is set up with classnames */
    icon?: string;
    /** Whether the button is in a posting state - this will display a spinner */
    isPosting?: boolean;
    /** Whether the button is in a success state - this will display a checkmark */
    success?: boolean;
    /** The function to call when the button is clicked */
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    /** Whether the button is disabled */
    disabled?: boolean;
}

export default ActionButton;
