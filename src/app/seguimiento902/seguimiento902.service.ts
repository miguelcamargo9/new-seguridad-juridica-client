import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Seguimiento902 } from "./seguimiento902.model";
import { Seguimiento902EtapaIncio } from "./seguimiento902EtapaInicio.model";
import { Seguimiento902EtapaCierre } from "./seguimiento902EtapaCierre.model";

@Injectable()
export class Seguimiento902Service {
  constructor(private http: HttpClient) {}

  getSeguimiento902(solicitudId): Observable<Seguimiento902> {
    return this.http.get<Seguimiento902>(environment.apiUrl + "/seguimiento902/" + solicitudId);
  }

  postCreateSeguimiento902(data: any) {
    return this.http.post<number>(environment.apiUrl + "/seguimiento902/", data);
  }

  putUpdateSeguimiento902(data: any): Observable<any> {
    return this.http.put(environment.apiUrl + "/seguimiento902/" + data.solicitudId, data);
  }

  getSeguimiento902EtapaInicioBySeguimiento902Id(
    seguimiento902Id: number
  ): Observable<Seguimiento902EtapaIncio[]> {
    return this.http.get<Seguimiento902EtapaIncio[]>(
      environment.apiUrl + "/seguimiento902/etapaInicio/bySeguimientoId/" + seguimiento902Id
    );
  }

  getSeguimiento902EtapaInicioById(
    seguimiento902EtapaInicioId: number
  ): Observable<Seguimiento902EtapaIncio> {
    return this.http.get<Seguimiento902EtapaIncio>(
      environment.apiUrl + "/seguimiento902/etapaInicio/" + seguimiento902EtapaInicioId
    );
  }

  postCreateSeguimiento902EtapaInicio(data: any) {
    return this.http.post(environment.apiUrl + "/seguimiento902/etapaInicio", data);
  }

  putUpdateSeguimiento902EtapaInicio(data: any): Observable<any> {
    return this.http.put(environment.apiUrl + "/seguimiento902/etapaInicio/" + data.id, data);
  }

  deleteSeguimiento902EtapaInicio(seguimiento902EtapaInicioId): Observable<any> {
    return this.http.delete(
      environment.apiUrl + "/seguimiento902/etapaInicio/" + seguimiento902EtapaInicioId
    );
  }

  getSeguimiento902EtapaCierreBySeguimiento902Id(
    seguimiento902Id: number
  ): Observable<Seguimiento902EtapaCierre[]> {
    return this.http.get<Seguimiento902EtapaCierre[]>(
      environment.apiUrl + "/seguimiento902/etapaCierre/bySeguimientoId/" + seguimiento902Id
    );
  }

  getSeguimiento902EtapaCierreById(
    seguimiento902EtapaCierreId: number
  ): Observable<Seguimiento902EtapaCierre> {
    return this.http.get<Seguimiento902EtapaCierre>(
      environment.apiUrl + "/seguimiento902/etapaCierre/" + seguimiento902EtapaCierreId
    );
  }

  postCreateSeguimiento902EtapaCierre(data: any) {
    return this.http.post(environment.apiUrl + "/seguimiento902/etapaCierre", data);
  }

  putUpdateSeguimiento902EtapaCierre(data: any): Observable<any> {
    return this.http.put(environment.apiUrl + "/seguimiento902/etapaCierre/" + data.id, data);
  }

  deleteSeguimiento902EtapaCierre(seguimiento902EtapaCierreId): Observable<any> {
    return this.http.delete(
      environment.apiUrl + "/seguimiento902/etapaCierre/" + seguimiento902EtapaCierreId
    );
  }
}
