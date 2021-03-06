import { Routes } from "@angular/router";

import { CrearSolicitudComponent } from "./crear/crearsolicitud.component";
import { BuscarSolicitudComponent } from "./buscar/buscarsolicitud.component";
import { VerSolicitudComponent } from "./ver/versolicitud.component";
import { SolicitudService } from "./solicitudes.service";
import { EditarSolicitudComponent } from "./editar/editarsolicitud.component";

export const SolicitudesRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "crear",
        component: CrearSolicitudComponent
      },
      {
        path: "buscar",
        component: BuscarSolicitudComponent
      },
      {
        path: "ver/:id",
        component: VerSolicitudComponent,
        resolve: {
          data: SolicitudService
        }
      },
      {
        path: "editar/:id",
        component: EditarSolicitudComponent
      }
    ]
  }
];
