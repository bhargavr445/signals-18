import { U_ROLES } from "../udemy/interfaces/udemy-i";

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
    role:     U_ROLES;
}
