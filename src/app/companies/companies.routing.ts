import { Routes } from "@angular/router";

import { CreateCompaniesComponent } from "./create/createcompanies.component";
import { CompaniesListComponent } from "./list/listcompanies.component";
import { EditCompaniesComponent } from "./edit/editcompanies.component";
import { DeleteCompaniesComponent } from "./delete/deletecompanies.component";

export const CompaniesRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "create",
        component: CreateCompaniesComponent
      },
      {
        path: "all",
        component: CompaniesListComponent
      },
      {
        path: "edit/:id",
        component: EditCompaniesComponent
      },
      {
        path: "delete/:id",
        component: DeleteCompaniesComponent
      }
    ]
  }
];
