// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.services";
import { User } from "../user.model";
import { Subject } from "rxjs";
import { Roles } from "src/app/roles/roles.model";
import { RolesService } from "src/app/roles/roles.services";
import {DomainBoolean} from "../../seguimiento902/DomainBoolean.model";

@Component({
  selector: "app-user-list-cmp",
  templateUrl: "userlist.component.html"
})
export class UserListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  users: User[];
  dtTrigger: Subject<any> = new Subject();
  roles: Roles[];

  constructor(private userService: UserService, private rolesService: RolesService) { }

  ngOnInit() {
    this.rolesService.getRoles().subscribe(
      rolesData => {
        this.roles = rolesData;
      },
      error => {
        console.log("There was an error while retrieving Roles!" + error);
      }
    );
    this.userService.getUsers().subscribe(
      dataUsers => {
        this.users = dataUsers;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      },
      error => {
        // this.toastr.error('Error al iniciar sesión', 'Login');
        console.log("There was an error while retrieving Usuarios!" + error);
      }
    );
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
