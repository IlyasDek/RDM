import {Injectable} from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {NotificationType} from '../enum/notification-type.enum';
import { Observable, Subject } from 'rxjs';


@Injectable({providedIn: 'root'})
export class NotificationService {
  private notificationSubject = new Subject<string>();


  constructor(private notifier: NotifierService) {
  }

  // tslint:disable-next-line:typedef
  public notify(type: NotificationType, message: string) {
    this.notifier.notify(type, message);
  }
  sendNotification(notificationType: NotificationType,message: string): void {
    if (message) {
      this.notifier.notify(notificationType, message);
    } else {
      this.notifier.notify(notificationType, 'An error occured. Please try again.');
    }  
  }

  getNotificationObservable(): Observable<string> {
    return this.notificationSubject.asObservable();
  }

}
