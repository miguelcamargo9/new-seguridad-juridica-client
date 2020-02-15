import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable()
export class SolicitudService {
  constructor(private http: HttpClient) {}

  postCreateSolicitud(data: any) {
    return this.http.post(environment.apiUrl + "/solicitud/", data);
  }
}
