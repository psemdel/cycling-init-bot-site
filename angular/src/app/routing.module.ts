import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CreateRiderComponent } from './create-rider/create-rider.component';
import {HomeComponent} from './home/home.component';
import { AppComponent } from './app.component';
import { RequestListComponent } from './request-list/request-list.component';
import { AllRequestListComponent } from './all-request-list/all-request-list.component';
import { LoginComponent} from './login/login.component';
import { RegisterComponent} from './register/register.component';
import { ImportClassificationComponent } from './import-classification/import-classification.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';

import {AuthGuard} from './guard/auth.guard';
import {AuthGuardStaff} from './guard/authstaff.guard';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},

    { path: 'create_rider', component: CreateRiderComponent, canActivate: [AuthGuard] },
    { path: 'request_list', component: RequestListComponent, canActivate: [AuthGuard] },
    { path: 'all_request_list', component: AllRequestListComponent, canActivate: [AuthGuardStaff] },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'import_classification', component: ImportClassificationComponent},
    { path: 'activate/:uid/:token', component: ConfirmEmailComponent },
  //  { path: 'activate', component: ConfirmEmailComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }


