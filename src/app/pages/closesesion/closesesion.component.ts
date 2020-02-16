import { Component, OnInit, ElementRef, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { environment } from "../../../environments/environment";

declare var $: any;

@Component({
  selector: "app-login-cmp",
  templateUrl: "./closesesion.component.html"
})
export class ClosesesionComponent implements OnInit {
  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {
    localStorage.removeItem(environment.keyToken);
    this.router.navigate([environment.pathInit]);
  }


}
