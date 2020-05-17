import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.services";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { DomainService } from "src/app/domains/domain.service";
import { Domain } from "src/app/domains/domain.model";
import { RolesService } from "src/app/roles/roles.services";
import { Roles } from "src/app/roles/roles.model";
import { CompanyService } from "src/app/companies/companies.service";
import { Company } from "src/app/companies/company.model";

@Component({
  selector: "app-create-user",
  templateUrl: "createuser.component.html"
})
export class CreateUserComponent implements OnInit {
  createUser: FormGroup;
  tiposDocumento: Domain[];
  roles: Roles[];
  companies: Company[];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private rolesService: RolesService,
    private domainServcie: DomainService,
    private companiesService: CompanyService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getDomains();
    this.createUser = this.formBuilder.group(
      {
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        nickName: [null, [Validators.required]],
        email: [
          null,
          [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]
        ],
        typeDocument: [null, [Validators.required]],
        documentNumber: [null, [Validators.required]],
        role: [null, [Validators.required]],
        company: [null, [Validators.required]],
        expireDate: [null, [Validators.required]],
        // password: ["", Validators.compose([Validators.required, Validators.minLength(6)])],
        // passwordConfirm: ["", [Validators.required]]
      },
      // {
      //   validator: PasswordValidationUser.MatchPassword // your validation method
      // }
    );
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      "has-error": this.isFieldValid(form, field),
      "has-feedback": this.isFieldValid(form, field)
    };
  }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  getDomains() {
    this.domainServcie.getTipoDocumento().subscribe(
      tiposDocumentosData => {
        this.tiposDocumento = tiposDocumentosData;
      },
      error => {
        console.log("There was an error while retrieving Tipo Documento!" + error);
      }
    );
    this.rolesService.getRoles().subscribe(
      rolesData => {
        this.roles = rolesData;
      },
      error => {
        console.log("There was an error while retrieving Roles!" + error);
      }
    );
    this.companiesService.getCompanies().subscribe(
      companiesData => {
        this.companies = companiesData;
      },
      error => {
        console.log("There was an error while retrieving Companies!" + error);
      }
    );
  }

  onSubmit() {
    if (this.createUser.valid) {
      const formData = this.createUser.value;
      const data = {
        companyId: formData.company,
        documentNumber: formData.documentNumber,
        documentTypeId: formData.typeDocument,
        email: formData.email,
        firstname: formData.firstName,
        lastname: formData.lastName,
        // password: formData.password,
        username: formData.nickName,
        roleId: formData.role,
        expireDate: formData.expireDate,
        active: true
      };
      this.userService.postCreateUser(data).subscribe(params => {
        // console.log("Result create: ", params);
        if (params == true) {
          this.toastr.success("Usuario creado con exito", "Usuario");
          this.router.navigate(["/users/list"]);
        } else {
          this.toastr.error("Error creando el usuario!", "Usuario");
        }
      });
    } else {
      this.toastr.error("Formulario Invalido", "Usuarios");
    }
  }
}
