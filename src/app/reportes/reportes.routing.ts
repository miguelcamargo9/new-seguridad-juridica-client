import { Routes } from "@angular/router";

import { ReporteSeguimiento902Component } from "./descargables/reporteSeguimiento902/reporteSeguimiento902.component";

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
