import { Component, OnInit, ElementRef, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { LoginService } from "./login.service";
import { environment } from "../../../environments/environment";

declare var $: any;

@Component({
  selector: "app-login-cmp",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit, OnDestroy {
  test: Date = new Date();
  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;
  loginForm: FormGroup;

  constructor(
    private element: ElementRef,
    private authService: LoginService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggle")[0];
    const body = document.getElementsByTagName("body")[0];
    body.classList.add("login-page");
    body.classList.add("off-canvas-sidebar");
    const card = document.getElementsByClassName("card")[0];
    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      card.classList.remove("card-hidden");
    }, 700);
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.minLength]],
      password: ["", Validators.required]
    });
  }
  sidebarToggle() {
    var toggleButton = this.toggleButton;
    var body = document.getElementsByTagName("body")[0];
    var sidebar = document.getElementsByClassName("navbar-collapse")[0];
    if (this.sidebarVisible == false) {
      setTimeout(function () {
        toggleButton.classList.add("toggled");
      }, 500);
      body.classList.add("nav-open");
      this.sidebarVisible = true;
    } else {
      this.toggleButton.classList.remove("toggled");
      this.sidebarVisible = false;
      body.classList.remove("nav-open");
    }
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("login-page");
    body.classList.remove("off-canvas-sidebar");
  }
  login() {
    localStorage.removeItem(environment.keyToken);
    const val = this.loginForm.value;
    if (val.username && val.password) {
      const data = {
        username: val.username,
        password: val.password
      };
      this.authService.postLogin(data).subscribe(
        data => {
          localStorage.setItem(environment.keyToken, data["token"]);
          this.toastr.success("Inicio de sesión exitoso", "Login");
          this.router.navigate([environment.pathInit]);
        },
        err => {
          console.log(err);
          if(err.status === 401) {
            this.toastr.error("Usuario o contraseña invalido", "Login");
            // aEPX6mw5
          } else {
            this.toastr.error("Error al iniciar sesión", "Login");
          }
          // this.dialogRef = this.dialog.open(FuseAlertDialogComponent, {
          //   panelClass: 'contact-form-dialog',
          //   data      : {
          //     dialogTitle : 'Iniciar Sesión',
          //     dialogText: 'Usuario o contraseña invalido.'
          //   }
          // });
          console.error("asdasdasd");
          console.error(err);
        },
        () => {
          console.log("User fin is logged in");
          // this.router.navigate(['/pages/auth/login']);
          // this.router.navigate(['/sample2']);
        }
      );
    }
  }
}
