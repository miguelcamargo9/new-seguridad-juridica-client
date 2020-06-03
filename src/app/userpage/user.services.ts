import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { environment } from "../../environments/environment";
import { User } from "./user.model";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUserByUsername(username): Observable<User> {
    return this.http.get<User>(environment.apiUrl + "/users/username/" + username);
  }

  putUpdateUser(data): Observable<any> {
    return this.http.put(environment.apiUrl + `/users/update/${data.userId}`, data);
  }

  putResetPassword(data): Observable<any> {
    return this.http.put(environment.apiUrl + `/users/update/${data.userId}/updatePassword`, data);
  }
}
