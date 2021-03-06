import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MaterialModule, UtilsModule } from "../app.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { FlexLayoutModule } from '@angular/flex-layout';

import { PagesRoutes } from "./pages.routing";

import { RegisterComponent } from "./register/register.component";
import { PricingComponent } from "./pricing/pricing.component";
import { LockComponent } from "./lock/lock.component";
import { LoginComponent } from "./login/login.component";
import { LoginService } from "./login/login.service";
import { ClosesesionComponent } from "./closesesion/closesesion.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    UtilsModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    PricingComponent,
    LockComponent,
    ClosesesionComponent
  ],
  providers: [LoginService]
})
export class PagesModule { }
