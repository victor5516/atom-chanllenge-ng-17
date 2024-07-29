import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
    selector: "app-submit-button",
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
    template: `
    <button mat-raised-button [color]="color" [disabled]="disabled || loading">
      <ng-container *ngIf="!loading">{{ text }}</ng-container>
      <ng-container *ngIf="loading">
        <mat-progress-spinner mode="indeterminate" diameter="20"></mat-progress-spinner>
      </ng-container>
    </button>
  `,
    styles: [`
    button {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class SubmitButtonComponent {
    @Input() text: string = "Submit";
    @Input() loading: boolean = false;
    @Input() disabled: boolean = false;
    @Input() color: string = "primary";
}
