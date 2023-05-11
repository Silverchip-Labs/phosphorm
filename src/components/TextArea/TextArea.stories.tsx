import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import TextArea from './TextArea';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Phosphorm/Components/TextArea',
    component: TextArea,
} as Meta<typeof TextArea>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof TextArea> = args => {
    const [value, setValue] = React.useState('');
    return <TextArea {...args} value={value} onChange={(_, value) => setValue(value)} />;
};

export const Area = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Area.args = {
    name: 'textInput',
    label: 'Textual',
};
