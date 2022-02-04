import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from './global/request.service';
import { Usuarios } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private requestService: RequestService
  ) { }

  getUsers(): Observable<Usuarios[]> {
    return this.requestService.get<Usuarios[]>({}, 'api/v1/users/');
  }

  getUserById(id: string | number): Observable<Usuarios> {
    return this.requestService.get<Usuarios>({}, 'api/v1/users/' + id);
  }

  setUser(usuario: Usuarios): Observable<Usuarios> {
    return this.requestService.post<Usuarios>(usuario, 'api/v1/users/');
  }

  updateUser(id: number | string, usuario: Usuarios): Observable<Usuarios> {
    return this.requestService.put<Usuarios>(usuario, 'api/v1/users/' + id);
  }

  patchUser(id: number | string, usuario: Usuarios): Observable<Usuarios> {
    return this.requestService.put<Usuarios>(usuario, 'api/v1/users/' + id);
  }

  deleteUser(id: number | string): Observable<boolean> {
    return this.requestService.delete<boolean>('api/v1/users/' + id);
  }
}

