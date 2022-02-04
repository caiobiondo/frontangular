import { Injectable } from '@angular/core'
import { IColaborador } from '../interfaces/IColaborador'
import { RequestService } from './global/request.service'

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {
  constructor (private reqService: RequestService) {}

  get (): IColaborador[] {
    return [
      {
        id: 1,
        nome: 'Daniel',
        email: 'daniel@email.com',
        setor: 'Recurso Humano',
        perfil: 'RH 1',
        grupo: {
          id: 1,
          empresas: [],
          grupo: 'Grupo 1',
          administrador: {
            nome: 'Admin 1',
            email: 'admin@email.com'
          }
        }
      }
    ]
  }
}
