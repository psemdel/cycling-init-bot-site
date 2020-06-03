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
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';


import { BotRequestService } from './services/bot-request.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';

import {JwtInterceptor} from './guard/jwt.interceptor';
import {ErrorInterceptor} from './guard/error.interceptor';


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
  ],
  declarations: [ AppComponent, MenuComponent,MenuPersComponent, TopbarComponent, CreateRiderComponent, HomeComponent,
                RequestListComponent, AllRequestListComponent,
                LoginComponent, RegisterComponent, ImportClassificationComponent,
                ConfirmEmailComponent
                ],
  entryComponents: [MenuComponent],
  bootstrap:    [ AppComponent ],
  providers: [
      {provide: APP_BASE_HREF, useValue: '/'},
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
})
export class AppModule { }



