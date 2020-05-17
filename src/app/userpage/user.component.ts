import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DomainService} from "../domains/domain.service";
import {ToastrService} from "ngx-toastr";
import {UserService} from "./user.services";
import {DomainBoolean} from "../seguimiento902/DomainBoolean.model";
import {Company} from "../companies/company.model";
import {Domain} from "../domains/domain.model";
import {Roles} from "../roles/roles.model";
import {Subscription} from "rxjs";
import {RolesService} from "../roles/roles.services";
import {CompanyService} from "../companies/companies.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {JwtHelper} from "angular2-jwt";
import {PasswordValidationUser} from "../users/create/password-validator.component";
import swal from "sweetalert2";

@Component({
    selector: 'app-user-cmp',
    templateUrl: 'user.component.html'
})

export class UserComponent {
    editUser: FormGroup;
    passwordUserFrom: FormGroup;
    tiposDocumento: Domain[];
    roles: Roles[];
    companies: Company[];
    routeSub: Subscription;
    userId: Number;
    tipoSiNo: DomainBoolean[];
    jwtHelper: JwtHelper;
    token: any;
    userName: string;
    userObj: any = {firstname:'', lastname:''};

    constructor(private formBuilder: FormBuilder,
                private userService: UserService,
                private rolesService: RolesService,
                private domainServcie: DomainService,
                private companiesService: CompanyService,
                private toastr: ToastrService,
                private router: Router,
                private route: ActivatedRoute) {
        this.tipoSiNo = [new DomainBoolean(false, "No"), new DomainBoolean(true, "Si")];
        this.token = localStorage.getItem(environment.keyToken);
        this.jwtHelper = new JwtHelper();
    }

    ngOnInit() {
        this.passwordUserFrom = this.formBuilder.group({
            passwordCurrent: ["", Validators.compose([Validators.required])],
            password: ["", Validators.compose([Validators.required, Validators.minLength(6)])],
            passwordConfirm: ["", [Validators.required]]
        },
        {
          validator: PasswordValidationUser.MatchPassword // your validation method
        }
        );

        this.getDomains();
        this.editUser = this.formBuilder.group({
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            nickName: [{value: null, disabled: true}, [Validators.required]],
            email: [
                {value: null, disabled: true},
                [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]
            ],
            typeDocument: [null, [Validators.required]],
            documentNumber: [null, [Validators.required]],
            role: [{value: null, disabled: true}, [Validators.required]],
            company: [{value: null, disabled: true}, [Validators.required]],
            active: [{value: null, disabled: true}, [Validators.required]],
            expireDate: [{value: null, disabled: true}, [Validators.required]]
        });

        if (this.token && !this.jwtHelper.isTokenExpired(this.token)) {
            const user = this.jwtHelper.decodeToken(this.token);
            this.userName = user.sub;
            console.log("MI USUARIO", user);
            this.userService.getUserByUsername(this.userName).subscribe(
                userData => {
                    this.userObj = userData;
                    this.editUser.controls["firstName"].setValue(userData.firstname);
                    this.editUser.controls["lastName"].setValue(userData.lastname);
                    this.editUser.controls["nickName"].setValue(userData.username);
                    this.editUser.controls["email"].setValue(userData.email);
                    this.editUser.controls["typeDocument"].setValue(userData.documentTypeId);
                    this.editUser.controls["documentNumber"].setValue(userData.documentNumber);
                    this.editUser.controls["role"].setValue(userData.roleId);
                    this.editUser.controls["company"].setValue(userData.companyId);
                    this.editUser.controls["active"].setValue(userData.active);
                    this.editUser.controls["expireDate"].setValue(this.changeDate(userData.expireDate));
                },
                error => {

                }
            );
        }

    }
    changeDate(d: Date) {
        if (d == null) return null;
        return new Date(d);
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

    onSubmit(){
        if (this.editUser.valid) {
            const formData = this.editUser.value;
            let data = this.userObj;
            data.userId = this.userObj.id;
            data.documentNumber = formData.documentNumber,
            data.documentTypeId = formData.typeDocument,
            data.firstname = formData.firstName,
            data.lastname = formData.lastName

            this.userService.putUpdateUser(data).subscribe(params => {
                console.log("Result update: ", params);
                if (params == true) {
                    this.toastr.success("Usuario editado con exito", "Usuario");
                    // this.router.navigate(["/users/list"]);
                } else {
                    this.toastr.error("Error editando el usuario!", "Usuario");
                }
            });
        } else {
            this.toastr.error("Formulario Invalido", "Usuarios");
        }
    }
    private getDomains() {
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

    onSubmitPassword() {
        if (this.passwordUserFrom.valid) {
            let data = this.passwordUserFrom.value;
            data.userId = this.userObj.id;
            console.log("enviar")
            swal({
                title: 'Actualizar contraseña?',
                text: "¿Esta seguro de actualizar su contraseña?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                confirmButtonText: 'Estoy Seguro!',
                cancelButtonText: 'Cancelar',
                buttonsStyling: false
            }).then((result) => {
                if (result.value) {
                    this.userService.putResetPassword(data).subscribe(
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
                            console.log(error)
                            swal(
                                {
                                    title: 'Contraseña!',
                                    text: error.error.message,
                                    type: 'error',
                                    confirmButtonClass: "btn btn-danger",
                                    buttonsStyling: false
                                }
                            )
                        }
                    );
                }
            })

        } else {
            this.toastr.error("Formulario Invalido", "Clave");
        }
    }
}
