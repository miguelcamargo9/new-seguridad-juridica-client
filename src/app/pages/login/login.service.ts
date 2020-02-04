import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { environment } from "../../../environments/environment";

@Injectable()
export class LoginService {
  routeParams: any;
  contactList: any;
  countContacts: number;
  onContactListChanged: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private http: HttpClient) {}

  /**
   * Validar usuario
   * @returns {Promise<any>}
   */
  postLogin(data): Observable<any> {
    return this.http.post(environment.apiUrl + "/auth/", data);
  }
}
