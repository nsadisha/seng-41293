import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlConfig } from '../../config/url.config';
import { ILoginUser, IUser } from '../../../../../../libs/model/src/index'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private urlConfig: UrlConfig
    ) {}

  login(credentials: {}) {
    return this.httpClient.post<ILoginUser>(this.urlConfig.LOGIN_URL, credentials)
  }

  register(registerRequest: IUser) {
    return this.httpClient.post<ILoginUser>(this.urlConfig.REGISTER_URL, registerRequest)
  }
}
