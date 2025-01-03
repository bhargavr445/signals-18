import { Routes } from "@angular/router";

import { inject } from "@angular/core";
import { AuthService } from "../commons/services/api/auth.service";

const UDEMY_ROUTES: Routes = [
    {
        path: '', loadComponent: () => import('./udemy').then(m => m.Udemy), children: [
            { path: '', redirectTo: () => inject(AuthService).userProfileComputed().role == 'U_INSTRUCTOR' ? 'add' : 'buy', pathMatch: 'full' },
            { path: 'buy', loadComponent: () => import('./buy-courses/buy-courses').then(c => c.BuyCourses) },
            { path: 'add', loadComponent: () => import('./create-course/create-course').then(c => c.CreateCourse) },
            { path: 'purchase', loadComponent: () => import('./purchase-courses/purchase-courses').then(c => c.PurchaseCourses) },
            { path: 'update', loadComponent: () => import('./update-profile/update-profile').then(c => c.UpdateProfile) },
        ]
    },
];

export default UDEMY_ROUTES;