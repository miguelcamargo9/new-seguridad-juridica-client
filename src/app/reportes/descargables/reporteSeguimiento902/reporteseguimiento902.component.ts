import { Component } from "@angular/core";

import { ReportsService } from "../../reportes.service";

@Component({
  selector: "app-reporte-seguimiento902-cmp",
  templateUrl: "reporteseguimiento902.component.html"
})
export class ReporteSeguimiento902Component {
  constructor(private reportsService: ReportsService) {}
  downloadFile() {
    this.reportsService.getReporteSeguimiento902().subscribe(data => {
      const blob = new Blob([data], {
        type: "application/vnd.ms-excel"
      });
      const a = document.createElement("a");
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = "ReporteSeguimiento902.xls";
      a.click();
      // window.open(url);
    });
  }
}
