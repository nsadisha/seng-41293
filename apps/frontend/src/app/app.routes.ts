import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import ('./pages/home/home.component') .then ( (c) => c.HomeComponent),
    },
    {
        path: 'login',
        loadComponent: () => import ('./pages/login/login.component') .then ( (c) => c.LoginComponent),
    },
    {
        path: 'register',
        loadComponent: () => import ('./pages/register/register.component') .then ( (c) => c.RegisterComponent),
    }
];
