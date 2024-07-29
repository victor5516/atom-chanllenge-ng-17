import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { of, Subject } from "rxjs";
import {
    catchError, finalize, takeUntil, tap
} from "rxjs/operators";

import { Task } from "../../../../models/task.model";
import { DialogService } from "../../../../services/dialog.service";
import { TaskService } from "../../../../services/task.service";
import { ConfirmDialogComponent } from "../../../shared/confirm-dialog/confirm-dialog.component";
import { HeaderComponent } from "../../../shared/header/header.component";
import { TaskFormComponent } from "../task-form/task-form.component";
import { TaskItemComponent } from "../task-item/task-item.component";

@Component({
    selector: "app-task-list",
    standalone: true,
    imports: [
        CommonModule,
        HttpClientModule,
        MatCardModule,
        MatListModule,
        TaskItemComponent,
        TaskFormComponent,
        HeaderComponent,
        ConfirmDialogComponent,

    ],
    providers: [TaskService
    ],
    templateUrl: "./task-list.component.html",
    styleUrls: ["./task-list.component.scss"],
})
export class TaskListComponent implements OnInit, OnDestroy {
    tasks: Task[] = [];

    private destroy$ = new Subject<void>();

    constructor(
        private taskService: TaskService,
        public dialog: MatDialog,
        private dialogService: DialogService,
    ) {}

    ngOnInit(): void {
        this.loadTasks();
    }

    loadTasks(): void {
        this.taskService.getTasks().pipe(
            tap({
                next: (response) => { this.tasks = response.result; },
                error: (error) => {
                    if (error.status === 404) {
                        this.tasks = [];
                    }

                    return of([]);
                }
            }),
            takeUntil(this.destroy$)
        ).subscribe();
    }

    onTaskAdded(): void {
        this.loadTasks();
    }

    openConfirmDialog(message: string) {
        return this.dialogService.openDialog({
            title: "Confirmación",
            message,
            buttons: [
                { text: "No", result: false },
                { text: "Sí", color: "primary", result: true }
            ]
        });
    }
    onTaskUpdated(task: Task) {
        this.taskService.updateTask(task).pipe(
            tap({
                next: () => {
                    this.loadTasks();
                },
                error: () => {
                    this.dialogService.openInfoDialog("Error al actualizar la tarea");
                },
            }),
            takeUntil(this.destroy$),
            catchError(() => this.dialogService.openInfoDialog("Error al actualizar la tarea")),
            finalize(() => this.dialogService.openInfoDialog("Tarea Actualizada"))
        ).subscribe();
    }

    onTaskDeleted(taskId: string) {
        this.openConfirmDialog("¿Está seguro de que desea eliminar esta tarea?")
            .pipe(takeUntil(this.destroy$))
            .subscribe((result) => {
                if (result) {
                    this.taskService.deleteTask(taskId).pipe(
                        tap({
                            next: () => {
                                this.loadTasks();
                            },
                            error: () => {
                                this.dialogService.openInfoDialog("Error al eliminar la tarea");
                            },
                        }),
                        takeUntil(this.destroy$),
                        catchError(() => this.dialogService.openInfoDialog("Error al eliminar la tarea")),
                        finalize(() => this.dialogService.openInfoDialog("Tarea Eliminada"))
                    ).subscribe();
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
