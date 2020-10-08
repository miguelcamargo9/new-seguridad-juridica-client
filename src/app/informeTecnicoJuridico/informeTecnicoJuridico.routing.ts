import { Routes } from "@angular/router";

import { CrearInformeTecnicoJuridicoComponent } from "./crear/CrearInformeTecnicoJuridico.component";

export const InformeTecnicoJuridicoRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "editar/:idSolicitud",
        component: CrearInformeTecnicoJuridicoComponent,
      },
    ],
  },
];
