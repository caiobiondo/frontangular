import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileUser } from '../interfaces/profile-user';
import { RequestService } from './global/request.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileUserService {

  constructor(
    private requestService: RequestService
  ) { }

  getProfileUsers(): Observable<ProfileUser[]> {
    return this.requestService.get<ProfileUser[]>({}, 'api/v1/profileuser/');
  }

  getProfileUserById(id: string | number): Observable<ProfileUser> {
    return this.requestService.get<ProfileUser>({}, 'api/v1/profileuser/' + id);
  }

  setProfileUser(usuario: ProfileUser): Observable<ProfileUser> {
    return this.requestService.post<ProfileUser>(usuario, 'api/v1/profileuser/');
  }

  updateProfileUser(id: number | string, usuario: ProfileUser): Observable<ProfileUser> {
    return this.requestService.put<ProfileUser>(usuario, 'api/v1/profileuser/' + id);
  }

  patchProfileUser(id: number | string, usuario: ProfileUser): Observable<ProfileUser> {
    return this.requestService.put<ProfileUser>(usuario, 'api/v1/profileuser/' + id);
  }

  deleteProfileUser(id: number | string): Observable<boolean> {
    return this.requestService.delete<boolean>('api/v1/profileuser/' + id);
  }
}
