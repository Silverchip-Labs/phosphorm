import { useCallback, useEffect, useRef } from 'react';

const useTimeout = () => {
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    return useCallback((cb: () => void, timout: number) => {
        setTimeout(() => {
            if (isMounted.current) cb();
        }, timout);
    }, []);
};

export default useTimeout;
