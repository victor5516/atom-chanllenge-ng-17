import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { By } from "@angular/platform-browser";

import { SubmitButtonComponent } from "./submit-button.component";

describe("SubmitButtonComponent", () => {
    let component: SubmitButtonComponent;
    let fixture: ComponentFixture<SubmitButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatButtonModule, MatProgressSpinnerModule, SubmitButtonComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SubmitButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should display the provided text when not loading", () => {
        component.text = "Submit";
        component.loading = false;
        fixture.detectChanges();

        const buttonElement = fixture.debugElement.query(By.css("button"));
        expect(buttonElement.nativeElement.textContent.trim()).toBe("Submit");
    });

    it("should display the spinner when loading", () => {
        component.loading = true;
        fixture.detectChanges();

        const spinnerElement = fixture.debugElement.query(By.css("mat-progress-spinner"));
        expect(spinnerElement).toBeTruthy();
    });

    it("should disable the button when disabled input is true", () => {
        component.disabled = true;
        fixture.detectChanges();

        const buttonElement = fixture.debugElement.query(By.css("button"));
        expect(buttonElement.nativeElement.disabled).toBe(true);
    });

    it("should disable the button when loading is true", () => {
        component.loading = true;
        fixture.detectChanges();

        const buttonElement = fixture.debugElement.query(By.css("button"));
        expect(buttonElement.nativeElement.disabled).toBe(true);
    });

    it("should apply the correct color to the button", () => {
        component.color = "accent";
        fixture.detectChanges();

        const buttonElement = fixture.debugElement.query(By.css("button"));
        expect(buttonElement.nativeElement.classList).toContain("mat-accent");
    });

    it("should show the spinner and hide the text when loading is true", () => {
        component.text = "Submit";
        component.loading = true;
        fixture.detectChanges();

        const buttonElement = fixture.debugElement.query(By.css("button"));
        const spinnerElement = fixture.debugElement.query(By.css("mat-progress-spinner"));

        expect(spinnerElement).toBeTruthy();
        expect(buttonElement.nativeElement.textContent.trim()).toBe("");
    });

    it("should hide the spinner and show the text when loading is false", () => {
        component.text = "Submit";
        component.loading = false;
        fixture.detectChanges();

        const buttonElement = fixture.debugElement.query(By.css("button"));
        const spinnerElement = fixture.debugElement.query(By.css("mat-progress-spinner"));

        expect(spinnerElement).toBeFalsy();
        expect(buttonElement.nativeElement.textContent.trim()).toBe("Submit");
    });
});
