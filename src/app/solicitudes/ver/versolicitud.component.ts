import { Component, OnInit } from "@angular/core";
import { SolicitudService } from "../solicitudes.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Solicitud } from "../solicitudes.model";
import { ToastrService } from "ngx-toastr";
import { Persona } from "src/app/models/Persona";

@Component({
  selector: "app-versolicitud-cmp",
  templateUrl: "versolicitud.component.html"
})
export class VerSolicitudComponent implements OnInit {
  routeSub: Subscription;
  solicitudId: number;
  solicitud: Solicitud;
  solicitante: Persona;
  hasSeguimiento902: Boolean;

  constructor(
    private solicitudService: SolicitudService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.solicitudService.onSolicitudChanged.subscribe(
      solicitudData => {
        this.solicitud = solicitudData;
        this.hasSeguimiento902 = this.solicitudService.hasSeguimiento902;
        this.solicitante = solicitudData.personas.filter(persona => {
          return persona.tipoPersonaId === 1;
        })[0];
      },
      error => {
        this.toastr.error("Solicitud no encontrada", "Solicitud");
      }
    );
  }
}
