export type LoginRequest = {
    username: string;
    password: string;
};

export type LoginResponse = {
    access_token: string;
    success: boolean;
}

export type RegisterRequest = {
    full_name: string;
    username: string;
    password: string;
};