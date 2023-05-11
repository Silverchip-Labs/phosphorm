import React, { PropsWithChildren } from 'react';

export const PhosphormContext = React.createContext<PhosphormProviderProps>({
    onUnauthorized: () => {},
    onBadRequest: () => {},
    onServerError: () => {},
    onForbidden: () => {},
    onNotFound: () => {},
});

const PhosphormProvider: React.FC<PhosphormProviderProps> = ({
    children,
    onBadRequest,
    onUnauthorized,
    onForbidden,
    onNotFound,
    onServerError,
}) => {
    const context = {
        onBadRequest,
        onUnauthorized,
        onForbidden,
        onNotFound,
        onServerError,
    };
    return <PhosphormContext.Provider value={context}>{children}</PhosphormContext.Provider>;
};

interface PhosphormProviderProps extends PropsWithChildren {
    onUnauthorized?: () => void;
    onBadRequest?: () => void;
    onServerError?: () => void;
    onForbidden?: () => void;
    onNotFound?: () => void;
}

export default PhosphormProvider;
