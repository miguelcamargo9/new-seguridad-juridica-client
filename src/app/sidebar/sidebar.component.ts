import { Component, OnInit } from "@angular/core";
import PerfectScrollbar from "perfect-scrollbar";
import { JwtHelper } from "angular2-jwt";
import { environment } from "src/environments/environment";

declare const $: any;

//Metadata
export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  children?: ChildrenItems[];
  permission?: string;
}

export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
  permission?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "dashboard",
    permission: "DashboardModule"
  },
  {
    path: "/users",
    title: "Usuarios",
    type: "sub",
    icontype: "people",
    collapse: "users",
    permission: "UsersModule",
    children: [
      {
        path: "list",
        title: "Usuarios",
        ab: "US",
        permission: "UserListComponent"
      },
      {
        path: "create",
        title: "Crear Usuario",
        ab: "CU",
        permission: "CreateUserComponent"
      }
    ]
  },
  {
    path: "/companies",
    title: "Compañias",
    type: "sub",
    icontype: "work",
    collapse: "company",
    children: [
      {
        path: "all",
        title: "Compañias",
        ab: "CM"
      },
      {
        path: "create",
        title: "Crear Compañia",
        ab: "CC"
      }
    ]
  },
  {
    path: "/solicitudes",
    title: "Solicitudes",
    type: "sub",
    icontype: "chrome_reader_mode",
    collapse: "request",
    children: [
      {
        path: "buscar",
        title: "Buscar Solicitud",
        ab: "SO"
      },
      {
        path: "crear",
        title: "Crear Solicitud",
        ab: "CS"
      }
    ]
  },
  {
    path: "/reportes",
    title: "Reportes",
    type: "sub",
    icontype: "assessment",
    collapse: "reports",
    children: [
      {
        path: "descargables",
        title: "Descargables",
        ab: "DS"
      }
    ]
  },
  {
    path: "/pages/login/closeSession",
    title: "Cerrar Sesión",
    type: "link",
    icontype: "exit_to_app"
  }

  //   {
  //     path: "/components",
  //     title: "Components",
  //     type: "sub",
  //     icontype: "apps",
  //     collapse: "components",
  //     children: [
  //       { path: "buttons", title: "Buttons", ab: "B" },
  //       { path: "sweet-alert", title: "Sweet Alert", ab: "SA" },
  //       { path: "notifications", title: "Notifications", ab: "N" },
  //       { path: "icons", title: "Icons", ab: "I" },
  //       { path: "typography", title: "Typography", ab: "T" }
  //     ]
  //   },
];
@Component({
  selector: "app-sidebar-cmp",
  templateUrl: "sidebar.component.html"
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  ps: any;
  userName: String;
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  ngOnInit() {
    const jwtHelper: JwtHelper = new JwtHelper();
    const token = localStorage.getItem(environment.keyToken);

    if (token && !jwtHelper.isTokenExpired(token)) {
      const user = jwtHelper.decodeToken(token);
      this.userName = user.sub;
    }
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemSidebar = <HTMLElement>document.querySelector(".sidebar .sidebar-wrapper");
      this.ps = new PerfectScrollbar(elemSidebar);
    }
  }
  updatePS(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      this.ps.update();
    }
  }
  isMac(): boolean {
    let bool = false;
    if (
      navigator.platform.toUpperCase().indexOf("MAC") >= 0 ||
      navigator.platform.toUpperCase().indexOf("IPAD") >= 0
    ) {
      bool = true;
    }
    return bool;
  }
}
