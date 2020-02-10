import { Routes } from "@angular/router";

import { CrearSeguimiento902Component as Seguimiento902Component } from "./crear/crearseguimiento902.component";

export const Seguimiento902Routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "editar/:idSolicitud",
        component: Seguimiento902Component
      }
    ]
  }
];
