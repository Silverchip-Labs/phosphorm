import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import useWindowSize from '../../../hooks/useWindowSize';

const useSelectDropdownPosition = (props: SelectDropdownPositionProps) => {
    const { isOpen } = props;

    const selectRef = useRef<HTMLDivElement>(null);
    const [selectDimensions, setSelectDimensions] = useState({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
    });
    const [showOnTop, setShowOnTop] = useState(false);
    const [showOnRight, setShowOnRight] = useState(false);

    const windowSize = useWindowSize();

    const handleGetDimensions = useCallback(() => {
        if (!selectRef.current) return;

        const { width, height, x, y } = selectRef.current?.getBoundingClientRect();

        setSelectDimensions({
            width,
            height,
            x,
            y,
        });

        if (y + height > windowSize.height / 2) {
            setShowOnTop(true);
        } else {
            setShowOnTop(false);
        }

        if (x > windowSize.width / 2) {
            setShowOnRight(true);
        } else {
            setShowOnRight(false);
        }
    }, [windowSize.height, windowSize.width]);

    useEffect(() => {
        const scrollElement = findScrollContainer(selectRef.current);

        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleGetDimensions);
        }

        window.addEventListener('resize', handleGetDimensions);

        handleGetDimensions();

        return () => {
            if (scrollElement) {
                scrollElement.removeEventListener('scroll', handleGetDimensions);
            }

            window.removeEventListener('resize', handleGetDimensions);
        };
    }, [isOpen, handleGetDimensions]);

    const dropdownStyles: CSSProperties = {
        width: selectDimensions.width,
        top: showOnTop ? 'auto' : selectDimensions.y + selectDimensions.height,
        bottom: showOnTop ? windowSize.height - selectDimensions.y : 'auto',
        left: showOnRight ? 'auto' : selectDimensions.x,
        right: showOnRight
            ? windowSize.width - (selectDimensions.x + selectDimensions.width)
            : 'auto',
    };

    return { selectRef, dropdownStyles };
};

const findScrollContainer = (element: HTMLDivElement | null) => {
    if (!element) {
        return undefined;
    }

    let parent = element.parentElement;
    while (parent) {
        const { overflow, overflowY, overflowX } = window.getComputedStyle(parent);

        if (overflow.split(' ').every(o => o === 'auto' || o === 'scroll')) {
            return parent;
        }
        if (overflowY.split(' ').every(o => o === 'auto' || o === 'scroll')) {
            return parent;
        }
        if (overflowX.split(' ').every(o => o === 'auto' || o === 'scroll')) {
            return parent;
        }

        parent = parent.parentElement;
    }

    return document.documentElement;
};

interface SelectDropdownPositionProps {
    isOpen: boolean;
}

export default useSelectDropdownPosition;
