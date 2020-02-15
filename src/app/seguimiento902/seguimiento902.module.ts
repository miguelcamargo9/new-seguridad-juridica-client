import { NgModule, LOCALE_ID } from "@angular/core";

import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule, FieldErrorModule } from "../app.module";
import { CrearSeguimiento902Component } from "./crear/crearseguimiento902.component";
import { Seguimiento902Routes } from "./seguimiento902.routing";
import { Seguimiento902Service } from "./seguimiento902.service";
import { DomainService } from "../domains/domain.service";
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS } from "../core/format-datepicker/format-datepicker";
import { FieldErrorDisplayComponent } from "../components/field-error-display/field-error-display.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Seguimiento902Routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FieldErrorModule
  ],
  declarations: [CrearSeguimiento902Component],
  providers: [Seguimiento902Service, DomainService,
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class Seguimiento902Module { }
