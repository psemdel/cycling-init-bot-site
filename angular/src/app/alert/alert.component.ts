import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { AlertService } from '@ser/alert.service';

@Component({ 
selector: 'alert', 
templateUrl: 'alert.component.html',
  styleUrls: ['./alert.component.css']
})

export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;
    success: boolean;

    constructor(private alertService: AlertService,
                private router: Router
    ) { 
    
      this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
               this.ngOnInit(); //reload subject
            }
        });
    }
    ngOnInit() {
        this.success=true;
        this.subscription = this.alertService.getAlert()
            .subscribe(message => {
               if (message){
                this.message = message;
                //window.alert(message);
               }
              //      switch (message && message.type) {
             //       case 'success':
              //          this.success=true;
              //          break;
              //      case 'error':
              //          this.success=false;
              //          break;
               // }
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}