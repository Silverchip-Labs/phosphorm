import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import Checkbox from './Checkbox';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Phosphorm/Components/Checkbox',
    component: Checkbox,
} as Meta<typeof Checkbox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Checkbox> = args => {
    const [value, setValue] = React.useState(false);
    return <Checkbox {...args} value={value} onChange={(_, value) => setValue(value)} />;
};

export const Password = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Password.args = {
    name: 'Checkbox',
    label: 'Checkbox',
};
