import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule, UtilsModule } from "../app.module";

import { UsersRoutes } from "./users.routing";

import { CreateUserComponent } from "./create/createuser.component";
import { UserListComponent } from "./list/userlist.component";

import { UserService } from "./user.services";
import { DataTablesModule } from "angular-datatables";
import { DomainService } from "../domains/domain.service";
import { RolesService } from "../roles/roles.services";
import { CompanyService } from "../companies/companies.service";
import { EditUserComponent } from "./edit/edituser.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UsersRoutes),
    FormsModule,
    MaterialModule,
    DataTablesModule,
    UtilsModule,
    ReactiveFormsModule
  ],
  declarations: [CreateUserComponent, UserListComponent, EditUserComponent],
  providers: [UserService, DomainService, RolesService, CompanyService]
})
export class UsersModule { }
