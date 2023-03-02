import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {User} from 'app/model/user';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public host = environment.apiUrl + '/user';
  private token: string;
  private loggedInUsername: string;
  private jwtHelper = new JwtHelperService();
  private isAdmin: boolean = false;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private readonly JWT_TOKEN_EXPIRATION: number = 60 * 60 * 1000;



  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  setIsAdmin(isAdmin: boolean) {
    this.isAdmin = isAdmin;
  }
  
  getIsAdmin(): boolean {
    return this.isAdmin;
  }

  public login(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.host}/login`, user, {observe: 'response'});
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${this.host}/register`, user);
  }

  public logOut(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  // public addUserToLocalCache(user: User): void {
  //   localStorage.setItem('user', JSON.stringify(user));
  // }

  addUserToLocalCache(user: User): void {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + this.JWT_TOKEN_EXPIRATION * 1000);
    localStorage.setItem('currentUser', JSON.stringify({ user, expiration: expirationDate.toISOString() }));
    this.currentUserSubject.next(user);
  }

  public getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string {
    return this.token;
  }

  public isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logOut();
      return false;
    }
  }
  public getCurrentUser() {
    return this.currentUserValue;
  }
}
