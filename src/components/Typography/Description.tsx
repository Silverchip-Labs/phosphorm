import React from 'react';

const Description: React.FC<DescriptionProps> = ({
    children,
    alignment = '',
    className = '',
    ...props
}) => {
    return (
        <p className={`page-description ${alignment} ${className}`} {...props}>
            {children}
        </p>
    );
};

interface DescriptionProps {
    children: React.ReactNode;
    tag?: HTMLElementTagNameMap[keyof HTMLElementTagNameMap];
    alignment?: 'left' | 'center' | 'right';
    className?: string;
}

export default Description;
