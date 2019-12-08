import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, Router } from '@angular/router';
import { AuthenticationserviceService } from './authenticationservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthenticationserviceService, private router: Router) { }

  canActivate(): boolean {
    let value = this.auth.isAuthenticated()
    if (!value) {
      // initially was just redirecting here, but following the
      // documentation I updated code to return a UrlTree
      this.router.navigateByUrl("/login", { skipLocationChange: true })

      //return this.router.parseUrl("/login");
    }
    return value
  }
}
