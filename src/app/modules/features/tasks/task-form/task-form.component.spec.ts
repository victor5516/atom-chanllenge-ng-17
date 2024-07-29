import { HttpClientTestingModule } from "@angular/common/http/testing";
import {
    ComponentFixture, TestBed
} from "@angular/core/testing";
import { FormsModule, NgForm } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";

import { DialogService } from "../../../../services/dialog.service";
import { TaskService } from "../../../../services/task.service";
import { TaskFormComponent } from "./task-form.component";

describe("TaskFormComponent", () => {
    let component: TaskFormComponent;
    let fixture: ComponentFixture<TaskFormComponent>;
    let dialogServiceSpy: jasmine.SpyObj<DialogService>;

    beforeEach(async () => {
        const dialogServiceMock = jasmine.createSpyObj("DialogService", ["openDialog", "openInfoDialog"]);
        const taskServiceMock = jasmine.createSpyObj("TaskService", ["createTask"]);
        taskServiceMock.createTask.and.returnValue(of({
            message: "Tarea creada",
            statusCode: 200,
            status: "Success",
            result: {
                id: "1",
                title: "Test Task",
                description: "Test Description",
                completed: false,
                createdAt: new Date()
            }
        }));

        await TestBed.configureTestingModule({
            imports: [
                FormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatButtonModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
                TaskFormComponent,
            ],
            providers: [
                { provide: TaskService, useValue: taskServiceMock },
                { provide: DialogService, useValue: dialogServiceMock },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TaskFormComponent);
        component = fixture.componentInstance;
        dialogServiceSpy = TestBed.inject(DialogService) as jasmine.SpyObj<DialogService>;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should call openInfoDialog if form is invalid", () => {
        const form: NgForm = {
            invalid: true,
            value: {}
        } as NgForm;

        component.onAddTask(form);

        expect(dialogServiceSpy.openInfoDialog).toHaveBeenCalledWith("Debe completar los campos para crear una tarea");
    });
});
