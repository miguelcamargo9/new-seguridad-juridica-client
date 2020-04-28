import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Template } from "./template.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TemplateService } from "./template.service";
import { ToastrService } from "ngx-toastr";
import * as ClassicEditor from "ckeditor5-build-alignment-b64image";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular";
import * as FileSaver from "file-saver";

@Component({
  selector: "app-template-component",
  templateUrl: "template.component.html",
})
export class TemplateComponet implements OnInit {
  tabs: Template[];
  templateForm: FormGroup;
  templateTitle: String = "Template";
  editor = ClassicEditor;
  solicitudId: number;
  reportType: String;
  nameFile: String;

  constructor(
    public activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private templateService: TemplateService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
      this.solicitudId = params.solicitudId;
      this.reportType = params.reportType;
      this.nameFile = params.nameFile;
      this.templateService.getTemplateCloseResolution(params.solicitudId).subscribe(
        (TemplateDataData) => {
          this.tabs = TemplateDataData;
        },
        (error) => {
          this.toastr.error("Solicitud no encontrada", "Templates");
        }
      );
      this.templateTitle = params.templateTitle;
      this.templateForm = this.formBuilder.group({
        textContent: [null, Validators.required],
      });
    });
  }

  onReady(editor) {
    editor
      .ui
      .getEditableElement()
      .parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());
  }

  onChange({ editor }: ChangeEvent, tabId: number) {
    const data = editor.getData();
    const objIndex = this.tabs.findIndex((obj) => obj.orden === tabId);
    this.tabs[objIndex].content = data;
  }

  onSubmit() {
    this.templateService.postTemplateCloseResolution(this.solicitudId, this.tabs).subscribe(
      (dataResult) => {
        this.tabs = dataResult;
        this.toastr.success("Información Guardada con Éxito", "Templates");
      },
      (error) => {
        this.toastr.error("Error Guardando los tabs", "Templates");
      }
    );
  }

  reloadTemplate() {
    this.templateService.getReloadTemplate(this.solicitudId, this.reportType, this.tabs).subscribe(
        (dataResult) => {
          this.tabs = dataResult;
        },
        (error) => {
          this.toastr.error("Solicitud no encontrada", "Templates");
        }
    );
    this.templateForm = this.formBuilder.group({
      textContent: [null, Validators.required],
    });
  }

    generatePDF() {
        this.templateService.getPDFTemplate(this.solicitudId, this.reportType).subscribe(data => {
          const blob = new Blob([data], {
            'type': 'application/pdf',
          });

          FileSaver.saveAs(blob, this.nameFile+'.pdf');
        });

    }
}
