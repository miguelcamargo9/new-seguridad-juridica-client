import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Company } from "./company.model";

@Injectable()
export class CompanyService {
  constructor(private http: HttpClient) { }

  postCreateCompany(data): Observable<any> {
    return this.http.post(environment.apiUrl + "/company/create/", data);
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(environment.apiUrl + "/company/all");
  }

  getCompanyById(companyId): Observable<Company> {
    return this.http.get<Company>(environment.apiUrl + "/company/" + companyId);
  }

  putUpdateCompany(data): Observable<any> {
    return this.http.put(environment.apiUrl + "/company/update/", data);
  }

  deleteDeleteCompany(companyId): Observable<any> {
    return this.http.delete(
      environment.apiUrl + "/company/delete/" + companyId
    );
  }
}
