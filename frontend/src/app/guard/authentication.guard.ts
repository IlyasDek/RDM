import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from 'app/service/authentication.service';
import {NotificationService} from 'app/service/notification.service';
import {NotificationType} from 'app/enum/notification-type.enum';


@Injectable({providedIn: 'root'})
export class AuthenticationGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router,
              private notificationService: NotificationService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isUserLoggedIn();
  }

  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   const currentUser = this.authenticationService.currentUserValue;
  //   if (this.authenticationService.isUserLoggedIn() && currentUser.role === 'ROLE_SUPER_ADMIN') {
  //     // Если пользователь авторизован и имеет роль SUPER_ADMIN, разрешаем ему доступ
  //     return this.isUserLoggedIn();
  //   }
  //   // Если пользователь не авторизован или не имеет прав, перенаправляем его на страницу входа
  //   this.router.navigate(['/login']);
  //   this.notificationService.notify(NotificationType.ERROR, `You need to log in as SUPER ADMIN to access this page`);
  //   return false;
  // }

  private isUserLoggedIn(): boolean {
    if (this.authenticationService.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    this.notificationService.notify(NotificationType.ERROR, `You need to log in to access this page`);
    return false;
  }

}
