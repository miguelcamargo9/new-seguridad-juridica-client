import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.services";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { DomainService } from "src/app/domains/domain.service";
import { Domain } from "src/app/domains/domain.model";
import { RolesService } from "src/app/roles/roles.services";
import { Roles } from "src/app/roles/roles.model";
import { CompanyService } from "src/app/companies/companies.service";
import { Company } from "src/app/companies/company.model";
import { Subscription } from "rxjs";
import swal from "sweetalert2";

@Component({
  selector: "app-edit-user",
  templateUrl: "edituser.component.html"
})
export class EditUserComponent implements OnInit {
  editUser: FormGroup;
  tiposDocumento: Domain[];
  roles: Roles[];
  companies: Company[];
  routeSub: Subscription;
  userId: Number;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private rolesService: RolesService,
    private domainServcie: DomainService,
    private companiesService: CompanyService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getDomains();
    this.editUser = this.formBuilder.group({
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
      company: [null, [Validators.required]]
    });
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params["id"];
      this.userService.getUserById(this.userId).subscribe(
        userData => {
          this.editUser.controls["firstName"].setValue(userData.firstname);
          this.editUser.controls["lastName"].setValue(userData.lastname);
          this.editUser.controls["nickName"].setValue(userData.username);
          this.editUser.controls["email"].setValue(userData.email);
          this.editUser.controls["typeDocument"].setValue(userData.documentTypeId);
          this.editUser.controls["documentNumber"].setValue(userData.documentNumber);
          this.editUser.controls["role"].setValue(userData.roleId);
          this.editUser.controls["company"].setValue(userData.companyId);
        },
        error => {
          console.log("Error Obteniendo el Objeto!" + error);
        }
      );
    });
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
    if (this.editUser.valid) {
      const formData = this.editUser.value;
      const data = {
        userId: this.userId,
        companyId: formData.company,
        documentNumber: formData.documentNumber,
        documentTypeId: formData.typeDocument,
        email: formData.email,
        firstname: formData.firstName,
        lastname: formData.lastName,
        username: formData.nickName,
        active: true,
        roleId: formData.role
      };
      this.userService.putUpdateUser(data).subscribe(params => {
        console.log("Result update: ", params);
        if (params == true) {
          this.toastr.success("Usuario editado con exito", "Usuario");
          this.router.navigate(["/users/list"]);
        } else {
          this.toastr.error("Error editando el usuario!", "Usuario");
        }
      });
    } else {
      this.toastr.error("Formulario Invalido", "Usuarios");
    }
  }

  resetPassword(nickname) {
    swal({
      title: 'Restaurar contraseña?',
      text: "Esta seguro de restaurar la contraseña al usuario " + nickname + "!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Estoy Seguro!',
      cancelButtonText: 'Cancelar',
      buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        this.userService.putResetPassword({userId: this.userId}).subscribe(
          params => {
            swal(
              {
                title: 'Contraseña!',
                text: 'La contraseña del usuario fue actualizada exitosamente',
                type: 'success',
                confirmButtonClass: "btn btn-success",
                buttonsStyling: false
              }
            )
          }, error => {
              swal(
                  {
                    title: 'Contraseña!',
                    text: 'Error al actualizar la contraseña',
                    type: 'error',
                    confirmButtonClass: "btn btn-danger",
                    buttonsStyling: false
                  }
              )
          }
        );
      }
    })
  }
}
