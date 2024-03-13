export type RegisterForm = {
    username: string;
    name: string;
    email: string;
    password: string;
    language: string;
}

export type RegisterResponse = {
    resultMessage: {
        en: string;
    };
    resultCode: string;
}