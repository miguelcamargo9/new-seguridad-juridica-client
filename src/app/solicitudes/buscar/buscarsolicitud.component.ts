import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

interface TypeSeach {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-buscarsolicitud-cmp",
  templateUrl: "buscarsolicitud.component.html"
})
export class BuscarSolicitudComponent implements OnInit {
  typesSearch: TypeSeach[] = [
    { value: "expedienteSIT", viewValue: "Expediente SIT" },
    { value: "fiso", viewValue: "FISO" },
    { value: "cedulaCatastral", viewValue: "Cedula Catastral" }
  ];
  buscarSolicitud: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buscarSolicitud = this.formBuilder.group({
      searchValue: [null, [Validators.required]],
      typeSearch: [null, [Validators.required]]
    });
  }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      "has-error": this.isFieldValid(form, field),
      "has-feedback": this.isFieldValid(form, field)
    };
  }
}
