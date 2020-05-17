import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Template } from "./template.model";

@Injectable()
export class TemplateService {
  constructor(private http: HttpClient) {}

  getTemplateCloseResolution(solicitudId, type): Observable<any> {
    return this.http.get<Template>(environment.apiUrl + "/template/" + solicitudId + "/type/" + type);
  }

  postTemplateCloseResolution(solicitudId, listTabs, type): Observable<any> {
    return this.http.post(
      environment.apiUrl + "/template/" + solicitudId + "/type/" + type,
      listTabs
    );
  }

  getReloadTemplate(solicitudId: number, reportType: String, listTabs): Observable<any> {
    return this.http.get<Template>(environment.apiUrl + "/template/reload/" + solicitudId + "/type/" + reportType, listTabs);
  }

  getPDFTemplate(solicitudId: number, reportType: String): Observable<Blob> {
    return this.http.get(environment.apiUrl + "/template/generatePDF/" + solicitudId + "/type/" + reportType, {responseType: 'blob'});
  }
}
