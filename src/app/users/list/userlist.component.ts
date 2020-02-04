// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit, AfterViewInit } from "@angular/core";
import { UserService } from "../user.services";
import { User } from "../user.model";

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: User[];
}

declare const $: any;

@Component({
  selector: "app-user-list-cmp",
  templateUrl: "userlist.component.html"
})
export class UserListComponent implements OnInit, AfterViewInit {
  public dataTable: DataTable;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(
      x => {
        this.dataTable = {
          headerRow: [
            "Nombre",
            "Nickname",
            "Correo",
            "Documento",
            "Compañia",
            "Rol",
            "Actions"
          ],
          footerRow: [
            "Nombre",
            "Nickname",
            "Correo",
            "Documento",
            "Compañia",
            "Rol",
            "Actions"
          ],
          dataRows: x
        };
      },
      error => {
        // this.toastr.error('Error al iniciar sesión', 'Login');
        console.log("There was an error while retrieving Usuarios!" + error);
      }
    );
  }

  ngAfterViewInit() {
    $("#datatables").DataTable({
      pagingType: "full_numbers",
      lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records"
      }
    });

    const table = $("#datatables").DataTable();

    // Edit record
    table.on("click", ".edit", function(e) {
      let $tr = $(this).closest("tr");
      if ($($tr).hasClass("child")) {
        $tr = $tr.prev(".parent");
      }

      var data = table.row($tr).data();
      alert(
        "You press on Row: " +
          data[0] +
          " " +
          data[1] +
          " " +
          data[2] +
          "'s row."
      );
      e.preventDefault();
    });

    // Delete a record
    table.on("click", ".remove", function(e) {
      const $tr = $(this).closest("tr");
      table
        .row($tr)
        .remove()
        .draw();
      e.preventDefault();
    });

    //Like record
    table.on("click", ".like", function(e) {
      alert("You clicked on Like button");
      e.preventDefault();
    });

    $(".card .material-datatables label").addClass("form-group");
  }
}
