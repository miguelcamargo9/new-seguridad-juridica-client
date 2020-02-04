import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  ElementRef,
  OnInit,
  Attribute
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
  private isHidden = true;

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
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
    if (this.checkPermission()) {
      if (this.isHidden) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainer.clear();
    }
  }

  private checkPermission() {
    let hasPermission = false;

    if (this.currentUser && this.currentUser.permissions) {
      for (const checkPermission of this.permissions) {
        if (checkPermission === undefined) {
          hasPermission = true;
        } else {
          const permissionFound = this.currentUser.permissions.find(
            x =>
              String(x).toUpperCase() === String(checkPermission).toUpperCase()
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
