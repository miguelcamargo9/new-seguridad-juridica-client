import { Component, OnInit } from "@angular/core";
import { SolicitudService } from "../solicitudes.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Solicitud } from "../solicitudes.model";

@Component({
  selector: "app-versolicitud-cmp",
  templateUrl: "versolicitud.component.html"
})
export class VerSolicitudComponent implements OnInit {
  routeSub: Subscription;
  solicitudId: number;
  solicitud: Solicitud;

  constructor(
    private solicitudService: SolicitudService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.solicitudId = params["id"];
      this.solicitudService.getSolicitudById(params["id"]).subscribe(
        SolicitudData => {
          console.log(SolicitudData);
          this.solicitud = SolicitudData;
        },
        error => {
          console.log("Error Obteniendo el Objeto!" + error);
        }
      );
    });
  }
}
