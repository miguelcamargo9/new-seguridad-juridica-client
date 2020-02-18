import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

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
