import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../app.module";

import { CompaniesRoutes } from "./companies.routing";

import { CreateCompaniesComponent } from "./create/createcompanies.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CompaniesRoutes),
    FormsModule,
    MaterialModule
  ],
  declarations: [CreateCompaniesComponent]
})
export class CompaniesModule {}
