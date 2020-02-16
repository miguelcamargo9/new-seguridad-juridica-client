import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  ElementRef,
  OnInit,
  Attribute,
  Renderer
} from "@angular/core";
import { JwtHelper } from "angular2-jwt";
import { environment } from "src/environments/environment";

@Directive({
  selector: "[hasPermission]"
})
export class HasPermissionDirective implements OnInit {
  private currentUser;
  private permissions = [];
  private logicalOp = "AND";

  constructor(
    private element: ElementRef,
    private renderer: Renderer,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    const jwtHelper: JwtHelper = new JwtHelper();
    const promise = new Promise((resolve, reject) => {
      const token = localStorage.getItem(environment.keyToken);
      resolve(token);
    }).then(response => {
      this.currentUser = {
        permissions: jwtHelper.decodeToken(String(response)).permissions
      };
      this.updateView();
    });
  }

  @Input()
  set hasPermission(val) {
    this.permissions = val;
    this.updateView();
  }

  @Input()
  set hasPermissionOp(permop) {
    this.logicalOp = permop;
    this.updateView();
  }

  private updateView() {
    if (!this.checkPermission()) {
      console.log("PAILA");
      this.renderer.setElementStyle(this.element.nativeElement, "display", "none");
    }
    this.viewContainer.clear();
  }

  private checkPermission() {
    let hasPermission = false;
    if (this.currentUser && this.currentUser.permissions) {
      console.log("CURRENT USER", this.currentUser);
      console.log("PERMISSIONS", this.permissions);
      console.log("PERMISSIONS", this.permissions.length);
      for (const checkPermission of this.permissions) {
        if (checkPermission === undefined) {
          console.log("PERMISO UNDE");
          return true;
        } else {
          const permissionFound = this.currentUser.permissions.find(
            x => String(x).toUpperCase() === String(checkPermission).toUpperCase()
          );
          if (permissionFound) {
            hasPermission = true;

            if (this.logicalOp === "OR") {
              break;
            }
          } else {
            hasPermission = false;
            if (this.logicalOp === "AND") {
              break;
            }
          }
        }
      }
    }

    return hasPermission;
  }
}
