import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewUser } from './model/newUser.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

public http = inject(HttpClient);

public userService(): Observable<NewUser> {
  return this.http.get<NewUser>(
    'http://localhost:3000/users'
  );
}

public addUserService(request: NewUser): Observable<NewUser> {
  return this.http.post<NewUser>(
    'http://localhost:3000/newuser',
    request
  );
}
}
