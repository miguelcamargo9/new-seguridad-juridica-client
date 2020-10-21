import { Persona } from "../models/Persona";

export class Solicitud {
  id: number;
  tipoProcesoId: number;
  expedienteSit: string;
  fiso: string;
  fechaFiso: Date;
  departamentoId: number;
  municipioId: number;
  departamento: string;
  municipio: string;
  corregimiento: string;
  vereda: string;
  condicionDelSolicitante: number;
  pruebaUnion: number;
  nombreDelPredioAFormalizar: string;
  folioDeMatriculaInmobiliaria: string;
  numeroPredialNacional: string;
  predioDeMayorExtension: boolean;
  nombrePredioMayorExtension: string;
  areaSolicitada: number;
  personas: Persona[];
}
