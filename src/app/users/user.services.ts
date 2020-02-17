import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { environment } from "../../environments/environment";
import { User } from "./user.model";

@Injectable()
export class UserService {
  routeParams: any;
  contactList: any;
  countContacts: number;
  onContactListChanged: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los usuarios activos del sistema
   * @returns {Promise<any>}
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + "/users/all");
  }

  postCreateUser(data: any) {
    return this.http.post(environment.apiUrl + "/users/create", data);
  }

  getUserById(userId): Observable<User> {
    return this.http.get<User>(environment.apiUrl + "/users/" + userId);
  }

  putUpdateUser(data): Observable<any> {
    return this.http.put(environment.apiUrl + `/user/update/${data.userId}`, data);
  }
}
