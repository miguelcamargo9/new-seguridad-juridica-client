import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from './user.component';
import { UserRoutes } from './user.routing';
import {MaterialModule, UtilsModule} from "../app.module";
import {UserService} from "./user.services";
import {DomainService} from "../domains/domain.service";
import {RolesService} from "../roles/roles.services";
import {CompanyService} from "../companies/companies.service";
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS } from "../core/format-datepicker/format-datepicker";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        UtilsModule
    ],
    providers: [
        UserService, DomainService, RolesService, CompanyService,
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ],
    declarations: [UserComponent]
})

export class UserModule {}
