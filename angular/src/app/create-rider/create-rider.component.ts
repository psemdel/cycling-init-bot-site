import { Component, OnInit } from '@angular/core';
import { BotRequest} from '@app/models/bot-request';
import { BotRequestService} from '@app/services/bot-request.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {AuthenticationService } from '@ser/authentication.service';
import { User} from '@app/models/user';

interface Nationality {
  value: string;
  viewValue: string;
}

interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-rider',
  templateUrl: './create-rider.component.html',
  styleUrls: ['./create-rider.component.css']
})

export class CreateRiderComponent implements OnInit {
  currentUser: User;
  registerForm: FormGroup;
  botrequest: BotRequest = new BotRequest();
  submitted = false;
  success = false;
  lastname: string;
  
  genders: Gender[] = [
    {value: 'm', viewValue: 'Man'},
    {value: 'f', viewValue: 'Woman'},
  ];

  nationalities: Nationality[] = [
    {value: 'BEL', viewValue: 'Belgium'},
    {value: 'ITA', viewValue: 'Italy'},
    {value: 'FRA', viewValue: 'France'},
    {value: 'COL', viewValue: 'Colombia'},
    {value: 'NED', viewValue: 'Netherlands'},
    {value: 'GER', viewValue: 'Germany'},
    {value: 'SLO', viewValue: 'Slovenia'},
    {value: 'AUS', viewValue: 'Australia'},
    {value: 'ESP', viewValue: 'Spain'},
    {value: 'DEN', viewValue: 'Danemark'},
    {value: 'GBR', viewValue: 'Great-Britain'},
    {value: 'NOR', viewValue: 'Norway'},
    {value: 'SUI', viewValue: 'Switzerland'},
    {value: 'RUS', viewValue: 'Russia'},
    {value: 'AUS', viewValue: 'Austria'},
    {value: 'IRL', viewValue: 'Ireland'},
    {value: 'KAZ', viewValue: 'Kazakhstan'},
    {value: 'POL', viewValue: 'Poland'},
    {value: 'ECU', viewValue: 'Ecuador'},
    {value: 'SVK', viewValue: 'Slovakia'},
    {value: 'CAN', viewValue: 'Canada'},
    {value: 'POR', viewValue: 'Portugal'},
    {value: 'RSA', viewValue: 'South-Africa'},
    {value: 'CZE', viewValue: 'Czech Republic'},
    {value: 'USA', viewValue: 'USA'},
    {value: 'EST', viewValue: 'Estonia'},
    {value: 'ERI', viewValue: 'Eritrea'},
    {value: 'ALG', viewValue: 'Algeria'},
    {value: 'NZL', viewValue: 'New-Zealand'},
    {value: 'LAT', viewValue: 'Latvia'},
    {value: 'TUR', viewValue: 'Turkey'},
    {value: 'BLR', viewValue: 'Belarus'},
    {value: 'LUX', viewValue: 'Luxembourg'},
    {value: 'UKR', viewValue: 'Ukraine'},
    {value: 'CRC', viewValue: 'Costa Rica'},
    {value: 'JAP', viewValue: 'Japan'},
    {value: 'GRE', viewValue: 'Greece'},
    {value: 'ROM', viewValue: 'Romania'},
    {value: 'HUN', viewValue: 'Hungary'},
    {value: 'MOC', viewValue: 'Morocco'}, //to check
  ];
  
  constructor(private botRequestService: BotRequestService,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
    ) { 
              this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit() {
        this.lastname="";
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            gender: ['', Validators.required],
            nationality: ['', Validators.required],
            });
      //  this.registerForm.controls.gender.setValue=this.genders[1].value; //does not work yet
  }

  get f() { return this.registerForm.controls; }

  newRequest(): void {
    this.submitted = false;
    this.success=false;
    this.botrequest = new BotRequest();
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        console.log("input not valid")
        error => {
                console.log(error);
        }
       return;
    }
    //display in the interface
    this.lastname=this.f.name.value;  
    
    this.botrequest.name=this.f.name.value;
    this.botrequest.gender=this.f.gender.value;
    this.botrequest.nationality=this.f.nationality.value;
    this.botrequest.author=this.currentUser.id;
    this.save();
  }

  save() {
    this.botRequestService.createRiderRequest(this.botrequest)
      .subscribe(
        data => {
          console.log('creater rider request success');
          this.success = true;
        },
        error => {
            console.log(error);
        });
     this.botrequest = new BotRequest();
        
  }


}
