import { Component, OnInit } from "@angular/core";
import { SolicitudService } from "../solicitudes.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Solicitud } from "../solicitudes.model";
import { ToastrService } from "ngx-toastr";

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
    private router: Router,
    private toastr: ToastrService
  ) { }
  ngOnInit() {
    this.solicitudService.onSolicitudChanged.subscribe(
      solicitudData => {
        this.solicitud = solicitudData;
      }, error => {
        this.toastr.error("Solicitud no encontrada", "Solicitud");
      }
    );
  }
}
