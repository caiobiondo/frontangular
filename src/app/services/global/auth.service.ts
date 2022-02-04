import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ISignIn } from 'src/app/interfaces/global/ISignIn'
import { IToken } from 'src/app/interfaces/global/IToken'
import { environment } from 'src/environments/environment'
import { ErrorService } from './error.service'
import { JWTService } from './jwt.service'
import { RequestService } from './request.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string | null = ''

  constructor(
    private reqService: RequestService,
    private errorService: ErrorService,
    private JWT: JWTService) { }

  signIn(data: ISignIn): Observable<IToken> {
    this.JWT.unsetToken()
    return this.reqService.post<IToken>(data, 'rest-auth/login/', environment.apiPermissoes)
  }

  signOut(): void {
    this.reqService.post<any>({}, 'rest-auth/logout/');
    this.JWT.unsetToken();
  }

  isAuthenticated(): boolean {
    if (this.JWT.token() === '') {
      return false
    }
    return true
  }

  storageToken(token: IToken, keepLogged: boolean): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!token.key ?? false) {
        reject(
          this.errorService.setError(
            { severity: 'error', code: 2, summary: 'Error code: 2', detail: 'Unable to storage user.', toast: true, log: true }
          )
        )
      }
      if (keepLogged) {
        localStorage.setItem('portalClienteAuthToken', token.key)
        // localStorage.setItem('portalClienteAuthToken_refresh', token.refresh_token)
      } else {
        sessionStorage.setItem('portalClienteAuthToken', token.key)
        // sessionStorage.setItem('portalClienteAuthToken_refresh', token.refresh_token)
      }
      resolve(true)
    })
  }
}
