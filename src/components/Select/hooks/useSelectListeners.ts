import { useCallback, useEffect, useRef } from 'react';

const useSelectListeners = (props: SelectListenersProps) => {
    const { setIsOpen } = props;

    const node = useRef<HTMLDivElement | null>(null);

    const handleClick = useCallback(
        (e: Event) => {
            // inside click
            if (node.current?.contains(e.target as Node)) {
                return;
            }

            // outside click
            setIsOpen(false);
        },
        [setIsOpen],
    );

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        },
        [setIsOpen],
    );

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleClick, handleKeyDown]);

    return { node };
};

interface SelectListenersProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default useSelectListeners;
