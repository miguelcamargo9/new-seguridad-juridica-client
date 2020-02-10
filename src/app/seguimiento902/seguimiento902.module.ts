import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "../app.module";
import { CrearSeguimiento902Component } from "./crear/crearseguimiento902.component";
import { Seguimiento902Routes } from "./seguimiento902.routing";
import { Seguimiento902Service } from "./seguimiento902.service";
import { DomainService } from "../domains/domain.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Seguimiento902Routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [CrearSeguimiento902Component],
  providers: [Seguimiento902Service, DomainService]
})
export class Seguimiento902Module { }
