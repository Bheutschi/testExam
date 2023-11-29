import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TasksPageComponent} from "./components/tasks-page/tasks-page.component";
import {TaskDetailsComponent} from "./components/task-details/task-details.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {TaskEditComponent} from "./components/task-edit/task-edit.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {IsLoggedInGuard} from "./guards/is-logged-in.guard";

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'tasks'},
    { path: 'login', component: LoginPageComponent },
    { path: 'tasks', component: TasksPageComponent, canActivate: [IsLoggedInGuard], children: [
            { path: 'new', component: TaskEditComponent },
            { path: ':taskId', component: TaskDetailsComponent },
            { path: ':taskId/edit', component: TaskEditComponent }
        ] },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
