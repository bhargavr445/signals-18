export interface LoginResponseI {
    data:   Data;
    status: number;
}

export interface Data {
    user:  User;
    token: string;
}

export interface User {
    userName: string;
    role:     string;
}
