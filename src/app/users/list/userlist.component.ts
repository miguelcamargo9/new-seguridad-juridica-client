// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.services";
import { User } from "../user.model";
import { Subject } from "rxjs";

@Component({
  selector: "app-user-list-cmp",
  templateUrl: "userlist.component.html"
})
export class UserListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  users: User[];
  dtTrigger: Subject<any> = new Subject();

  constructor(private userService: UserService) {}

  ngOnInit() {
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
