import { catchError } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { SpinnerService } from '../services/global/spinner.service'
import { Observable } from 'rxjs'
import { ErrorService } from '../services/global/error.service'
import { JWTService } from '../services/global/jwt.service'

@Injectable()
export class HttpCustomInterceptor implements HttpInterceptor {
  constructor(
    private errorService: ErrorService,
    private JWT: JWTService,
    private spinnerService: SpinnerService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.JWT.token()

    const newHeader: HttpHeaders = this.add_token_to_header(request, token)

    const changedRequest = request.clone({ headers: newHeader })
    return next.handle(changedRequest)
      .pipe(catchError(err => {
        this.handle_error(err, request)
        return new Promise(resolve => { resolve(err) })
      })
      ) as Observable<HttpEvent<any>>
  }

  private add_token_to_header(request: HttpRequest<any>, token: string): HttpHeaders {
    const headerSettings: { [name: string]: string | string[]; } = {}

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key) ?? ''
    }
    if (token) {
      headerSettings.Authorization = 'Token ' + token
    }

    const newHeader = new HttpHeaders(headerSettings)
    return newHeader
  }

  private handle_error(err: HttpErrorResponse, request: HttpRequest<any>) {
    if (err instanceof HttpErrorResponse) {
      const response_error = err.error
      this.spinnerService.spinner = false
      const message = this.getMessageFromHttpError(response_error)
      this.errorService.setError(
        { severity: 'error', code: 1, summary: 'Error', detail: message, toast: true, log: true }
      )

      if (!environment.production) {
        console.log(err)
        console.log(response_error)
      }
    }
  }

  private getMessageFromHttpError(response_error: any): string {
    if (!response_error) {
      return 'Something wrong happened to your request.'
    }
    let message = '<ul style="list-style-type: none;">'
    if (typeof response_error === 'object') {
      Object.entries(response_error).map((e: any, k: any) => {
        message += `<li>${e[0]} - ${e[1][0]}</li>`
        return true
      })
    }

    if (response_error.lenght > 0) {
      message += `<li>${response_error.join('<br>')}</li>`
    }

    if (typeof response_error === 'string') {
      message += `<li>${response_error}</li>`
    }
    message += '</ul>'
    return message
  }
}
