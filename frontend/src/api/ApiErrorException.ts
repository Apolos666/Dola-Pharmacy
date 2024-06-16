export class BadRequestError extends Error {
    constructor(message = "Bad Request") {
        super(message);
        this.name = "BadRequestError";
    }
}

export class ConflictError extends Error {
    constructor(message = "Conflict") {
        super(message);
        this.name = "ConflictError";
    }
}

export class UnauthorizedError extends Error {
    constructor(message = "Unauthorized") {
        super(message);
        this.name = "UnauthorizedError";
    }
}

export class EmailNotVerifiedError extends Error {
    constructor(message = "Email chưa được xác thực, vui lòng kiểm tra email của bạn và xác thực email trước khi đăng nhập") {
        super(message);
        this.name = "EmailNotVerifiedError";
    }
}

export class SystemError extends Error {
    constructor(message = "Có lỗi xảy ra ở bên hệ thống") {
        super(message);
        this.name = "SystemError";
    }
}

export class UnknownError extends Error {
    constructor(message = "Có lỗi xảy ra, chúng tôi đang khắc phục") {
        super(message);
        this.name = "UnknownError";
    }
}