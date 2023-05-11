import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import PasswordInput from './PasswordInput';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Phosphorm/Components/PasswordInput',
    component: PasswordInput,
} as Meta<typeof PasswordInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof PasswordInput> = args => {
    const [value, setValue] = React.useState('');
    return <PasswordInput {...args} value={value} onChange={(_, value) => setValue(value)} />;
};

export const Password = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Password.args = {
    name: 'Password',
    label: 'Password',
};
