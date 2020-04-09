import { NgModule } from "@angular/core";
import { MaterialModule } from "../app.module";
import { RouterModule } from "@angular/router";

import { ReportRoutes } from "./reportes.routing";
import { ReportsService } from "./reportes.service";
import {ReporteSeguimiento902Component} from "./descargables/reporteSeguimiento902/reporteseguimiento902.component";


@NgModule({
  imports: [RouterModule.forChild(ReportRoutes), MaterialModule],
  declarations: [ReporteSeguimiento902Component],
  providers: [ReportsService]
})
export class ReportesModule {}
