import { NgModule, LOCALE_ID } from "@angular/core";

import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule, UtilsModule } from "../app.module";
import { CrearInformeTecnicoJuridicoComponent } from "./crear/CrearInformeTecnicoJuridico.component";
import { InformeTecnicoJuridicoRoutes } from "./informeTecnicoJuridico.routing";
import { InformeTecnicoJuridicoService } from "./informeTecnicoJuridico.service";
import { DomainService } from "../domains/domain.service";
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS } from "../core/format-datepicker/format-datepicker";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(InformeTecnicoJuridicoRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    UtilsModule,
    CKEditorModule,
  ],
  declarations: [CrearInformeTecnicoJuridicoComponent],
  providers: [
    InformeTecnicoJuridicoService,
    DomainService,
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class InformeTecnicoJuridicoModule {}
