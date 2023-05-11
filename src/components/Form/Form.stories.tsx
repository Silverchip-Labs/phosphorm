import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import Form from './Form';
import Title from '../Typography/Title';
import {
    DatePicker,
    TextArea,
    TextInput,
    Checkbox,
    EmailInput,
    PasswordInput,
    Radio,
    NumberInput,
    Select,
    MultiSelect,
} from '../index';
import { useForm } from '../../index';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Phosphorm/Form',
    component: Form,
} as Meta<typeof Form>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Form> = args => {
    const termsURL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    const [formData, handleChange] = useForm({
        textInput: '',
        email: '',
        password: '',
        textArea: '',
        number: 0,
        select: null,
        multiSelect: [],
        radio: null,
        checkbox: false,
        toggleSwitch: false,
        datePicker: new Date(1993, 2, 3),
    });
    console.log({ formData });
    return (
        <Form {...args}>
            <Title>Form Example</Title>
            <TextInput
                label="Name"
                name="textInput"
                value={formData.textInput}
                onChange={handleChange}
            />
            <EmailInput
                name="email"
                value={formData.email}
                onChange={handleChange}
                label={'Email'}
            />
            <PasswordInput
                name="password"
                value={formData.password}
                onChange={handleChange}
                label="Password"
            />
            <TextArea
                label="Describe your self"
                name="textArea"
                value={formData.textArea}
                onChange={handleChange}
            />
            <DatePicker
                name={'datePicker'}
                value={formData.datePicker}
                onChange={handleChange}
                label="Date of birth"
            />
            <NumberInput
                name="number"
                value={formData.number}
                onChange={handleChange}
                label="How many? "
            />
            <Radio
                name={'radio'}
                value={formData.radio}
                onChange={handleChange}
                label="What's your favorite direction?"
                options={sampleOptions}
            />
            <Select
                name="select"
                value={formData.select}
                onChange={handleChange}
                label="What's your favourite direction?"
                options={sampleOptions}
            />
            <MultiSelect
                options={sampleOptions}
                name="multiSelect"
                value={formData.multiSelect}
                onChange={handleChange}
            />
            <Checkbox
                name={'checkbox'}
                value={formData.checkbox}
                onChange={handleChange}
                label={
                    <span>
                        I agree to the <a href={termsURL}>terms and conditions</a>
                    </span>
                }
            />
        </Form>
    );
};

export const FormExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FormExample.args = {
    onSubmit: () => alert('Form submitted!'),
    onCancel: () => alert('Form cancelled!'),
    onSuccess: () => alert('Form success!'),
};

const sampleOptions = [
    { label: 'Up', value: 1 },
    { label: 'Down', value: 2 },
    { label: 'Left', value: 3 },
    { label: 'Right', value: 4 },
];
