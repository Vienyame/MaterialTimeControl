
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { WTimeDialogComponent } from '../w-time-dialog/w-time-dialog.component';
import { ITime } from '../w-clock/w-clock.component';

@Component({
    selector: 'w-mat-timepicker',
    styleUrls: ['./w-mat-timepicker.component.scss'],
    templateUrl: './w-mat-timepicker.component.html'
})

export class WMatTimePickerComponent implements OnInit {

    @Input() userTime: ITime;
    @Output() userTimeChange: EventEmitter<ITime> = new EventEmitter();

    @Input() color: string;

    constructor(private dialog: MatDialog) { }

    ngOnInit() {

        if (!this.userTime) {

            this.userTime = {

                hour: 10,
                minute: 25,
                meriden: 'PM'
            }
        }
    }

    private get time(): string {

        if (!this.userTime) {
            return '';
        }

        if (this.userTime.minute === 0) {
            return `${this.userTime.hour}:00 ${this.userTime.meriden}`;

        } else if (this.userTime.minute < 10) {

            const tt = '0' + String(this.userTime.minute);
            return `${this.userTime.hour}:${tt} ${this.userTime.meriden}`;

        } else {
            return `${this.userTime.hour}:${this.userTime.minute} ${this.userTime.meriden}`;
        }
    }


    public showPicker($event) {

        const dialogRef = this.dialog.open(WTimeDialogComponent, {

            data: {
                time: {
                    hour: this.userTime.hour,
                    minute: this.userTime.minute,
                    meriden: this.userTime.meriden
                },
                color: this.color
            }
        });

        dialogRef.afterClosed()
            .subscribe((result: ITime | -1) => {

                // result will be update userTime object or -1 or undefined (closed dialog w/o clicking cancel)
                if (result === undefined) {
                    return;
                } else if (result !== -1) {
                    this.userTime = result;
                    this.emituserTimeChange();
                }
            });
        return false;
    }

    private emituserTimeChange() {

        this.userTimeChange.emit(this.userTime);
    }
}
