import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { environment } from "../../environments/environment";
import { ApiResponse } from "../models/apiResponse.model";
import { Task } from "../models/task.model";
import { TaskService } from "./task.service";

describe("TaskService", () => {
    let service: TaskService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TaskService]
        });

        service = TestBed.inject(TaskService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    describe("getTasks", () => {
        it("should return an array of tasks", () => {
            const mockTasks: Task[] = [
                {
                    id: "1",
                    title: "Task 1",
                    description: "Description 1",
                    completed: true,
                    createdAt: new Date()
                },
                {
                    id: "2",
                    title: "Task 2",
                    description: "Description 2",
                    completed: true,
                    createdAt: new Date()
                }
            ];
            const mockResponse: ApiResponse<Task[]> = {
                status: "SUCCESS",
                statusCode: 200,
                message: "Tareas encontradas",
                result: mockTasks
            };

            service.getTasks().subscribe((response) => {
                expect(response).toEqual(mockResponse);
            });

            const req = httpTestingController.expectOne(`${environment.api.url}/tasks`);
            expect(req.request.method).toBe("GET");
            expect(req.request.headers.get("Content-Type")).toBe("application/json");
            req.flush(mockResponse);
        });
    });

    describe("createTask", () => {
        it("should create a new task and return the created task", () => {
            const newTask: Partial<Task> = { title: "New Task", description: "New Description" };
            const createdTask: Partial<Task> = { id: "3" };
            const mockResponse: ApiResponse<Partial<Task>> = {
                status: "SUCCESS",
                statusCode: 201,
                message: "Tareas creada",
                result: createdTask
            };

            service.createTask(newTask).subscribe((response) => {
                expect(response).toEqual(mockResponse);
            });

            const req = httpTestingController.expectOne(`${environment.api.url}/tasks`);
            expect(req.request.method).toBe("POST");
            expect(req.request.body).toEqual(newTask);
            req.flush(mockResponse);
        });
    });

    describe("updateTask", () => {
        it("should update an existing task and return the updated task", () => {
            const taskToUpdate: Task = {
                id: "1",
                title: "Updated Task",
                description: "Updated Description",
                completed: false,
                createdAt: new Date()

            };
            const mockResponse: ApiResponse<Task> = {
                status: "SUCCESS",
                statusCode: 200,
                message: "Tarea actualizada",
                result: taskToUpdate
            };

            service.updateTask(taskToUpdate).subscribe((response) => {
                expect(response).toEqual(mockResponse);
            });

            const req = httpTestingController.expectOne(`${environment.api.url}/tasks/${taskToUpdate.id}`);
            expect(req.request.method).toBe("PUT");
            expect(req.request.body).toEqual(taskToUpdate);
            req.flush(mockResponse);
        });
    });

    describe("deleteTask", () => {
        it("should delete a task and return an empty response", () => {
            const taskId = "1";
            const mockResponse: ApiResponse<null> = {
                message: "Usuario Eliinado",
                result: null,
                status: "SUCCESS",
                statusCode: 200
            };

            service.deleteTask(taskId).subscribe((response) => {
                expect(response).toEqual(mockResponse);
            });

            const req = httpTestingController.expectOne(`${environment.api.url}/tasks/${taskId}`);
            expect(req.request.method).toBe("DELETE");
            req.flush(mockResponse);
        });
    });
});
