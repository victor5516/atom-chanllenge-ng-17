import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Component, OnDestroy } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Router } from "@angular/router";
import { of, Subject } from "rxjs";
import { catchError, switchMap, takeUntil } from "rxjs/operators";

import { DialogService } from "../../../services/dialog.service";
import { UserService } from "../../../services/user.service";
import { HeaderComponent } from "../../shared/header/header.component";
import { SubmitButtonComponent } from "../../shared/submit-button/submit-button.component";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCheckboxModule,
        HeaderComponent,
        MatCardModule,
        FormsModule,
        CommonModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        SubmitButtonComponent

    ],
    providers: [UserService],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss"
})
export class LoginComponent implements OnDestroy {
    email: string = "";
    loading: boolean = false;
    private destroy$ = new Subject<void>();

    constructor(
        private userService: UserService,
        private router: Router,
        private dialogService: DialogService,
    ) {}

    openConfirmDialog() {
        return this.dialogService.openDialog({
            title: "Confirmación",
            message: `¿Está seguro de que desea crear este usuario con email ${this.email}?`,
            buttons: [
                { text: "No", result: false },
                { text: "Sí", color: "primary", result: true }
            ]
        });
    }

    createUser(email: string) {
        this.loading = true;
        this.userService.createUser({ email }).subscribe({
            next: (response) => {
                if (response.statusCode === 201) {
                    this.router.navigate(["/home"]);
                }
            },
            error: () => {
                this.dialogService.openInfoDialog("Error al crear el usuario");
            },
            complete: () => {
                this.loading = false;
            }
        });
    }

    handleUserExistence(email: string) {
        this.loading = true;
        this.userService.getUserByEmail(email).pipe(
            switchMap((response) => {
                if (response.statusCode === 200) {
                    this.router.navigate(["/home"]);
                    return of(null);
                }
                return of(true);
            }),
            catchError((error) => {
                if (error.status === 404) {
                    return this.openConfirmDialog();
                }
                this.dialogService.openInfoDialog("Error al iniciar sesión");
                return of(false);
            }),
            takeUntil(this.destroy$)
        ).subscribe((result) => {
            if (result) {
                this.createUser(email);
            } else {
                this.email = "";
                this.loading = false;
            }
        });
    }

    onLogin(form: NgForm): void {
        if (form.invalid) {
            this.dialogService.openInfoDialog("Debe completar los campos para iniciar sesión");
            return;
        }
        this.handleUserExistence(this.email);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
