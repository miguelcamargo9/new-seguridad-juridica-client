import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { InformeTecnicoJuridico } from "./informeTecnicoJuridico.model";
import { InformacionVur } from "./informacionVur.model";
import { InformacionCatastral } from "./informacionCatastral.model";
import { InformacionPredial } from "./informacionPredial.model";
import { Colindante } from "./colindante.model";

@Injectable()
export class InformeTecnicoJuridicoService {
  constructor(private http: HttpClient) {}

  getInformeTecnicoJuridico(solicitudId: number): Observable<InformeTecnicoJuridico> {
    return this.http.get<InformeTecnicoJuridico>(
      environment.apiUrl + "/informeTecnicoJuridico/" + solicitudId
    );
  }

  postCreateInformeTecnicoJuridico(data: any) {
    return this.http.post<number>(environment.apiUrl + "/informeTecnicoJuridico/", data);
  }

  putUpdateInformeTecnicoJuridico(data: any): Observable<any> {
    return this.http.put(environment.apiUrl + "/informeTecnicoJuridico/" + data.solicitudId, data);
  }

  putUpdateInformeTecnicoJuridicoUltimaHoja(data: any): Observable<any> {
    return this.http.put(
      environment.apiUrl + "/informeTecnicoJuridico/ultimaHoja/" + data.solicitudId,
      data
    );
  }

  putUpdateInformeTecnicoJuridicoTexts(data: any): Observable<any> {
    return this.http.put(
      environment.apiUrl + "/informeTecnicoJuridico/texts/" + data.solicitudId,
      data
    );
  }

  getInformacionVurByInformeTecnicoJuridicoId(
    informeTecnicoJuridicoId: number
  ): Observable<InformacionVur> {
    return this.http.get<InformacionVur>(
      environment.apiUrl + "/informeTecnicoJuridico/informacionVur/" + informeTecnicoJuridicoId
    );
  }

  postCreateInformacionVur(data: any) {
    return this.http.post<number>(
      environment.apiUrl + "/informeTecnicoJuridico/informacionVur",
      data
    );
  }

  putUpdateInformacionVur(data: any): Observable<any> {
    return this.http.put(
      environment.apiUrl +
        "/informeTecnicoJuridico/informacionVur/" +
        data.informeTecnicoJuridicoId,
      data
    );
  }

  getInformacionCatastralByInformeTecnicoJuridicoId(
    informeTecnicoJuridicoId: number
  ): Observable<InformacionCatastral> {
    return this.http.get<InformacionCatastral>(
      environment.apiUrl +
        "/informeTecnicoJuridico/informacionCatastral/" +
        informeTecnicoJuridicoId
    );
  }

  postCreateInformacionCatastral(data: any) {
    return this.http.post<number>(
      environment.apiUrl + "/informeTecnicoJuridico/informacionCatastral",
      data
    );
  }

  putUpdateInformacionCatastral(data: any): Observable<any> {
    return this.http.put(
      environment.apiUrl +
        "/informeTecnicoJuridico/informacionCatastral/" +
        data.informeTecnicoJuridicoId,
      data
    );
  }

  getInformacionPredialByInformeTecnicoJuridicoId(
    informeTecnicoJuridicoId: number
  ): Observable<InformacionPredial> {
    return this.http.get<InformacionPredial>(
      environment.apiUrl + "/informeTecnicoJuridico/informacionPredial/" + informeTecnicoJuridicoId
    );
  }

  postCreateInformacionPredial(data: any) {
    return this.http.post<number>(
      environment.apiUrl + "/informeTecnicoJuridico/informacionPredial",
      data
    );
  }

  putUpdateInformacionPredial(data: any): Observable<any> {
    return this.http.put(
      environment.apiUrl +
        "/informeTecnicoJuridico/informacionPredial/" +
        data.informeTecnicoJuridicoId,
      data
    );
  }

  getColindanteByid(colidanteId: number): Observable<Colindante> {
    return this.http.get<Colindante>(environment.apiUrl + "/colindante/" + colidanteId);
  }
}
