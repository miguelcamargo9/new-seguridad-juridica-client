export class Seguimiento902EtapaCierre {
  id: number;
  seguimiento902Id: number;
  tipoDecisionDeCierreId: number;
  abogadoProyeccionCierreId: number;
  oposicion: boolean;
  motivoOposicion: string;
  fechaRadicadoOposicion: Date;
  fechaEnvioAFirmaDeSubdirectorCierre: Date;
  fechaRecibidoFirmaCierre: Date;
  fechaEnvioANumeracionCierre: Date;
  numeroDeResolucionDeCierre: string;
  fechaResolucionDeCierre: Date;
  notificacionPersonalCierre: boolean;
  fechaNotificacionPersonalCierre: Date;
  notificacionPorAvisoCierre: boolean;
  fechaFijacionNotificacionPorAvisoCierre: Date;
  publicacionResolucionCierre: boolean;
  fechaPublicacion: Date;
  recursoResolucionCierre: boolean;
  tipoRecursoId: number;
  numeroResolucionResuelveRecurso: string;
  fechaResolucionResuelveRecurso: Date;
}
