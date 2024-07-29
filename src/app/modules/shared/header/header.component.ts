import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [
        NgOptimizedImage,
        CommonModule,
        MatButtonModule
    ],
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
    @Input() showLogoutButton: boolean = false;

    constructor(private router: Router) {}

    logout(): void {
        this.router.navigate(["/login"]);
    }
}
