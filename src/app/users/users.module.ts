import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../app.module";

import { UsersRoutes } from "./users.routing";

import { CreateUserComponent } from "./create/createuser.component";
import { UserListComponent } from "./list/userlist.component";

import { UserService } from "./user.services";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UsersRoutes),
    FormsModule,
    MaterialModule
  ],
  declarations: [CreateUserComponent, UserListComponent],
  providers: [UserService]
})
export class UsersModule {}
