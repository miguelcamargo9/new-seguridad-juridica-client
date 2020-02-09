import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "../app.module";
import { CrearSolicitudComponent } from "./crear/crearsolicitud.component";
import { SolicitudesRoutes } from "./solicitudes.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SolicitudesRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [CrearSolicitudComponent]
})
export class SolicitudModule {}
