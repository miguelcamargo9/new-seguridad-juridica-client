// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit, AfterViewInit } from "@angular/core";

declare interface CreateUserInterface {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: "app-create-user",
  templateUrl: "createuser.component.html"
})
export class CreateUserComponent implements OnInit, AfterViewInit {
  public dataTable: CreateUserInterface;

  ngOnInit() {
    this.dataTable = {
      headerRow: ["Name", "Position", "Office", "Age", "Date", "Actions"],
      footerRow: ["Name", "Position", "Office", "Age", "Start Date", "Actions"],

      dataRows: [
        ["Airi Satou", "Andrew Mike", "Develop", "2013", "99,225", ""],
        ["Angelica Ramos", "John Doe", "Design", "2012", "89,241", "btn-round"],
        ["Ashton Cox", "Alex Mike", "Design", "2010", "92,144", "btn-simple"],
        [
          "Bradley Greer",
          "Mike Monday",
          "Marketing",
          "2013",
          "49,990",
          "btn-round"
        ],
        [
          "Brenden Wagner",
          "Paul Dickens",
          "Communication",
          "2015",
          "69,201",
          ""
        ]
      ]
    };
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
