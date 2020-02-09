import { Routes } from "@angular/router";

import { CrearSolicitudComponent } from "./crear/crearsolicitud.component";

export const SolicitudesRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "crear",
        component: CrearSolicitudComponent
      }
    ]
  }
];
