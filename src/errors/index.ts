export class LordOfRingError extends Error {
    name: string = "LordOfRingError";
    status: number = 500;
}

export class RateLimitError extends LordOfRingError {
    name: string = "RateLimitError";
    status: number = 429;
}

export class LordRingValidationError extends LordOfRingError {
    name: string = "LordRingValidationError";
    status: number = 400;
}

export class LordRingUnauthorizeError extends LordOfRingError {
    name: string = "LordRingUnauthorizeError";
    status: number = 401;
}
