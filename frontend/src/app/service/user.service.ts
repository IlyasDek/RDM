import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
import {HttpClient, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User} from 'app/model/user';
import {CustomHttpRespone} from '../model/custom-http-response';
import { Role } from '../enum/role.enum';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = environment.apiUrl + '/user';
  private authenticationService: AuthenticationService;

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<User[] | HttpErrorResponse> {
    return this.http.get<User[]>(`${this.host}/list`);
  }

  public addUser(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/add`, formData);
  }

  // public updateUser(formData: FormData): Observable<User | HttpErrorResponse> {
  //   return this.http.post<User>(`${this.host}/update`, formData);
  // }

  public updateUser(id: number, formData: FormData): Observable<User> {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser.role === Role.SUPER_ADMIN) {
      return this.http.put<User>(`${this.host}/${id}`, formData);
    } else {
      return throwError('Only SUPER ADMIN can update other users.');
    }
  }

  // updateUser(id: number, user: User): Observable<User> {
  //   const currentUser = this.authenticationService.currentUserValue;
  //   if (currentUser.role === Role.SUPER_ADMIN) {
  //     return this.http.put<User>(`${this.baseUrl}/${id}`, user);
  //   } else {
  //     return throwError('Only SUPER ADMIN can update other users.');
  //   }
  // }

  public resetPassword(email: string): Observable<CustomHttpRespone | HttpErrorResponse> {
    return this.http.get<CustomHttpRespone>(`${this.host}/resetPassword/${email}`);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<User> | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/updateProfileImage`, formData, {
      reportProgress: true, observe: 'events'
    });
  }

  public deleteUser(username: string): Observable<CustomHttpRespone | HttpErrorResponse> {
    return this.http.delete<CustomHttpRespone>(`${this.host}/delete/${username}`);
  }

  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersToLocalCache(): User[] {
    if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users'));
    }
    return null;
  }

  public createUserFormDate(loggedInUsername: string, user: User, currentUserRole: string): FormData {
    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('role', user.role);
    formData.append('currentUserRole', currentUserRole);
    formData.append('isActive', JSON.stringify(user.active));
    formData.append('isNonLocked', JSON.stringify(user.notLocked));
    return formData;
  }
}
