import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { ApiResponse } from "../models/apiResponse.model";
import { Task } from "../models/task.model";

@Injectable({
    providedIn: "root"
})
export class TaskService {
    private apiUrl = `${environment.api.url}/tasks`;
    private httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
        })
    };

    constructor(private http: HttpClient) {}

    getTasks(): Observable<ApiResponse<Task[]>> {
        return this.http.get<ApiResponse<Task[]>>(this.apiUrl, this.httpOptions);
    }

    createTask(task:Partial<Task>): Observable<ApiResponse<Partial<Task>>> {
        return this.http.post<ApiResponse<Partial<Task>>>(`${this.apiUrl}`, task);
    }

    updateTask(task: Task): Observable<ApiResponse<Task>> {
        return this.http.put<ApiResponse<Task>>(`${this.apiUrl}/${task.id}`, task);
    }

    deleteTask(taskId: string): Observable<ApiResponse<null>> {
        return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${taskId}`);
    }
}
