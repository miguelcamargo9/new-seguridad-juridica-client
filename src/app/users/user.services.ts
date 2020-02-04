import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
}
