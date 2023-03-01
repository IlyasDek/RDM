import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }

    const userRole = this.authService.getUserRole();

    if (userRole !== 'ADMIN' && userRole !== 'SUPER ADMIN') {
      this.router.navigate(['unauthorized']);
      return false;
    }

    return true;
  }
}
