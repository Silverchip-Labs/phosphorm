import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import DatePicker from './DatePicker';
import Form from '../Form';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Phosphorm/Components/DatePicker',
    component: DatePicker,
} as Meta<typeof DatePicker>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DatePicker> = args => {
    const [value, setValue] = React.useState<Date | null>(() => new Date());
    return (
        <Form onSubmit={() => alert(value)}>
            <div style={{ minHeight: '40vh' }}>
                <DatePicker {...args} value={value} onChange={(_, value) => setValue(value)} />
            </div>
        </Form>
    );
};

export const Picker = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Picker.args = {
    name: 'DatePicker',
    label: 'Pick a date, any date.',
};
