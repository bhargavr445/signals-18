export interface AccountTypeI {
    id: string;
    type: string;
}

export interface CategorysI {
    type: string;
    code: string;
}

export interface AccountTypeResponseI {
    data: AccountTypeI[];
    status: number
}

export interface CategorysResponseI {
    data: CategorysI[];
    status: number
}


