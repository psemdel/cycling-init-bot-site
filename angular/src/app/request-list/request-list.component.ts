import { Component, OnInit } from '@angular/core';
import { BotRequest} from '../models/bot-request';
import { BotRequestService} from '@ser/bot-request.service';
import { Observable } from 'rxjs';

import {AuthenticationService } from '@ser/authentication.service';
import { User} from '@app/models/user';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
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
      this.botRequestService.getCreateRiderRequests(this.currentUser.id);
      
    this.import_classification_botrequests = 
      this.botRequestService.getImportClassificationRequests(this.currentUser.id);
      
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