import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SidebarComponent } from "./sidebar.component";
import { HasPermissionDirective } from "../directives/hasPermssions.directive";

@NgModule({
  imports: [RouterModule, CommonModule],
  declarations: [SidebarComponent, HasPermissionDirective],
  exports: [SidebarComponent]
})
export class SidebarModule {}
