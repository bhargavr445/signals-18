import { Routes } from "@angular/router";



const VEHICLE_ROUTES: Routes = [
    {
        path: '', loadComponent: () => import('./vehicle').then(m => m.Vehicle), children: [
            { path: '', redirectTo: 'roster', pathMatch: 'full' },
            { path: 'roster', loadComponent: () => import('./Components/vehicle-overview/vehicle-overview').then(c => c.VehicleOverview) },
            { path: 'details/:custid', loadComponent: () => import('./Components/vehicle-details/vehicle-details.component').then(c => c.VehicleDetailsComponent) }
        ]
    },

];

export default VEHICLE_ROUTES;

// 1.52 kB | 