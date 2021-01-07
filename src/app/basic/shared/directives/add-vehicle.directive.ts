import { Directive, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subject } from 'rxjs';
//import { VehicleApi } from '../../../api/base';
import { VehicleService } from '../../../services/vehicle.service';
import { takeUntil } from 'rxjs/operators';


@Directive({
    selector: '[appAddVehicle]',
    exportAs: 'addVehicle',
})
export class AddVehicleDirective implements OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    inProgress = false;

    @Output() vehicleAdded: EventEmitter<number> = new EventEmitter<number>();

    constructor(
        private vehicleService: VehicleService,
    ) { }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    add(vehicleId: number): void {
        if (this.inProgress || !vehicleId) {
            return;
        }

        this.inProgress = true;
        this.vehicleService.addUserVehicle(vehicleId).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: () => this.vehicleAdded.emit(vehicleId),
            complete: () => this.inProgress = false,
        });
    }
}
