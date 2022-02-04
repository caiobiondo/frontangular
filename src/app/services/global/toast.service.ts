import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _toaster = new BehaviorSubject<boolean>(false)
  private _severity = new BehaviorSubject<string>('')
  private _summary = new BehaviorSubject<string>('')
  private _detail = new BehaviorSubject<string>('')

  constructor () { }

  set toaster (val:boolean) {
    this._toaster.next(val)
  }

  get toaster () {
    return this._toaster.value
  }

  observeToast (): Observable<boolean> {
    return this._toaster.asObservable()
  }

  set severity (val:string) {
    this._severity.next(val)
  }

  get severity () {
    return this._severity.value
  }

  set summary (val:string) {
    this._summary.next(val)
  }

  get summary () {
    return this._summary.value
  }

  set detail (val:string) {
    this._detail.next(val)
  }

  get detail () {
    return this._detail.value
  }

  showToast (severity: string, summary: string, detail: string) {
    this.severity = severity
    this.summary = summary
    this.detail = detail
    this.toaster = true
  }
}
