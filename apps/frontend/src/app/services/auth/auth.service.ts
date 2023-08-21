import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async login():Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Login unsuccessfull!"));
        resolve("Login successfully!");
      }, 1000);
    });
  }
}
