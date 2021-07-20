import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogNewRequestComponent } from '../dialog-new-request/dialog-new-request.component';

@Component({
    selector: 'app-dialog-type-user',
    templateUrl: './dialog-type-user.component.html',
    styleUrls: ['./dialog-type-user.component.scss']
})
export class DialogTypeUserComponent implements OnInit {

    constructor(public dialog: MatDialog) { }

    ngOnInit(): void {
    }

    openDialog() {
        const dialogRef = this.dialog.open(DialogNewRequestComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

}
