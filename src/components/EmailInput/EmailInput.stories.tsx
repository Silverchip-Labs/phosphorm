import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import EmailInput from './EmailInput';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Phosphorm/Components/EmailInput',
    component: EmailInput,
} as Meta<typeof EmailInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof EmailInput> = args => {
    const [value, setValue] = React.useState('');
    return <EmailInput {...args} value={value} onChange={(_, value) => setValue(value)} />;
};

export const Email = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Email.args = {
    name: 'Email',
    label: 'Email',
};
