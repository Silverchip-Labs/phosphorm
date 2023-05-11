import React from 'react';

const Title: React.FC<TitleProps> = ({ children, alignment = '', className = '', ...props }) => {
    return (
        <h1 className={`create-header page-title ${alignment} ${className}`} {...props}>
            {children}
        </h1>
    );
};

interface TitleProps {
    children: React.ReactNode;
    alignment?: 'left' | 'center' | 'right';
    className?: string;
}

export default Title;
