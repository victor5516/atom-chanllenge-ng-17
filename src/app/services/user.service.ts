import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { ApiResponse } from "../models/apiResponse.model";
import { User } from "../models/user.model";

@Injectable({
    providedIn: "root"
})
export class UserService {
    private apiUrl = `${environment.api.url}/users`;
    private httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
        })
    };
    constructor(private http: HttpClient) {}

    getUserByEmail(email: string): Observable<ApiResponse<User>> {
        return this.http.get<ApiResponse<User>>(`${this.apiUrl}/${email}`);
    }

    createUser(user: Partial<User>): Observable<ApiResponse<Partial<User>>> {
        return this.http.post<ApiResponse<Partial<User>>>(this.apiUrl, user);
    }
}
