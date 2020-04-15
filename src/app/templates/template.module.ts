import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../app.module";
import { RouterModule } from "@angular/router";
import { TemplateRoutes } from "./template.routing";
import { TemplateService } from "./template.service";
import { TemplateComponet } from "./template.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(TemplateRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [TemplateComponet],
  providers: [TemplateService],
})
export class TemplateModule {}
