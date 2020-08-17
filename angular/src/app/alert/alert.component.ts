import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '@ser/alert.service';

@Component({ 
selector: 'alert', 
templateUrl: 'alert.component.html' 
})

export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;
    success: boolean;
    

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.success=true;
        this.subscription = this.alertService.getAlert()
            .subscribe(message => {
              //      switch (message && message.type) {
             //       case 'success':
              //          this.success=true;
              //          break;
              //      case 'error':
              //          this.success=false;
              //          break;
               // }
                this.message = message;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}