import { Component, OnInit } from "@angular/core";
import { CompanyService } from "../companies.service";
import { Company } from "../company.model";
import { Subject } from "rxjs/Subject";

@Component({
  selector: "app-companies",
  templateUrl: "listcompanies.component.html"
})
export class CompaniesListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  companies: Company[];
  dtTrigger: Subject<any> = new Subject();

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(
      companiesData => {
        console.log(companiesData);
        this.companies = companiesData;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      },
      error => {
        console.log("There was an error while retrieving Usuarios!" + error);
      }
    );
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
