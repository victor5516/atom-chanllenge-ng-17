import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { environment } from "../../environments/environment";
import { ApiResponse } from "../models/apiResponse.model";
import { User } from "../models/user.model";
import { UserService } from "./user.service";

describe("UserService", () => {
    let service: UserService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService]
        });

        service = TestBed.inject(UserService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    describe("getUserByEmail", () => {
        it("should return user data for a given email", () => {
            const email = "test@example.com";
            const mockUser: User = { id: "1", email };
            const mockResponse: ApiResponse<User> = {
                result: mockUser,
                status: "SUCCESS",
                statusCode: 200,
                message: "Usuario en contrado"

            };

            service.getUserByEmail(email).subscribe((response) => {
                expect(response).toEqual(mockResponse);
            });

            const req = httpTestingController.expectOne(`${environment.api.url}/users/${email}`);
            expect(req.request.method).toBe("GET");
            req.flush(mockResponse);
        });
    });

    describe("createUser", () => {
        it("should create a new user and return the created user data", () => {
            const newUser: Partial<User> = { email: "newuser@example.com" };
            const mockUser: User = { id: "2", email: "newuser@example.com" };
            const mockResponse: ApiResponse<User> = {
                status: "SUCCESS",
                result: mockUser,
                statusCode: 201,
                message: "Usuario creado"
            };

            service.createUser(newUser).subscribe((response) => {
                expect(response).toEqual(mockResponse);
            });

            const req = httpTestingController.expectOne(`${environment.api.url}/users`);
            expect(req.request.method).toBe("POST");
            expect(req.request.body).toEqual(newUser);
            req.flush(mockResponse);
        });
    });
});
