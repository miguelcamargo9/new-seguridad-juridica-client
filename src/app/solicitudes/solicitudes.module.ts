import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule, UtilsModule } from "../app.module";
import { CrearSolicitudComponent } from "./crear/crearsolicitud.component";
import { SolicitudesRoutes } from "./solicitudes.routing";
import { DomainService } from "../domains/domain.service";
import { SolicitudService } from "./solicitudes.service";
import { BuscarSolicitudComponent } from "./buscar/buscarsolicitud.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SolicitudesRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    UtilsModule
  ],
  declarations: [CrearSolicitudComponent, BuscarSolicitudComponent],
  providers: [DomainService, SolicitudService]
})
export class SolicitudModule { }
