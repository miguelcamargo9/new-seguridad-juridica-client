import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Seguimiento902 } from "./seguimiento902.model";

@Injectable()
export class Seguimiento902Service {
  constructor(private http: HttpClient) { }


  getSeguimiento902(solicitudId): Observable<Seguimiento902> {
    return this.http.get<Seguimiento902>(environment.apiUrl + "/seguimiento902/" + solicitudId);
  }

  postCreateSeguimiento902(data: any) {
    return this.http.post(environment.apiUrl + "/seguimiento902/", data);
  }

  putUpdateSeguimiento902(data: any): Observable<any> {
    return this.http.put(environment.apiUrl + "/seguimiento902/" + data.solicitudId, data);
  }

  deleteDeleteCompany(companyId): Observable<any> {
    return this.http.delete(
      environment.apiUrl + "/company/delete/" + companyId
    );
  }
}
