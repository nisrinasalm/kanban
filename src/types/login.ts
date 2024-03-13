export type User = {
    _id: string;
    email: string;
    username: string;
    name: string;
    language: string;
    isVerified: boolean;
};

export type WithToken = {
    accessToken: string;
}

export type LoginForm = {
    email: string;
    password: string;
}

export type LoginResponse = {
    user: User;
}