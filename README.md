# Phosphorm

## Storybook
Here's a link the the (nicer) docs on Storybook: [Phosphorm Storybook](https://silverchip-labs.github.io/phosphorm/)

## Usage
Wrap your app in the `PhosphormProvider` component, and pass in error handling functions for any of the form submission
errors you wish to handle, for example, use the `onUnauthorized` function to handle 401 errors and trigger a logout.

## Error handling
The package is built with the intention of handling API errors from a .NET Web API using FluentValidation for request validation.
The expected shape of API errors is as follows:
```json5
{
    message: 'string',
    response: {
        status: 'number',
        // Data property can also be a string for non-field specific errors.
        data: {
            errors: {
                // field errors can be a string or an array of strings if there's multiple problems 
                'field1': 'error',
                'field2': ['error1', 'error2'],
            }
        }
    }
}
```
To use, pass the error response into the Form component's apiError prop.
React Query example below:
```jsx
const { error, mutate } = useMutation(
    () => axios.post('/api/endpoint', data)
);
return (
    <Form apiError={error} onSubmit={mutate}>
        <TextInput name="field1"/>    
    </Form>
)
```
The field error will be extracted from the apiError prop, and retrieved by the form input (Form provides Context to child form inputs) via the 'name' prop.
To use the Phosphorm Form's error handling in your own components, use the `useFieldValidation` hook.

## Styling
The library provides a stylesheet that can be imported and used for styling the components.
If desired, bring in the stylesheet using 
```js
import 'phosphorm/dist/phosphorm.css';
```

This project is bootstrapped from [blog & video tutorial](https://dev.to/alexeagleson/how-to-create-and-publish-a-react-component-library-2oe) on how to create and publish your own component library.

