import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Domain } from "./domain.model";
import { Departament } from "../models/Deparamento";
import { Municipio } from "../models/Municipio";

@Injectable()
export class DomainService {
  constructor(private http: HttpClient) {}

  getTipoCondicionSolicitante(): Observable<Domain[]> {
    return this.http.get<Domain[]>(environment.apiUrl + "/domains/tipoCondicionSolicitante");
  }
  getTipoPruebaUnion(): Observable<Domain[]> {
    return this.http.get<Domain[]>(environment.apiUrl + "/domains/tipoPruebaUnion");
  }
  getTipoRecurso(): Observable<Domain[]> {
    return this.http.get<Domain[]>(environment.apiUrl + "/domains/tipoRecurso");
  }
  getTipoDeActo(): Observable<Domain[]> {
    return this.http.get<Domain[]>(environment.apiUrl + "/domains/tipoDeActo");
  }
  getTipoDeDecisionDeCierre(): Observable<Domain[]> {
    return this.http.get<Domain[]>(environment.apiUrl + "/domains/tipoDeDecisionDeCierre");
  }
  getTipoDeNoViabilidad(): Observable<Domain[]> {
    return this.http.get<Domain[]>(environment.apiUrl + "/domains/tipoDeNoViabilidad");
  }
  getTipoDocumento(): Observable<Domain[]> {
    return this.http.get<Domain[]>(environment.apiUrl + "/domains/tipoDocumento");
  }
  getTipoEstadoInformeTecnicoJuridico(): Observable<Domain[]> {
    return this.http.get<Domain[]>(
      environment.apiUrl + "/domains/tipoEstadoInformeTecnicoJuridico"
    );
  }
  getTipoEstadoSinegia(): Observable<Domain[]> {
    return this.http.get<Domain[]>(environment.apiUrl + "/domains/tipoEstadoSinegia");
  }
  getTipoMedidaCautelar(): Observable<Domain[]> {
    return this.http.get<Domain[]>(environment.apiUrl + "/domains/tipoMedidaCautelar");
  }
  getTipoMedidaDeProteccionUrt(): Observable<Domain[]> {
    return this.http.get<Domain[]>(environment.apiUrl + "/domains/tipoMedidaDeProteccionUrt");
  }
  getTipoPersona(): Observable<Domain[]> {
    return this.http.get<Domain[]>(environment.apiUrl + "/domains/tipoPersona");
  }
  getTipoPruebaAportada(): Observable<Domain[]> {
    return this.http.get<Domain[]>(environment.apiUrl + "/domains/tipoPruebaAportada");
  }
  getTipoRuta(): Observable<Domain[]> {
    return this.http.get<Domain[]>(environment.apiUrl + "/domains/tipoRuta");
  }
  getTipoSexo(): Observable<Domain[]> {
    return this.http.get<Domain[]>(environment.apiUrl + "/domains/tipoSexo");
  }
  getTipoSoporteValoracion(): Observable<Domain[]> {
    return this.http.get<Domain[]>(environment.apiUrl + "/domains/tipoSoporteValoracion");
  }
  getTipoTieneViabilidadJuridica(): Observable<Domain[]> {
    return this.http.get<Domain[]>(environment.apiUrl + "/domains/tipoTieneViabilidadJuridica");
  }
  getDepartamentos(): Observable<Departament[]> {
    return this.http.get<Departament[]>(environment.apiUrl + "/domains/departamentos");
  }
  getMunicipiosPorDepartamento(departamentoId): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(environment.apiUrl + "/domains/municipios/" + departamentoId);
  }
  getUsersByRol(idRol): Observable<Domain[]> {
    return this.http.get<Domain[]>(environment.apiUrl + "/users/usersByRol/" + idRol);
  }
  getTipoMotivoSuspension(): Observable<Domain[]> {
    return this.http.get<Domain[]>(environment.apiUrl + "/domains/tipoMotivoSuspension");
  }
  getTipoMotivoDeCorreccionSinergia(): Observable<Domain[]> {
    return this.http.get<Domain[]>(environment.apiUrl + "/domains/tipoMotivoDeCorreccionSinergia");
  }
  getTipoViabilidadTecnica(): Observable<Domain[]> {
    return this.http.get<Domain[]>(environment.apiUrl + "/domains/tipoViabilidadTecnica");
  }
}
