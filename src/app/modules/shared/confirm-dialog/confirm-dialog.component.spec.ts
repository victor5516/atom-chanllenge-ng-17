import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";

import { ConfirmDialogComponent } from "./confirm-dialog.component";

describe("ConfirmDialogComponent", () => {
    let component: ConfirmDialogComponent;
    let fixture: ComponentFixture<ConfirmDialogComponent>;
    let mockDialogRef: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;

    beforeEach(async () => {
        mockDialogRef = jasmine.createSpyObj("MatDialogRef", ["close"]);

        await TestBed.configureTestingModule({
            imports: [ConfirmDialogComponent, MatDialogModule, CommonModule],
            providers: [
                { provide: MatDialogRef, useValue: mockDialogRef },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: { message: "Are you sure?" }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ConfirmDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should call dialogRef.close with false when onNoClick is called", () => {
        component.onNoClick();
        expect(mockDialogRef.close).toHaveBeenCalledWith(false);
    });

    it("should call dialogRef.close with true when onYesClick is called", () => {
        component.onYesClick();
        expect(mockDialogRef.close).toHaveBeenCalledWith(true);
    });
});
