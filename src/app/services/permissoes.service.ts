import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permissoes } from '../interfaces/perfil-permissoes';
import { RequestService } from './global/request.service';

@Injectable({
  providedIn: 'root'
})
export class PermissoesService {

  constructor(
    private requestService: RequestService
  ) { }

  getPerfilPermissoesList(): Observable<Permissoes[]> {
    return this.requestService.get<Permissoes[]>({}, `api/v1/permissoes/`);
  }

  getPerfilPermissoesById(id: string): Observable<Permissoes> {
    return this.requestService.get<Permissoes>({}, `api/v1/permissoes/${id}`);
  }

  createPerfilPermissoes(obj: Permissoes): Observable<Permissoes> {
    return this.requestService.post<Permissoes>(obj, `api/v1/permissoes/`);
  }

  updatePerfilPermissoes(obj: Permissoes): Observable<Permissoes> {
    return this.requestService.put<Permissoes>(obj, `api/v1/permissoes/${obj.id}`);
  }

  patchUpdatePerfilPermissoes(obj: Permissoes): Observable<Permissoes> {
    return this.requestService.put<Permissoes>(obj, `api/v1/permissoes/${obj.id}`);
  }

  deletePerfilPermissoesById(id: string): Observable<Permissoes> {
    return this.requestService.delete<Permissoes>(`api/v1/permissoes/${id}`);
  }
}
