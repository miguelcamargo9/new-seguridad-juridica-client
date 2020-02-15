import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { APP_BASE_HREF } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule
} from "@angular/material";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { ToastrModule } from "ngx-toastr";

import { AppComponent } from "./app.component";

import { SidebarModule } from "./sidebar/sidebar.module";
import { FooterModule } from "./shared/footer/footer.module";
import { NavbarModule } from "./shared/navbar/navbar.module";
import { FixedpluginModule } from "./shared/fixedplugin/fixedplugin.module";
import { AdminLayoutComponent } from "./layouts/admin/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth/auth-layout.component";

import { AuthInterceptor } from "./core/security/authInterceptor";
import { AuthGuard } from "./core/security/guard";
import { CheckInterfaceDirective } from "./directives/checkinterface.directive";

import { AppRoutes } from "./app.routing";
import { FieldErrorDisplayComponent } from "./components/field-error-display/field-error-display.component";

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
})
export class MaterialModule { }


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FieldErrorDisplayComponent
  ],
  exports: [
    FieldErrorDisplayComponent
  ]
})
export class FieldErrorModule { }

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    HttpModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MaterialModule,
    MatNativeDateModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedpluginModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    CheckInterfaceDirective,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
