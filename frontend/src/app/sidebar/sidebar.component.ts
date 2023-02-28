// import { Component, Input } from '@angular/core';

// @Component({
//   selector: 'app-sidebar',
//   templateUrl: './sidebar.component.html',
//   styleUrls: ['./sidebar.component.css']
// })
// export class SidebarComponent {
//   @Input() onLogout: () => void;
// }

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/service/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() onLogout: () => void;
  // @Input() sendNotification: (title: string, message: string, type: NotificationType) => void;
  @Input() sendNotification: (message: string) => void;

  // constructor(private authenticationService: AuthenticationService) {}
  constructor(private authenticationService: AuthenticationService, private router: Router) { }


  public logOut(): void {
    this.authenticationService.logOut();
    this.onLogout();
  }
}