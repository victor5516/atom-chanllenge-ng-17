import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-confirm-dialog",
    standalone: true,
    imports: [
        MatDialogModule,
        MatButton,
        CommonModule
    ],
    templateUrl: "./confirm-dialog.component.html",
    styleUrl: "./confirm-dialog.component.scss"
})
export class ConfirmDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
    onNoClick(): void {
        this.dialogRef.close(false);
    }

    onYesClick(): void {
        this.dialogRef.close(true);
    }
}
