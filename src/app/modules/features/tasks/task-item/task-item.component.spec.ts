import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { Task } from "../../../../models/task.model";
import { TaskItemComponent } from "./task-item.component";

describe("TaskItemComponent", () => {
    let component: TaskItemComponent;
    let fixture: ComponentFixture<TaskItemComponent>;
    let testTask: Task;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatCheckboxModule,
                MatButtonModule,
                MatCardModule,
                MatInputModule,
                FormsModule,
                NoopAnimationsModule,
                TaskItemComponent,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(TaskItemComponent);
        component = fixture.componentInstance;

        testTask = {
            id: "1",
            title: "Test Task",
            description: "Test Description",
            completed: false,
            createdAt: new Date(),
        };

        component.task = testTask;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should set isEditing to true when startEditing is called", () => {
        component.startEditing();
        expect(component.isEditing).toBe(true);
    });

    it("should emit taskUpdated and set isEditing to false when saveChanges is called", () => {
        spyOn(component.taskUpdated, "emit");

        component.isEditing = true;
        component.saveChanges();

        expect(component.taskUpdated.emit).toHaveBeenCalledWith(testTask);
        expect(component.isEditing).toBe(false);
    });

    it("should emit taskDeleted when onDeleteTask is called", () => {
        spyOn(component.taskDeleted, "emit");

        component.onDeleteTask();

        expect(component.taskDeleted.emit).toHaveBeenCalledWith(testTask.id);
    });

    it("should set isEditing to false when cancelEditing is called", () => {
        component.isEditing = true;
        component.cancelEditing();

        expect(component.isEditing).toBe(false);
    });

    it("should emit taskUpdated when onTaskCompletionChanged is called", () => {
        spyOn(component.taskUpdated, "emit");

        component.onTaskCompletionChanged();

        expect(component.taskUpdated.emit).toHaveBeenCalledWith(testTask);
    });
});
