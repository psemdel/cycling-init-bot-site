import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RoutingModule } from './routing.module';
import {MatSelectModule} from '@angular/material/select';
import { APP_BASE_HREF } from '@angular/common';

import {MatMenuModule} from '@angular/material/menu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule } from '@angular/material/progress-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MenuPersComponent } from './menupers/menupers.component';

import { TopbarComponent } from './topbar/topbar.component';
import { CreateRiderComponent } from './create-rider/create-rider.component';
import { RequestListComponent } from './request-list/request-list.component';
import { AllRequestListComponent } from './all-request-list/all-request-list.component';
import { HomeComponent } from './home/home.component';
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
import {LoadingComponent} from '@app/loading/loading.component';

import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';


import { BotRequestService } from './services/bot-request.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';

import {JwtInterceptor} from './guard/jwt.interceptor';
import {ErrorInterceptor} from './guard/error.interceptor';
import {LoadingInterceptorService } from './guard/loading.interceptor';


@NgModule({
  imports:      [
  BrowserAnimationsModule,
  BrowserModule, 
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
  RoutingModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatDividerModule,
  MatSelectModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatProgressSpinnerModule,
  ],
  declarations: [ AppComponent, MenuComponent,MenuPersComponent, TopbarComponent, CreateRiderComponent, HomeComponent,
                RequestListComponent, AllRequestListComponent,
                LoginComponent, RegisterComponent, ImportClassificationComponent,
                NationalOneChampComponent, NationalAllChampsComponent,
                ConfirmEmailComponent,  StartListComponent, RaceComponent,
                StagesComponent, TeamComponent, UCIrankingComponent,
                SortDateComponent, SortNameComponent, LoadingComponent
                ],
  entryComponents: [MenuComponent],
  bootstrap:    [ AppComponent ],
  providers: [
      {provide: APP_BASE_HREF, useValue: '/'},
      {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorService, multi: true },
      MatMomentDateModule,
  ]
})
export class AppModule { }



