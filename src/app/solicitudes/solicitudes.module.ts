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
import { DataTablesModule } from "angular-datatables";
import { VerSolicitudComponent } from "./ver/versolicitud.component";
import { EditarSolicitudComponent } from "./editar/editarsolicitud.component";
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS } from "../core/format-datepicker/format-datepicker";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SolicitudesRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    UtilsModule,
    DataTablesModule,
  ],
  declarations: [
    CrearSolicitudComponent,
    BuscarSolicitudComponent,
    VerSolicitudComponent,
    EditarSolicitudComponent,
  ],
  providers: [
    DomainService,
    SolicitudService,
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class SolicitudModule {}
