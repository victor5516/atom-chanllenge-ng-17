import { CommonModule } from "@angular/common";
import {
    Component, EventEmitter, Input, Output
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";

import { Task } from "../../../../models/task.model";

@Component({
    selector: "app-task-item",
    standalone: true,
    imports: [
        MatCheckboxModule,
        MatButtonModule,
        CommonModule,
        FormsModule,
        MatButton,
        MatInputModule,
        MatCardModule,

    ],
    templateUrl: "./task-item.component.html",
    styleUrl: "./task-item.component.scss"
})
export class TaskItemComponent {
    @Input() task?: Task;
    @Output() taskUpdated = new EventEmitter<Task>();
    @Output() taskDeleted = new EventEmitter<string>();
    isEditing = false;

    startEditing() {
        this.isEditing = true;
    }

    onTaskCompletionChanged() {
        this.taskUpdated.emit(this.task);
    }
    saveChanges() {
        if (this.task) {
            this.taskUpdated.emit(this.task);
        }
        this.isEditing = false;
    }
    onDeleteTask() {
        if (this.task) {
            this.taskDeleted.emit(this.task.id);
        }
    }
    cancelEditing() {
        this.isEditing = false;
    }
}
