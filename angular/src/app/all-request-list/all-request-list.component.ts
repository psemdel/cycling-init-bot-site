import { Component, OnInit } from '@angular/core';
import { BotRequest} from '@app/models/bot-request';
import { BotRequestService} from '@app/services/bot-request.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import {AuthenticationService } from '@ser/authentication.service';
import { User} from '@app/models/user';

@Component({
  selector: 'app-all-request-list',
  templateUrl: './all-request-list.component.html',
  styleUrls: ['./all-request-list.component.css']
})

export class AllRequestListComponent implements OnInit {
  currentUser: User;
  create_rider_botrequests: Observable<BotRequest[]>;
  import_classification_botrequests: Observable<BotRequest[]>;

   constructor(private botRequestService: BotRequestService,
               private authenticationService: AuthenticationService,
   ) {
   this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.create_rider_botrequests = 
      this.botRequestService.getAllCreateRiderRequests(this.currentUser.id);
      
    this.import_classification_botrequests = 
      this.botRequestService.getAllImportClassificationRequests(this.currentUser.id);
  }
  
  run(botrequest : BotRequest) {
    this.botRequestService.runRequest(botrequest)
      .subscribe(
        data => {
          console.log(data);
          botrequest.status="run requested";
          this.reloadData();
        },
        error => console.log(error));
  }
  
  deleteCreateRider(botrequest: BotRequest) {
    this.botRequestService.deleteCreateRiderRequest(botrequest.id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
  
  deleteImportClassification(botrequest: BotRequest) {
    this.botRequestService.deleteImportClassificationRequest(botrequest.id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

}
