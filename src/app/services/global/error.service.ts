import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { IErrorCode } from 'src/app/interfaces/global/IErrorCode'
import { IErrorProps } from 'src/app/interfaces/global/IErrorProps'
import { IError } from '../../interfaces/global/IError'
import { ToastService } from './toast.service'

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private _error: BehaviorSubject<IError> = new BehaviorSubject<IError>({} as IError)

  constructor (
    private toastr: ToastService
  ) {}

  get error (): IError {
    return this._error.value
  }

  set error (error: IError) {
    this._error.next(error)
  }

  private _errors: BehaviorSubject<IError[]> = new BehaviorSubject<IError[]>([] as IError[])

  get errors (): IError[] {
    return this._errors.value
  }

  set errors (error: IError[]) {
    this._errors.next(error)
  }

  setError (props: IErrorProps) {
    const { severity, code, summary, detail, toast, log } = props
    if (toast) {
      console.log('Show Toast')
      this.toastr.severity = severity
      this.toastr.summary = summary
      this.toastr.detail = detail
      this.toastr.toaster = true
    }
    if (log) {
      console.log('Generate error log on database.', code)
    }
  }

  getErrorCodeList (): Promise<IErrorCode[]> {
    return new Promise((resolve, reject) => {
      resolve(
        [
          {
            code: 1,
            detail: 'Erro em requisição.',
            source: 'http-custom-interceptor',
            function: 'handle_error'
          }
        ]
      )
    })
  }
}
