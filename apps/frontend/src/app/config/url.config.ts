import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UrlConfig {
    LOGIN_URL = '/auth/login';
    REGISTER_URL = '/auth/register';
}