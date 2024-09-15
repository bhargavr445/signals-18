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

export interface UnEnrolledCourseApiResponseI {
    data: CourseI[];
    status: number;
}

export interface CourseI {
    categoryType: string;
    course_id: string;
    description: string;  
    price: string;
    title: string;
}

export interface UpdatedCourseI extends CourseI {
    isSelected: boolean;
}

