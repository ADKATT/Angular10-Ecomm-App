import { Injectable } from '@angular/core';
import { map, shareReplay, switchMap, tap, mergeMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, throwError, timer } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Country } from '../interfaces/country';

const countries: Country[] = [
    {code: 'RAND', name: 'Random Federation'},
    {code: 'LAND', name: 'RandomLand'},
    {code: 'AU', name: 'Australia'},
    {code: 'DE', name: 'Germany'},
    {code: 'FR', name: 'France'},
    {code: 'IT', name: 'Italy'},
    {code: 'RU', name: 'Russia'},
    {code: 'UA', name: 'Ukraine'},
    {code: 'US', name: 'United States'},
];

function clone(data: any): any {
    return JSON.parse(JSON.stringify(data));
}

export function getCountries(): Observable<Country[]> {
    return of(clone(countries));
}

export abstract class CountriesApi {
    abstract getCountries(): Observable<Country[]>;
}

@Injectable({
    providedIn: 'root'
})
export class CountriesService {

    constructor() { }

    getCountries(): Observable<Country[]> {
        return getCountries();
    }
}
