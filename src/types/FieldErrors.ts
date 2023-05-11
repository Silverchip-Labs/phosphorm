export interface FieldErrorsObj {
    [key: string]: string;
}

export type FieldError = {
    name: string;
    value: string;
};

export interface APIError {
    message: string;
    response: APIErrorResponse;
}

interface APIErrorResponse {
    status: number;
    data: string | { errors: FieldErrorsObj };
}
