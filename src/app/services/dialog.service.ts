import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { DialogData } from "../models/dialog.model";
import { ConfirmDialogComponent } from "../modules/shared/confirm-dialog/confirm-dialog.component";

@Injectable({
    providedIn: "root"
})
export class DialogService {
    constructor(private dialog: MatDialog) {}

    openDialog(data: DialogData) {
        return this.dialog.open(ConfirmDialogComponent, {
            width: "300px",
            data
        }).afterClosed();
    }

    openInfoDialog(message: string) {
        return this.dialog.open(ConfirmDialogComponent, {
            width: "300px",
            data: {
                title: "Información",
                message,
                buttons: [
                    { text: "OK", color: "primary", result: true }
                ]
            }
        }).afterClosed();
    }
}
