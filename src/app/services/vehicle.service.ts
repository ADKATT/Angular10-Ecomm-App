import { Injectable } from '@angular/core';
import { map, shareReplay, switchMap, tap, mergeMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, throwError, timer } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Vehicle } from '../interfaces/vehicle';

function clone(data: any): any {
    return JSON.parse(JSON.stringify(data));
}

function delayResponse<T>(input: Observable<T>, time = 500): Observable<T> {
    return timer(time).pipe(mergeMap(() => input));
}

let lastId = 0;

export interface VehicleDef {
    year: number | [number, number];
    make: string;
    model: string;
    engine: string;
}

function makeVehicles(defs: VehicleDef[]): Vehicle[] {
    return defs.map(def => {
        const range = typeof def.year === 'number' ? [def.year, def.year] : def.year;
        const years = [];

        for (let i = range[0]; i <= range[1]; i++) {
            years.push(i);
        }

        return years.map(year => ({
            id: ++lastId,
            year,
            make: def.make,
            model: def.model,
            engine: def.engine,
        }));
    }).reduce((acc, v) => [...acc, ...v], []);
}

const vehiclesDef: VehicleDef[] = [
    {
        year: 2011,
        make: 'Ford',
        model: 'Focus S',
        engine: '2.0L 1742DA L4 FI Turbo',
    },
    {
        year: 2019,
        make: 'Audi',
        model: 'Q7 Premium',
        engine: '3.0L 5626CC L6 QK',
    },
    {
        year: 2015,
        make: 'Kia',
        model: 'Rio LX',
        engine: '1.6L 8306JK L5 RL',
    },
    {
        year: 2008,
        make: 'BMW',
        model: 'M5',
        engine: '5.0L 8351XZ V10 DB',
    },
    {
        year: [2008, 2018],
        make: 'Alfa Romeo',
        model: '4C',
        engine: '1.7L 1742CC L4 FI Turbo',
    },
    {
        year: [2008, 2018],
        make: 'Aston Martin',
        model: 'DB11',
        engine: '5.2L 5204CC V12 FI Turbo',
    },
    {
        year: [2008, 2018],
        make: 'Dodge',
        model: 'Challenger GT',
        engine: '3.6L 3604CC V6 FI',
    },
    {
        year: [2008, 2018],
        make: 'Lexus',
        model: 'LS460',
        engine: '4.6L 4608CC V8 FI',
    },
    {
        year: [2008, 2018],
        make: 'Nissan',
        model: 'Juke S',
        engine: '1.6 1618CC L4 FI Turbo',
    },
];

export const vehicles: Vehicle[] = makeVehicles(vehiclesDef);

export const userVehicles: Vehicle[] = vehicles.slice(0, 3);

export function getYears(): Observable<number[]> {
    const result: number[] = [];
    vehicles.forEach(vehicle => {
        if (result.indexOf(vehicle.year) === -1) {
            result.push(vehicle.year);
        }
    });
    return timer(750).pipe(map(() => result.sort()));
}

export function getMakes(year: number): Observable<string[]> {
    const result: string[] = [];
    vehicles.filter(x => x.year === year).forEach(vehicle => {
        if (result.indexOf(vehicle.make) === -1) {
            result.push(vehicle.make);
        }
    });
    return timer(750).pipe(map(() => result.sort()));
}

export function getModels(year: number, make: string): Observable<string[]> {
    const result: string[] = [];
    vehicles.filter(x => x.year === year && x.make === make).forEach(vehicle => {
        if (result.indexOf(vehicle.model) === -1) {
            result.push(vehicle.model);
        }
    });
    return timer(750).pipe(map(() => result.sort()));
}

export function getVehicles(year: number, make: string, model: string): Observable<Vehicle[]> {
    const result = vehicles.filter(x => x.year === year && x.make === make && x.model === model);
    return timer(750).pipe(map(() => result.sort()));
}

export function getVehicleByVin(vin: string): Observable<Vehicle> {
    vin = vin.trim();
    const vehicle = vehicles.find(x => x.model === 'Focus S');
    if (vin === '' || vin === 'error' || !vehicle) {
        return throwError(new HttpErrorResponse({status: 404, statusText: 'Page Not Found'}));
    }
    return of(vehicle);
}

export function getUserVehicles(): Observable<Vehicle[]> {
    return of(clone(userVehicles));
}

export function addUserVehicles(vehicleId: number): Observable<void> {
    const index = userVehicles.findIndex(x => x.id === vehicleId);
    const vehicle = vehicles.find(x => x.id === vehicleId);

    if (vehicle && index === -1) {
        userVehicles.push(vehicle);
    }

    return delayResponse(of(null));
}

export function removeUserVehicles(vehicleId: number): Observable<void> {
    const index = userVehicles.findIndex(x => x.id === vehicleId);

    if (index !== -1) {
        userVehicles.splice(index, 1);
    }

    return delayResponse(of(null));
}

@Injectable({
    providedIn: 'root',
})
export class VehicleService {
    private reloadUserVehicles: BehaviorSubject<void> = new BehaviorSubject<void>(null);

    private currentVehicleSubject: BehaviorSubject<Vehicle> = new BehaviorSubject<Vehicle>(null);
    
    userVehicles$: Observable<Vehicle[]> = this.reloadUserVehicles.pipe(
        switchMap(() => getUserVehicles()),
        shareReplay(1),
    );

    currentVehicle$: Observable<Vehicle> = this.currentVehicleSubject.pipe(
        switchMap(currentVehicle => this.userVehicles$.pipe(
            map(vehicles => vehicles.find(x => currentVehicle && x.id === currentVehicle.id) || null),
        )),
    );

    constructor() {
        //super();
    }

    getYears(): Observable<number[]> {
        return getYears();
    }

    getMakes(year: number): Observable<string[]> {
        return getMakes(year);
    }

    getModels(year: number, make: string): Observable<string[]> {
        return getModels(year, make);
    }

    getVehicles(year: number, make: string, model: string): Observable<Vehicle[]> {
        return getVehicles(year, make, model);
    }

    getVehicleByVin(vin: string): Observable<Vehicle> {
        return getVehicleByVin(vin);
    }

    addUserVehicle(vehicleId: number): Observable<void> {
        return addUserVehicles(vehicleId).pipe(
            tap(() => this.reloadUserVehicles.next()),
        );
    }

    removeUserVehicle(vehicleId: number): Observable<void> {
        return removeUserVehicles(vehicleId).pipe(
            tap(() => this.reloadUserVehicles.next()),
        );
    }

    setCurrentVehicle(vehicle: Vehicle): void {
        this.currentVehicleSubject.next(vehicle);
    }
}
