import { Routes } from "@angular/router";

import { inject } from "@angular/core";
import { AuthService } from "../commons/services/api/auth.service";
import { Buy } from "./buy-courses/buy";

const UDEMY_ROUTES: Routes = [
    {
        path: '', loadComponent: () => import('./udemy.component').then(m => m.UdemyComponent), children: [
            { path: '', redirectTo: () => inject(AuthService).userProfileComputed().role == 'U_INSTRUCTOR' ? 'add' : 'buy', pathMatch: 'full' },
            { path: 'buy', loadComponent: () => import('./buy-courses/buy-courses.component').then(c => c.BuyCoursesComponent) },
            { path: 'add', loadComponent: () => import('./create-course/create-course.component').then(c => c.CreateCourseComponent) },
            { path: 'purchase', loadComponent: () => import('./purchase-courses/purchase-courses.component').then(c => c.PurchaseCoursesComponent) },
            { path: 'update', loadComponent: () => import('./update-profile/update-profile.component').then(c => c.UpdateProfileComponent) },
        ]
    },
];

export default UDEMY_ROUTES;