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
import { NationalOneChampComponent} from './national-one-champ/national-one-champ.component';
import { NationalAllChampsComponent} from './national-all-champs/national-all-champs.component';
import { StartListComponent} from './start-list/start-list.component';
import { StagesComponent} from './stages/stages.component';
import { RaceComponent} from './race/race.component';
import { TeamComponent} from './team/team.component';
import { UCIrankingComponent} from './UCIranking/UCIranking.component';
import { SortDateComponent} from './sort-date/sort-date.component';
import { SortNameComponent} from './sort-name/sort-name.component';

import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';

import {AuthGuard} from './guard/auth.guard';
import {AuthGuardStaff} from './guard/authstaff.guard';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},

    { path: 'national-all-champs', component: NationalAllChampsComponent, canActivate: [AuthGuard] },
    { path: 'national-one-champ', component: NationalOneChampComponent, canActivate: [AuthGuard] },
    { path: 'create_rider', component: CreateRiderComponent, canActivate: [AuthGuard] },
    { path: 'race', component: RaceComponent, canActivate: [AuthGuard] },
    { path: 'stages', component: StagesComponent, canActivate: [AuthGuard] },
    { path: 'start_list', component: StartListComponent, canActivate: [AuthGuard] },
    { path: 'team', component: TeamComponent, canActivate: [AuthGuard] },
    { path: 'UCIranking', component: UCIrankingComponent, canActivate: [AuthGuard] },
    { path: 'sort_date', component: SortDateComponent, canActivate: [AuthGuard] },
    { path: 'sort_name', component: SortNameComponent, canActivate: [AuthGuard] },
         
    { path: 'import_classification', component: ImportClassificationComponent, canActivate: [AuthGuardStaff] },
    { path: 'request_list', component: RequestListComponent, canActivate: [AuthGuard] },
    { path: 'all_request_list', component: AllRequestListComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
   
    { path: 'activate/:uid/:token', component: ConfirmEmailComponent },
   // { path: 'activate', component: ConfirmEmailComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }


