import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, BehaviorSubject } from "rxjs";
import { Solicitud } from "./solicitudes.model";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class SolicitudService implements Resolve<any> {
  routeParams: any;
  solicitud: Solicitud;
  onSolicitudChanged: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private http: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    return new Promise((resolve, reject) => {
      Promise.all([this.getSolicitudPreviewById(this.routeParams.id)]).then(() => {
        resolve();
      }, reject);
    });
  }

  postCreateSolicitud(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + "/solicitud/", data);
  }

  putUpdateSolicitud(data: any): Observable<any> {
    return this.http.put(environment.apiUrl + "/solicitud/", data);
  }

  postBuscarSolicitud(data: any): Observable<Solicitud[]> {
    return this.http.post<Solicitud[]>(environment.apiUrl + "/solicitud/buscar", data);
  }

  getSolicitudById(solicitudId: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(environment.apiUrl + `/solicitud/${solicitudId}`);
  }

  getSolicitudPreviewById(solicitudId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiUrl + "/solicitud/" + solicitudId).subscribe((response: any) => {
        this.solicitud = response;
        this.onSolicitudChanged.next(this.solicitud);
        resolve(response);
      }, reject);
    });
  }
}
