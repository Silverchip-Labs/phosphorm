import { useRef } from 'react';
import { DropdownOption } from '../../../types/DropdownOption';

const useSelectKeyboardNavigation = (props: SelectKeyboardNavigationProps) => {
    const { shouldSearchShow, setIsOpen } = props;

    const optionsRef = useRef<HTMLButtonElement[]>([]);
    const searchRef = useRef<HTMLInputElement>(null);

    const handleMainInputKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'ArrowUp' && optionsRef.current[optionsRef.current.length - 1]) {
            optionsRef.current[optionsRef.current.length - 1].focus();
        }

        if (e.key === 'ArrowDown') {
            setIsOpen(true);

            if (searchRef.current) {
                searchRef.current.focus();
                return;
            }

            if (optionsRef.current[0]) {
                optionsRef.current[0].focus();
            }
        }
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const lastOption = optionsRef.current[optionsRef.current.length - 1];

        if (e.key === 'ArrowDown' && optionsRef.current[0]) {
            optionsRef.current[0].focus();
        }

        if (e.key === 'ArrowUp' && lastOption) {
            lastOption.focus();
        }

        if (e.key === 'Tab') {
            setIsOpen(false);
        }
    };

    const handleOptionKeyDown = (
        e: React.KeyboardEvent<HTMLButtonElement>,
        options: DropdownOption<number>[],
        index: number,
    ) => {
        const prevOption = optionsRef.current[index === 0 ? options.length - 1 : index - 1];
        const nextOption = optionsRef.current[index === options.length - 1 ? 0 : index + 1];
        const isFirst = index === 0;
        const isLast = index === options.length - 1;

        if (e.key === 'ArrowUp' && prevOption) {
            if (shouldSearchShow && searchRef.current && isFirst) {
                searchRef.current.focus();
                return;
            }

            prevOption.focus();
        }

        if (e.key === 'ArrowDown' && nextOption) {
            if (shouldSearchShow && searchRef.current && isLast) {
                searchRef.current.focus();
                return;
            }

            nextOption.focus();
        }

        if (e.key === 'Tab') {
            setIsOpen(false);
        }
    };

    return {
        optionsRef,
        searchRef,
        handleMainInputKeyDown,
        handleSearchKeyDown,
        handleOptionKeyDown,
    };
};

interface SelectKeyboardNavigationProps {
    shouldSearchShow?: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default useSelectKeyboardNavigation;
