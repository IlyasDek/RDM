import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { Role } from 'app/enum/role.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     const currentUser = this.authService.currentUserValue;
//     if (currentUser) {
//       // Проверяем, соответствует ли пользователь требуемой роли
//       if (currentUser.role === 'SUPER_ADMIN') {
//         // Если пользователь имеет требуемую роль, разрешаем ему доступ
//         return true;
//       } else {
//         // Если пользователь не имеет прав, перенаправляем его на страницу ошибки
//         this.router.navigate(['/error']);
//         return false;
//       }
//     }
  
//     // Если пользователь не авторизован, перенаправляем его на страницу входа
//     this.router.navigate(['/login']);
//     return false;
//   }
public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // Проверяем, является ли пользователь SUPER_ADMIN
      if (currentUser.role === Role.SUPER_ADMIN) {
        return true;
      }
    }
  
    // Если пользователь не соответствует требованиям, перенаправляем его на страницу ошибки
    this.router.navigate(['/error'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
