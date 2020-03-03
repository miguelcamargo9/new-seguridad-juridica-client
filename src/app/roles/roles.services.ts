import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Roles } from "./roles.model";
import { environment } from "src/environments/environment";

@Injectable()
export class RolesService {
  constructor(private http: HttpClient) {}

  getRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(environment.apiUrl + "/roles/all");
  }
}
