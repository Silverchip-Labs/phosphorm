import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import ActionButton from './ActionButton';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Phosphorm/Components/ActionButton',
    component: ActionButton,
} as Meta<typeof ActionButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof ActionButton> = args => (
    <ActionButton {...args}>Action!</ActionButton>
);

export const HelloWorld = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
HelloWorld.args = {
    onClick: () => alert('Hello world!'),
};

export const ClickMe = Template.bind({});
ClickMe.args = {
    children: 'Click me!',
};
