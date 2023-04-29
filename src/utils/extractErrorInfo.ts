import {ValidationError} from "class-validator";

export function extractErrorInfo(errors: ValidationError[]) {
    const errorInfo = [];
    for (const error of errors) {
        const constraints = error.constraints;
        if (constraints) {
            const constraintValues = Object.values(constraints);
            errorInfo.push(...constraintValues);
        }
    }
    return errorInfo.join(', ');
}
