import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { environment } from "./../../../environments/environment";
import { JwtHelper } from "angular2-jwt";
// import {MatDialog} from '@angular/material';

@Injectable()
export class AuthGuard implements CanActivate {
  dialogRef: any;

  constructor(
    private router: Router // , public dialog: MatDialog
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const jwtHelper: JwtHelper = new JwtHelper();
    const token = localStorage.getItem(environment.keyToken);
    let result = false;

    if (token && !jwtHelper.isTokenExpired(token)) {
      const roles = next.data["roles"] as Array<string>;
      if (roles !== undefined) {
        const permissions = jwtHelper.decodeToken(token).permissions;
        for (let i = 0; i < roles.length; i++) {
          if (permissions.indexOf(roles[i]) !== -1) {
            result = true;
            break;
          }
        }
        if (!result) {
          // this.dialog.open(FuseAlertDialogComponent, {
          //   panelClass: 'contact-form-dialog',
          //   data: {
          //     dialogTitle: 'Autorización',
          //     dialogText: 'No tiene privilegios ingresar a esta sección'
          //   }
          // });
          /**
           * TODO: Generar popup
           */
          console.log("No tiene privilegios ingresar a esta sección");
        }
      } else {
        result = true;
      }
    } else {
      localStorage.removeItem(environment.keyToken);
      this.router.navigate([environment.pathLogin]);
      result = false;
    }
    return result;
  }
}
