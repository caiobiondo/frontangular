import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PerfilPermissoes, UpdatePermissao } from '../interfaces/perfil-permissoes';
import { RequestService } from './global/request.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilPermissoesService {

  constructor(
    private requestService: RequestService
  ) { }

  getPerfilPermissoesList(cnpj: string): Observable<PerfilPermissoes[]> {
    return this.requestService.get<PerfilPermissoes[]>({}, `api/v1/perfilperm/?${cnpj}`, environment.apiPermissoes);
  }

  getPerfilPermissoesById(id: string): Observable<PerfilPermissoes> {
    return this.requestService.get<PerfilPermissoes>({}, `api/v1/perfilperm/${id}`, environment.apiPermissoes);
  }

  createPerfilPermissoes(obj: UpdatePermissao): Observable<UpdatePermissao> {
    return this.requestService.post<UpdatePermissao>(obj, `api/v1/post-perfilperm/`, environment.apiPermissoes);
  }

  updatePerfilPermissoes(obj: UpdatePermissao): Observable<UpdatePermissao> {
    return this.requestService.put<UpdatePermissao>(obj, `api/v1/perfilperm/${obj.perfil_de_acesso[0].id}`, environment.apiPermissoes);
  }

  patchUpdatePerfilPermissoes(obj: PerfilPermissoes): Observable<PerfilPermissoes> {
    return this.requestService.put<PerfilPermissoes>(obj, `api/v1/perfilperm/${obj.id}`, environment.apiPermissoes);
  }

  deletePerfilPermissoesById(id: string): Observable<PerfilPermissoes> {
    return this.requestService.delete<PerfilPermissoes>(`api/v1/perfilperm/${id}`, environment.apiPermissoes);
  }
}
