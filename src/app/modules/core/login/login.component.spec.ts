import { HttpClientTestingModule } from "@angular/common/http/testing";
import {
    ComponentFixture, TestBed
} from "@angular/core/testing";
import { FormsModule, NgForm } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";

import { DialogService } from "../../../services/dialog.service";
import { UserService } from "../../../services/user.service";
import { LoginComponent } from "./login.component";

describe("LoginComponent", () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
        const userServiceSpy = jasmine.createSpyObj("UserService", ["createUser", "getUserByEmail"]);
        const dialogServiceSpy = jasmine.createSpyObj("DialogService", ["openDialog"]);
        const routerSpy = jasmine.createSpyObj("Router", ["navigate"]);

        await TestBed.configureTestingModule({
            imports: [
                FormsModule,
                MatInputModule,
                MatFormFieldModule,
                MatButtonModule,
                MatCardModule,
                MatCheckboxModule,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                LoginComponent
            ],
            providers: [
                { provide: UserService, useValue: userServiceSpy },
                { provide: DialogService, useValue: dialogServiceSpy },
                { provide: Router, useValue: routerSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should call handleUserExistence if form is valid", () => {
        spyOn(component, "handleUserExistence");
        const form = new NgForm([], []);
        form.form.setErrors(null);

        component.onLogin(form);

        expect(component.handleUserExistence).toHaveBeenCalledWith(component.email);
    });
});
