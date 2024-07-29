import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
    },
    {
        path: "login",
        loadComponent: () => import("./modules/core/login/login.component")
            .then((m) => m.LoginComponent)
    },
    {
        path: "home",
        loadComponent: () => import("./modules/features/tasks/task-list/task-list.component")
            .then((m) => m.TaskListComponent)

    }
];
