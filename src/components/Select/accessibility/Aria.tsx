import React from 'react';

const Aria: React.FC = () => (
    <>
        {ariaList.map(aria => (
            <span key={aria.id} id={aria.id} style={{ display: 'none' }}>
                {aria.description}
            </span>
        ))}
    </>
);

type AriaLabelKeys = 'selectOpenDropdownOptions' | 'searchOptions';
type AriaDescriptionKeys = 'selectOptionsListDescription';

export const ariaLabels: Record<AriaLabelKeys, AriaType> = {
    selectOpenDropdownOptions: {
        id: 'aria-select-open-dropdown-options',
        description: 'Open dropdown of options',
    },
    searchOptions: {
        id: 'aria-search-options',
        description: 'Search options',
    },
};

export const ariaDescriptions: Record<AriaDescriptionKeys, AriaType> = {
    selectOptionsListDescription: {
        id: 'aria-select-options-list-description',
        description: `The list of options. Use the up and down arrow keys to 
        move through the list and enter to select your option.`,
    },
};

const ariaList = [...Object.values(ariaLabels), ...Object.values(ariaDescriptions)];

interface AriaType {
    id: string;
    description: string;
}

export default Aria;
