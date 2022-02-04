import { Injectable } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { ICliente } from '../interfaces/ICliente'
import { RequestService } from './global/request.service'
// import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor (
    private reqService: RequestService,
    private toastr: ToastrService
  ) {}

  get (): ICliente[] {
    return [
      {
        id: 1,
        nome: 'Daniel',
        email: 'daniel@email.com'
      },
      {
        id: 2,
        nome: 'Diego',
        email: 'diego@email.com'
      }
    ]
  }
}
