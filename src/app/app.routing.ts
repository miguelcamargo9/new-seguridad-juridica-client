import { Routes } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth/auth-layout.component";
import { AuthGuard } from "./core/security/guard";

export const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: "./dashboard/dashboard.module#DashboardModule"
      },
      {
        path: "users",
        loadChildren: "./users/users.module#UsersModule"
      },
      {
        path: "companies",
        loadChildren: "./companies/companies.module#CompaniesModule"
      },
      {
        path: "solicitudes",
        loadChildren: "./solicitudes/solicitudes.module#SolicitudModule"
      },
      {
        path: "seguimiento902",
        loadChildren: "./seguimiento902/seguimiento902.module#Seguimiento902Module"
      },
      {
        path: "reportes",
        loadChildren: "./reportes/reportes.module#ReportesModule"
      },
      {
        path: "",
        loadChildren: "./userpage/user.module#UserModule"
      },
      {
        path: "",
        loadChildren: "./timeline/timeline.module#TimelineModule"
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "pages",
        loadChildren: "./pages/pages.module#PagesModule"
      }
    ]
  }
];
