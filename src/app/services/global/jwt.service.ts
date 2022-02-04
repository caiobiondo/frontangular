import { Injectable } from '@angular/core'
import { JwtHelperService } from '@auth0/angular-jwt'
import { ErrorService } from './error.service'

@Injectable({
  providedIn: 'root'
})
export class JWTService {
    private helper = new JwtHelperService();

    constructor (
      private errorService: ErrorService
    ) { }

    public token (): string {
      return localStorage.getItem('portalClienteAuthToken') ?? sessionStorage.getItem('portalClienteAuthToken') ?? ''
    }

    public unsetToken (): void {
      localStorage.removeItem('portalClienteAuthToken')
      sessionStorage.removeItem('portalClienteAuthToken')
    }

    public isExpired (): boolean {
      const jwtToken = this.token()
      if (jwtToken === '') {
        return true
      }
      return this.helper.isTokenExpired(this.token())
    }

    public decodeToken (): Promise<any> {
      return new Promise((resolve, reject) => {
        const decode = this.helper.decodeToken(this.token())
        if (decode) {
          resolve(decode)
        } else {
          reject(
            this.errorService.setError(
              { severity: 'error', code: 4, summary: 'Error', detail: 'Failed to decode user.', toast: true, log: true }
            )
          )
        }
      })
    }

    public tokenExpirationDate (): Date {
      return this.helper.getTokenExpirationDate(this.token()) ?? new Date()
    }
}
