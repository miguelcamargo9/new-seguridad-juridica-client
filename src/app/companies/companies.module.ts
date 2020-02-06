import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";

import { MaterialModule } from "../app.module";
import { CompaniesRoutes } from "./companies.routing";

import { CreateCompaniesComponent } from "./create/createcompanies.component";
import { FieldErrorDisplayComponent } from "../components/field-error-display/field-error-display.component";
import { CompanyService } from "./companies.service";
import { CompaniesListComponent } from "./list/listcompanies.component";
import { EditCompaniesComponent } from "./edit/editcompanies.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CompaniesRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DataTablesModule
  ],
  declarations: [
    CreateCompaniesComponent,
    EditCompaniesComponent,
    CompaniesListComponent,
    FieldErrorDisplayComponent
  ],
  providers: [CompanyService]
})
export class CompaniesModule {}
