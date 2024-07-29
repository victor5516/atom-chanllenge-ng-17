import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialog } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";

import { DialogService } from "../../../../services/dialog.service";
import { TaskService } from "../../../../services/task.service";
import { TaskListComponent } from "./task-list.component";

describe("TaskListComponent", () => {
    let component: TaskListComponent;
    let fixture: ComponentFixture<TaskListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TaskListComponent,
                BrowserAnimationsModule,
                HttpClientTestingModule
            ],
            providers: [
                TaskService,
                DialogService,
                { provide: MatDialog, useValue: { open: () => ({ afterClosed: () => of(true) }) } }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TaskListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
