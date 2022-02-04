import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  CanLoad,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from '../services/global/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  isAuthenticated: boolean = false;
  token: string | null = '';

  constructor(private auth: AuthService, public router: Router) {
    this.isAuthenticated = this.auth.isAuthenticated()
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.isAuthenticated) {
      this.router.navigate(['login'])
      return false
    }

    return true
  }

  canLoad() {
    return this.isAuthenticated
  }
}
