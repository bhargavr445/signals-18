import { Routes } from "@angular/router";
import { UdemyComponent } from "./udemy.component";
import { CreateCourseComponent } from "./create-course/create-course.component";
import { PurchaseCoursesComponent } from "./purchase-courses/purchase-courses.component";
import { UpdateProfileComponent } from "./update-profile/update-profile.component";
import { BuyCoursesComponent } from "./buy-courses/buy-courses.component";


// export const UDEMY_ROUTES: Routes = [
//     {
//         path: '', component: UdemyComponent, children: [
//             { path: '', redirectTo: 'buy', pathMatch: 'full' },
//             { path: 'buy', component: BuyCoursesComponent},
//             { path: 'add', component: CreateCourseComponent },
//             { path: 'purchase', component: PurchaseCoursesComponent },
//             { path: 'update', component: UpdateProfileComponent },
//         ]
//     },
// ];