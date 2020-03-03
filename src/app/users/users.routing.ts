import { Routes } from "@angular/router";

import { CreateUserComponent } from "./create/createuser.component";
import { UserListComponent } from "./list/userlist.component";
import { AuthGuard } from "../core/security/guard";
import { EditUserComponent } from "./edit/edituser.component";

export const UsersRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "create",
        component: CreateUserComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ["CreateUserComponent"]
        }
      },
      {
        path: "list",
        component: UserListComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ["UserListComponent"]
        }
      },
      {
        path: "edit/:id",
        component: EditUserComponent
      }
    ]
  }
];
