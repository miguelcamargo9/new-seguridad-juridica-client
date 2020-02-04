import { Routes } from "@angular/router";

import { CreateCompaniesComponent } from "./create/createcompanies.component";

export const CompaniesRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "create",
        component: CreateCompaniesComponent
      }
    ]
  }
];
