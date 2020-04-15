import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class TemplateService {
  constructor(private http: HttpClient) {}

  postCreateCompany(data): Observable<any> {
    return this.http.post(environment.apiUrl + "/company/create/", data);
  }
}
