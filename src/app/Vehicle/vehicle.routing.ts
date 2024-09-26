import { Routes } from "@angular/router";
import { VehicleComponent } from "./vehicle.component";


const VEHICLE_ROUTES: Routes = [
    {
        path: '', component: VehicleComponent, children: [
            { path: '', redirectTo: 'roster', pathMatch: 'full' },
            { path: 'roster', loadComponent: () => import('./Components/vehicle-overview/vehicle-overview.component').then(c => c.VehicleOverviewComponent) },
            { path: 'details/:custid', loadComponent: () => import('./Components/vehicle-details/vehicle-details.component').then(c => c.VehicleDetailsComponent) }
        ]
    },

];

export default VEHICLE_ROUTES;

// 1.52 kB | 