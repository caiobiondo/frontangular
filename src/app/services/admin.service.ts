import { Injectable } from '@angular/core'
import { IAdministrator } from '../interfaces/IAdministrator'
import { RequestService } from './global/request.service'
// import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor (private reqService: RequestService) {}

  get (): Promise<IAdministrator[]> {
    return this.reqService
      .get<IAdministrator[]>({}, 'api/v1/profileuser/')
      .toPromise()
  }

  post (data: object): Promise<IAdministrator> {
    return this.reqService
      .post<IAdministrator>(data, 'api/auth/register/')
      .toPromise()
  }
}
