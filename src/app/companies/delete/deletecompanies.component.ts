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
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

declare var $: any;

@Component({
  selector: "app-delete-companies-cmp",
  templateUrl: "deletecompanies.component.html"
})
export class DeleteCompaniesComponent {
  businessNameFormControl = new FormControl("", [Validators.required]);

  validTextType: boolean = false;

  matcher = new MyErrorStateMatcher();
  createComany: FormGroup;

  validBusinessName: boolean = false;
  validDocumentNumber: boolean = false;
  validRut: boolean = false;

  routeSub: Subscription;

  companyId: Number;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private toastr: ToastrService,
    private route: ActivatedRoute
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
        id: this.companyId,
        businessName: val.businessName,
        documentNumber: val.documentNumber,
        rut: val.rut,
        status: false
      };
      this.companyService.postUpdateCompany(data).subscribe(
        data => {
          this.toastr.success("Compañia editada con exito", "Compañia");
          // this.router.navigate([environment.pathInit]);
        },
        err => {
          this.toastr.error("Error al editar la compañia", "Compañia");
          console.error(err);
        },
        () => {
          console.log("Company fin is updated");
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
      businessName: [{ value: null, disabled: true }, [Validators.required]],
      documentNumber: [{ value: null, disabled: true }, [Validators.required]],
      rut: [{ value: null, disabled: true }, [Validators.required]],
      status: [{ value: null, disabled: true }, [Validators.required]]
    });
    this.routeSub = this.route.params.subscribe(params => {
      this.companyId = params["id"];
      this.companyService.getCompanyById(params["id"]).subscribe(
        companiesData => {
          this.createComany.controls["businessName"].setValue(
            companiesData.businessName
          );
          this.createComany.controls["documentNumber"].setValue(
            companiesData.documentNumber
          );
          this.createComany.controls["rut"].setValue(companiesData.rut);
          const status = companiesData.status ? "Activo" : "Inactivo";
          this.createComany.controls["status"].setValue(status);
        },
        error => {
          console.log("Error Obteniendo el Objeto!" + error);
        }
      );
    });
  }

  textValidationType(e) {
    if (e) {
      this.validTextType = true;
    } else {
      this.validTextType = false;
    }
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
