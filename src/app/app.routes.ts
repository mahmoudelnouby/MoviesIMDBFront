import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FilmsComponent } from './films/films.component';
import { FilmsViewerComponent } from './film-viewer/film-viewer.component';
import { adminGuardGuard } from './admin-guard.guard';
import { UserViewComponent } from './user-view/user-view.component';
import { userGuardGuard } from './user-guard.guard';

export const routes: Routes = [
    {
        path:'',
        component:LoginComponent,
    },
    {
        path:'films',
        component:FilmsComponent,
        canActivate:[adminGuardGuard]
    },
    {
        path:'films-database',
        component:FilmsViewerComponent,
        canActivate:[adminGuardGuard]
    },
    {
        path:'userView',
        component:UserViewComponent,
        canActivate:[userGuardGuard]
    },
    {
        path:'**',
        redirectTo:""
    },
];
