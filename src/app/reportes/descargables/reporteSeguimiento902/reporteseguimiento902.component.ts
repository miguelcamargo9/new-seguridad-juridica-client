import {Component} from "@angular/core";

import {ReportsService} from "../../reportes.service";
import {environment} from "../../../../environments/environment";
import * as FileSaver from "file-saver";

@Component({
    selector: "app-reporte-seguimiento902-cmp",
    templateUrl: "reporteseguimiento902.component.html"
})
export class ReporteSeguimiento902Component {
    constructor(private reportsService: ReportsService) {
    }

    downloadFile() {
        this.reportsService.getReporteSeguimiento902().subscribe(data => {
            const blob = new Blob([data], {
                'type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

          FileSaver.saveAs(blob, 'reporte902.xlsx');
        });
    }
}
