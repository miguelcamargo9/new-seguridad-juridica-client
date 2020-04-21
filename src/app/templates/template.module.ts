import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../app.module";
import { RouterModule } from "@angular/router";
import { TemplateRoutes } from "./template.routing";
import { TemplateService } from "./template.service";
import { TemplateComponet } from "./template.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FroalaEditorModule, FroalaViewModule } from "angular-froala-wysiwyg";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(TemplateRoutes),
    FormsModule,
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    CKEditorModule,
  ],
  declarations: [TemplateComponet],
  providers: [TemplateService],
})
export class TemplateModule {}
