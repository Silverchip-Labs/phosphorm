import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import TextInput from './TextInput';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Phosphorm/Components/TextInput',
    component: TextInput,
} as Meta<typeof TextInput>;

/**
 *
 * This is a test
 */
const Template: StoryFn<typeof TextInput> = args => {
    const [value, setValue] = React.useState('');
    return <TextInput {...args} value={value} onChange={(_, value) => setValue(value)} />;
};

/**
 * A standard text input, shouldn't be used for passwords, emails, numbers, etc.
 */
export const HelloWorld = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
HelloWorld.args = {
    name: 'textInput',
    label: 'Textual',
};
