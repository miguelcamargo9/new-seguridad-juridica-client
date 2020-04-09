import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable()
export class ReportsService {
  constructor(private http: HttpClient) {}

  getReporteSeguimiento902(): Observable<Blob> {
    return this.http.get(environment.apiUrl + "/reports/seguimiento902", {responseType: 'blob'});
  }
}
