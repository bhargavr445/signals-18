import { provideZonelessChangeDetection } from "@angular/core";
import { TestBed } from '@angular/core/testing';
import { vehicleInitialState, VehicleStore } from "./vehicle-store";
import { VehicleService } from "../../commons/services/api/vehicle.service";
import { of, throwError } from "rxjs";
import { vResp } from "./mock-data/veh-resp";

/* fdescribe('testing vehicle store', () => {

    let vehicleStore: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideZonelessChangeDetection()],

        });
        vehicleStore = TestBed.inject(VehicleStore);
    });


    it('testing initial state', () => {
        expect(vehicleInitialState).toEqual({
            vehiclesCount: 10,
            vehiclesList: { Count: null, Message: '', SearchCriteria: '', Results: [] }
        })
    });

}); */

/* fdescribe('testing vehicle store', () => {
    let vehicleStore: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideZonelessChangeDetection()],

        });
        vehicleStore = TestBed.inject(VehicleStore);
    });


    it('testing initial state', () => {
        expect(vehicleInitialState).toEqual({
            vehiclesCount: 10,
            vehiclesList: { Count: null, Message: '', SearchCriteria: '', Results: [] }
        })
    });

    it('should update vehicles count', () => {
        vehicleStore.updateCount()
        expect(vehicleStore.vehiclesCountC()).toBe(20)
    });

}); */

fdescribe('testing vehicle store', () => {
    let vehicleStore: any;
    let vehicleService: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [],
        });
        vehicleStore = TestBed.inject(VehicleStore);
        vehicleService = TestBed.inject(VehicleService);
    });

    it('testing initial state', () => {
        expect(vehicleInitialState).toEqual({
            _vehiclesCount: 10,
            _vehiclesList: { Count: null, Message: '', SearchCriteria: '', Results: [] },
            _vehicleListApiErrorResponse: null
        })
    });

    it('should update vehicles count sync function', () => {
        vehicleStore.updateCount()
        expect(vehicleStore.vehiclesCountC()).toBe(20)
    });

    it('should update vehicles count', () => {
        spyOn(vehicleService, 'getVehicleData').and.returnValue(of(null));
        vehicleStore.loadVehicles();
        expect(vehicleStore.vehiclesListC()).toBe(null);
        expect(vehicleStore.vehiclesListApiErrorC()).toBe(null);
    });

    it('should update vehicles count', () => {
        spyOn(vehicleService, 'getVehicleData').and.returnValue(of(vResp));
        vehicleStore.loadVehicles();
        expect(vehicleStore.vehiclesListC().Results.length).toBe(2);
        expect(vehicleStore.vehiclesListC().Message).toBe("Response returned successfully");
        expect(vehicleStore.vehiclesListApiErrorC()).toBe(null);
    });

    it('should update vehicles count', () => {
        spyOn(vehicleService, 'getVehicleData').and.returnValue(throwError(() => 'API Failed'));
        vehicleStore.loadVehicles();
        expect(vehicleStore.vehiclesListC()).toBe(null);
        expect(vehicleStore.vehiclesListApiErrorC()).toBe('API Failed');
    });

});
