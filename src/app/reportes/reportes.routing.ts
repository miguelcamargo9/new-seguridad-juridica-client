import { Routes } from "@angular/router";

import { ReporteSeguimiento902Component } from "./descargables/reporteSeguimiento902/reporteseguimiento902.component";

export const ReportRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "descargables",
        component: ReporteSeguimiento902Component
      }
    ]
  }
];
