import { Routes } from "@angular/router";
import { UdemyComponent } from "./udemy.component";

const UDEMY_ROUTES: Routes = [
    {
        path: '', component: UdemyComponent, children: [
            { path: '', redirectTo: 'buy', pathMatch: 'full' },
            { path: 'buy', loadComponent: () => import('./buy-courses/buy-courses.component').then(c => c.BuyCoursesComponent) },
            { path: 'add', loadComponent: () => import('./create-course/create-course.component').then(c => c.CreateCourseComponent) },
            { path: 'purchase', loadComponent: () => import('./purchase-courses/purchase-courses.component').then(c => c.PurchaseCoursesComponent) },
            { path: 'update', loadComponent: () => import('./update-profile/update-profile.component').then(c => c.UpdateProfileComponent) },

        ]
    },
];

export default UDEMY_ROUTES;