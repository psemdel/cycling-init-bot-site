import { Component, OnInit } from '@angular/core';
import { BotRequestService} from '@app/services/bot-request.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import {AuthenticationService } from '@ser/authentication.service';
import { BotRequest, User} from '@app/models/models';
import { race_types, nationalities,yesnos,race_1x_classes, race_2x_classes} from '@app/models/lists';

import { MY_FORMATS} from '@app/models/date-format';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css'],
  providers: [
  {provide: MAT_DATE_LOCALE, useValue: 'fr'},
  {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
})

export class RaceComponent implements OnInit {
  currentUser: User;
  registerForm: FormGroup;
  botrequest: BotRequest = new BotRequest();
  submitted = false;
  success = false;
  lastname: string;
  nationalities= nationalities;
  race_types=race_types;
  race_1x_classes=race_1x_classes;
  race_2x_classes=race_2x_classes;
  yesnos=yesnos;
  temp1: boolean;
  temp2: string;
  
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
            item_id: ['', [Validators.required, Validators.pattern(/^[Q].*$/)]],
            nationality: ['', Validators.required],
            time_of_race: ['', Validators.required],
            end_of_race: ['', Validators.required],
            race_type: [true, Validators.required],
            //race_class1: ['', Validators.required],
            race_class2: ['', Validators.required],
            edition_nr: [''],
            create_stages: [true],
            prologue: [true],
            last_stage: [''],
    
            });
            
        this.registerForm.get('race_type').valueChanges
            .subscribe(value => this.onRaceTypeChanged());    
  }
  
  onRaceTypeChanged()
  {
      if (this.registerForm.value.race_type){
          this.registerForm.addControl('race_class2', new FormControl('', Validators.required));
          this.registerForm.removeControl('race_class1');
          this.temp1=this.registerForm.value.race_type;
          if (this.temp1) 
          {
          this.temp2="oui";
          }
          else
          {
          this.temp2="non";
          }          
      }
      else
      {   
      this.registerForm.addControl('race_class1', new FormControl('', Validators.required));
      this.registerForm.removeControl('race_class2');
                this.temp1=this.registerForm.value.race_type;
          this.temp2=this.registerForm.controls.race_type.value;
      }
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
    
    Object.keys(this.registerForm.controls).forEach(key => {
      this.botrequest[key]=this.registerForm.controls[key].value;
    });

    this.botrequest.author=this.currentUser.id;
    this.save();
  }

  save() {
    this.botRequestService.createRq('race',this.botrequest)
      .subscribe(
        data => {
          console.log('creater race request success');
          this.success = true;
        },
        error => {
            console.log(error);
        });
     this.botrequest = new BotRequest();
        
  }


}
