import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { IEmpresa } from '../interfaces/Empresas'
import { RequestService } from './global/request.service'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  constructor(
    private reqService: RequestService,
  ) { }

  getEmpresas(): Observable<IEmpresa[]> {
    return this.reqService.get<IEmpresa[]>({}, 'api/v1/empresas/', environment.apiPermissoes);
  }
  getEmpresaById(id: string): Observable<IEmpresa> {
    return this.reqService.get<IEmpresa>({}, `api/v1/empresas/${id}`);
  }
}
