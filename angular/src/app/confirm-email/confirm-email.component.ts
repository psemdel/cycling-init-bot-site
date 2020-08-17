import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})

export class ConfirmEmailComponent implements OnInit {
    uid: string;
    token: string;
    private authUrl = "blablabla";
    confirmed=false;
    
    constructor(
        private http: HttpClient, 
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
       this.uid = this.route.snapshot.paramMap.get("uid");
       this.token = this.route.snapshot.paramMap.get("token");
        
      //    this.route.paramMap.subscribe(params => {
     //         this.uid  = params.get("uid ");
     //         this.token  = params.get("token ");
     //    });
         
        
        
       // this.token="bal";
       // this.confirm(this.uid, this.token);
    }

   // confirm(uid, token) {
   //     return this.http.post(`${this.authUrl}users/activation/`, {uid, token} )
   //     .subscribe(
//        data => {
    //      this.confirmed=true;
    //    },
   //     error => {
   //        console.log(error);
   //     }
   //     );
  //  }

}

