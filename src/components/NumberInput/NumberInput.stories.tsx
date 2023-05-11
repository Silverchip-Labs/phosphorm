import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import NumberInput from './NumberInput';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Phosphorm/Components/NumberInput',
    component: NumberInput,
} as Meta<typeof NumberInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof NumberInput> = args => {
    const [value, setValue] = React.useState(0);
    return <NumberInput {...args} value={value} onChange={(_, value) => setValue(value)} />;
};

export const Number = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Number.args = {
    name: 'numInput',
    label: 'Numeric',
};
