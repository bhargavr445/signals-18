import { ApiResponseI } from "../../commons/Interfaces/api-responseI";

export type AccountTypeResponseI = ApiResponseI<AccountTypeI[]>;

export type CategorysResponseI = ApiResponseI<CategorysI[]>;

export type UnEnrolledCourseApiResponseI = ApiResponseI<CourseI[]>;

export interface AccountTypeI {
    id: string;
    type: string;
}

export interface CategorysI {
    type: string;
    code: string;
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

export interface NavMenuItem {
    label: string;
    path: string;
    isActive: boolean;
    role?: U_ROLES;
  }
  
  export type U_ROLES = "U_INSTRUCTOR" | "U_STUDENT";

