import { TestBed } from '@angular/core/testing';

import { FakeSalespersonsApi } from './fake-salespersons.api';

describe('FakeSalespersonsApi', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: FakeSalespersonsApi = TestBed.get(FakeSalespersonsApi);
        expect(service).toBeTruthy();
    });
});
