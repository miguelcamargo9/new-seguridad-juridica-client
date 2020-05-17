import { Component, OnInit } from "@angular/core";
import { CompanyService } from "../companies.service";
import { Company } from "../company.model";
import { Subject } from "rxjs/Subject";
import {DomainBoolean} from "../../seguimiento902/DomainBoolean.model";

@Component({
  selector: "app-companies",
  templateUrl: "listcompanies.component.html"
})
export class CompaniesListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  companies: Company[];
  dtTrigger: Subject<any> = new Subject();
  tipoSiNo: DomainBoolean[];

  constructor(private companyService: CompanyService) {
    this.tipoSiNo = [new DomainBoolean(false, "No"), new DomainBoolean(true, "Si")];
  }

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
