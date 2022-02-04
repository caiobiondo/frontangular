import { Injectable } from '@angular/core'
import { IGrupoEmpresa } from '../interfaces/IGrupoEmpresa'
import { RequestService } from './global/request.service'

@Injectable({
  providedIn: 'root'
})
export class GrupoEmpresaService {
  constructor (private reqService: RequestService) {}

  get (): Promise<IGrupoEmpresa[]> {
    return this.reqService
      .get<IGrupoEmpresa[]>({}, 'api/v1/grupos/')
      .toPromise()
  }

  post (data: object): Promise<IGrupoEmpresa> {
    return this.reqService
      .post<IGrupoEmpresa>(data, 'api/v1/post-grupos/')
      .toPromise()
  }
}
