import { Routes } from "@angular/router";
import { VehicleComponent } from "./vehicle.component";
import { VehicleOverviewComponent } from "./Components/vehicle-overview/vehicle-overview.component";
import { VehicleDetailsComponent } from "./Components/vehicle-details/vehicle-details.component";

export const VEHICLE_ROUTES: Routes = [
    {
        path: '', component: VehicleComponent, children: [
            { path: '', redirectTo: 'roster', pathMatch: 'full' },
            { path: 'roster', component: VehicleOverviewComponent },
            {path: 'details/:custid', component: VehicleDetailsComponent}
        ]
    },

];