import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth, ChangePassword, Login, RefreshToken, ResetPassword, RestUser, Token, ValidateToken } from '../interfaces/auth';
import { RequestService } from './global/request.service';

@Injectable({
  providedIn: 'root'
})
export class RestAuthService {

  constructor(
    private requestService: RequestService
  ) { }

  register(register: Auth): Observable<Auth> {
    return this.requestService.post<Auth>(register, 'api/auth/register/');
  }

  // login(user: Login): Observable<Login> {
  //   return this.requestService.post<Login>(user, 'rest-auth/login/');
  // }

  getLogout(): Observable<any> {
    return this.requestService.get<any>({}, 'rest-auth/logout/');
  }

  logout(): Observable<any> {
    return this.requestService.post<any>({}, 'rest-auth/logout/');
  }

  changePassword(data: ChangePassword): Observable<ChangePassword> {
    return this.requestService.post<ChangePassword>(data, 'rest-auth/password/change/');
  }

  resetPassword(email: string): Observable<string> {
    return this.requestService.post<string>({ email }, 'rest-auth/password/reset/');
  }

  confirmResetPassword(data: ResetPassword): Observable<any> {
    return this.requestService.post<any>(data, 'rest-auth/password/reset/confirm/');
  }

  getRestAuthUser(): Observable<RestUser> {
    return this.requestService.get<RestUser>({}, 'rest-auth/user/');
  }

  updateRestAuthUser(): Observable<RestUser> {
    return this.requestService.put<RestUser>({}, 'rest-auth/user/');
  }

  patchRestAuthUser(): Observable<RestUser> {
    return this.requestService.patch<RestUser>({}, 'rest-auth/user/');
  }

  token(data: Token): Observable<Token> {
    return this.requestService.post<Token>(data, 'token/');
  }

  tokenRefresh(refresh: string): Observable<RefreshToken> {
    return this.requestService.post<RefreshToken>({ refresh }, 'token/refresh/');
  }

  validateToken(obj: ValidateToken): Observable<ValidateToken> {
    return this.requestService.post<ValidateToken>({ uid: obj.uid, token: obj.token }, 'djoser_auth/users/activation/');
  }
}
