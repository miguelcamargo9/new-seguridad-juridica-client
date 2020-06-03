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
import { ActivatedRoute, Router } from "@angular/router";
import {DomainBoolean} from "../../seguimiento902/DomainBoolean.model";

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
  selector: "app-edit-companies-cmp",
  templateUrl: "editcompanies.component.html"
})
export class EditCompaniesComponent {
  businessNameFormControl = new FormControl("", [Validators.required]);

  validTextType: boolean = false;

  matcher = new MyErrorStateMatcher();
  createComany: FormGroup;

  validBusinessName: boolean = false;
  validDocumentNumber: boolean = false;
  validRut: boolean = false;
  tipoSiNo: DomainBoolean[];

  routeSub: Subscription;

  companyId: Number;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.tipoSiNo = [new DomainBoolean(false, "Inactivo"), new DomainBoolean(true, "Activo")];
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

  onSubmit() {
    if (this.createComany.valid) {
      const val = this.createComany.value;

      const data = {
        id: this.companyId,
        businessName: val.businessName,
        documentNumber: val.documentNumber,
        rut: val.rut,
        status: val.status
      };
      this.companyService.putUpdateCompany(data).subscribe(
        data => {
          this.toastr.success("Compañia editada con exito", "Compañia");
          this.router.navigate(["/companies/all"]);
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
      businessName: [null, [Validators.required]],
      documentNumber: [null,[]],
      rut: [null, []],
      status: [null, [Validators.required]]
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
          this.createComany.controls["status"].setValue(companiesData.status);
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
