import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Solicitud } from "./solicitudes.model";

@Injectable()
export class SolicitudService {
  constructor(private http: HttpClient) {}

  postCreateSolicitud(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + "/solicitud/", data);
  }

  postBuscarSolicitud(data: any): Observable<Solicitud[]> {
    return this.http.post<Solicitud[]>(environment.apiUrl + "/solicitud/buscar", data);
  }

  getSolicitudById(solicitudId: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(environment.apiUrl + `/solicitud/${solicitudId}`);
  }
}
