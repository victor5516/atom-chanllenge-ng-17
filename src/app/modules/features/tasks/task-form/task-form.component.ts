import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { Task } from "../../../../models/task.model";
import { DialogService } from "../../../../services/dialog.service";
import { TaskService } from "../../../../services/task.service";
import { SubmitButtonComponent } from "../../../shared/submit-button/submit-button.component";

@Component({
    selector: "app-task-form",
    standalone: true,
    imports: [
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        HttpClientModule,
        CommonModule,
        SubmitButtonComponent
    ],
    providers: [TaskService],
    templateUrl: "./task-form.component.html",
    styleUrl: "./task-form.component.scss"
})
export class TaskFormComponent {
    title: string = "";
    description: string = "";
    loading: boolean = false;
    @Output() taskAdded = new EventEmitter<any>();

    constructor(private taskService: TaskService, private dialogService: DialogService) {}

    onAddTask(form: NgForm) {
        this.loading = true;
        if (form.invalid) {
            this.dialogService.openInfoDialog("Debe completar los campos para crear una tarea");
            return;
        }
        const newTask:Partial<Task> = {
            title: this.title,
            description: this.description,
        };
        this.taskService.createTask(newTask).subscribe({
            next: (response) => {
                this.taskAdded.emit(response.result);
                this.title = "";
                this.description = "";
            },
            error: () => {
                this.dialogService.openInfoDialog("Error al crear la tarea");
                this.loading = false;
            },
            complete: () => {
                this.loading = false;
            }

        });
    }
}
