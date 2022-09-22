export function getErrorResponse(response: any) {
    const error = response.response.data.error;
    return error.details ?? error.message;
}
