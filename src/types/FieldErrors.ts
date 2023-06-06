export type FieldErrorsObj = {
    [key: string]: string;
};

export type FieldError = {
    name: string;
    value: string;
};

export type APIError = {
    message: string;
    response: APIErrorResponse;
};

export type APIErrorResponse = {
    status: number;
    data: string | { errors: FieldErrorsObj };
};
