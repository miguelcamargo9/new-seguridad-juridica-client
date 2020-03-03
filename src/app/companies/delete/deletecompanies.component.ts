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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onSubmit() {
    this.companyService.deleteDeleteCompany(this.companyId).subscribe(
      data => {
        this.toastr.success("Compañia eliminada con exito", "Compañia");
        this.router.navigate(["/companies/all"]);
      },
      err => {
        this.toastr.error("Error al eliminar la compañia", "Compañia");
        console.error(err);
      },
      () => {
        console.log("Company fin is deleted");
      }
    );
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

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
