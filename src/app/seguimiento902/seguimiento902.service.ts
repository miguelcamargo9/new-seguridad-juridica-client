import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Seguimiento902 } from "./seguimiento902.model";

@Injectable()
export class Seguimiento902Service {
  constructor(private http: HttpClient) {}

  postCreateCompany(data): Observable<any> {
    return this.http.post(environment.apiUrl + "/company/create/", data);
  }

  getCompanies(): Observable<Seguimiento902[]> {
    return this.http.get<Seguimiento902[]>(environment.apiUrl + "/company/all");
  }

  getSeguimiento902(solicitudId): Observable<Seguimiento902> {
    return this.http.get<Seguimiento902>(environment.apiUrl + "/seguimiento902/" + solicitudId);
  }

  postUpdateCompany(data): Observable<any> {
    return this.http.post(environment.apiUrl + "/company/update/", data);
  }

  deleteDeleteCompany(companyId): Observable<any> {
    return this.http.delete(
      environment.apiUrl + "/company/delete/" + companyId
    );
  }
}
