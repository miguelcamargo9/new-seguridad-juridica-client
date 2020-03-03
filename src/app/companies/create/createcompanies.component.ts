import { Component } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
  FormBuilder
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { CompanyService } from "../companies.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

declare var $: any;

@Component({
  selector: "app-create-companies-cmp",
  templateUrl: "createcompanies.component.html"
})
export class CreateCompaniesComponent {
  businessNameFormControl = new FormControl("", [Validators.required]);

  validTextType: boolean = false;

  matcher = new MyErrorStateMatcher();
  createComany: FormGroup;

  validBusinessName: boolean = false;
  validDocumentNumber: boolean = false;
  validRut: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      "has-error": this.isFieldValid(form, field),
      "has-feedback": this.isFieldValid(form, field)
    };
  }

  onSubmit() {
    if (this.createComany.valid) {
      const val = this.createComany.value;

      const data = {
        businessName: val.businessName,
        documentNumber: val.documentNumber,
        rut: val.rut
      };
      this.companyService.postCreateCompany(data).subscribe(
        data => {
          this.toastr.success("Compañia creada con exito", "Compañia");
          this.router.navigate(["/companies/all"]);
        },
        err => {
          this.toastr.error("Error creando la compañia", "Compañia");
          console.error(err);
        },
        () => {
          console.log("Company fin is created");
        }
      );
    } else {
      this.validateAllFormFields(this.createComany);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  ngOnInit() {
    this.createComany = this.formBuilder.group({
      businessName: [null, [Validators.required]],
      documentNumber: [null, [Validators.required]],
      rut: [null, [Validators.required]]
    });
  }

  textValidationType(e) {
    if (e) {
      this.validTextType = true;
    } else {
      this.validTextType = false;
    }
  }
}
