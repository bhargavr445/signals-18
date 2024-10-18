import { ApiResponseI } from "../../commons/Interfaces/api-responseI";

export type AccountTypeResponseI = ApiResponseI<AccountTypeI[]>;

export type CategorysResponseI = ApiResponseI<CategorysI[]>;

export type UnEnrolledCourseApiResponseI = ApiResponseI<CourseI[]>;

export type FetchAllCoursesI = ApiResponseI<PurchasedCourseI[]>;

export type CreateAPIRespI = ApiResponseI<CreaateCourseApiRespI>;

export interface AccountTypeI {
    id: string;
    type: string;
}

export interface CategorysI {
    type: string;
    code: string;
    _id?:  string;
    __v?: number;
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
  
export interface FetchCourses {
    data:   PurchasedCourseI[];
    status: number;
}

export interface PurchasedCourseI extends CourseI {
    _id:          string;
    createrId?:   string;
    __v?:         number;
    categorys:    CategorysI;
}
  
  export interface CreaateCourseApiRespI {
    n:         number;
    nModified: number;
    ok:        number;
  }

export interface CreateCoursePayloadI extends CourseI{

}



