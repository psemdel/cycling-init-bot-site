import { Component, OnInit} from '@angular/core';
import { BotRequest} from '@app/models/bot-request';
import { BotRequestService} from '@ser/bot-request.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { HttpClient, HttpResponse, HttpRequest, 
         HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, last, map, tap } from 'rxjs/operators';

//import {FileUploadService} from '@ser/file-upload.service';
import {AuthenticationService } from '@ser/authentication.service';

import { User} from '@app/models/user';
import { FileUploadModel} from '@app/models/file-upload';

import { environment } from '@env/environment';

interface ClassificationType {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-import-classification',
  templateUrl: './import-classification.component.html',
  styleUrls: ['./import-classification.component.css'],
  animations: [
            trigger('fadeInOut', [
                  state('in', style({ opacity: 100 })),
                  transition('* => void', [
                        animate(300, style({ opacity: 0 }))
                  ])
           ])
      ]
})

export class ImportClassificationComponent implements OnInit {
  currentUser: User;
  registerForm: FormGroup;
  submitted = false;
  success = false;
  lastname: string;
  
  botrequest: BotRequest = new BotRequest();
  files: Array<FileUploadModel> = [];
  private baseUrl = environment.apiUrl +'bot_requests';
  
  exterror=false;
  sizeerror=false;
 
  classificationtypes: ClassificationType[] = [
    {value: 0, viewValue: 'General'},
    {value: 1, viewValue: 'Stage classification'},
    {value: 2, viewValue: 'Points'},
    {value: 3, viewValue: 'Mountain'},  
    {value: 4, viewValue: 'Youth by time'},
    {value: 7, viewValue: 'Youth by points'},    
    {value: 5, viewValue: 'Team by time'}, 
    {value: 6, viewValue: 'Team by points'},             
  ];

  constructor(private botRequestService: BotRequestService,
              private formBuilder: FormBuilder, 
              private authenticationService: AuthenticationService,
              private http: HttpClient,
  ) { 
              this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }
   
  ngOnInit() {
        this.lastname="";
        this.registerForm = this.formBuilder.group({
            item_id: ['', [Validators.required, Validators.pattern(/^[Q].*$/)]],
            classificationtype: ['', Validators.required],
            file: [null, Validators.required]
            });
  }
  
  get f() { return this.registerForm.controls; }

  newRequest(): void {
    this.submitted = false;
    this.success=false;
    this.botrequest = new BotRequest();
  }
  
  onSubmit() {
    //reinit
    this.submitted = true;
    this.exterror=false;
    this.sizeerror=false;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        console.log("input not valid")
        error => {
                console.log(error);
        }
       return;
    }
    
     const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
     if (!this.validateFile(fileUpload.files[0].name)) { //name
        console.log('Selected file format is not supported');
        this.exterror=true;
        return;
     }
     
     if (fileUpload.files[0].size>20000) {
        console.log('File size exceeded');
        this.sizeerror=true;
        return;
     }
     
     for (let index = 0; index < fileUpload.files.length; index++) {
              const file = fileUpload.files[index];
              this.files.push({ data: file, state: 'in', 
                inProgress: false, progress: 0, canRetry: false, canCancel: true,
                author: this.currentUser.id
                 });
     }

    //display in the interface
    this.lastname=this.f.item_id.value;  
    
    this.botrequest.item_id=this.f.item_id.value;
    this.botrequest.classificationtype=this.f.classificationtype.value;
    this.botrequest.author=this.currentUser.id;
    
    this.uploadFile(this.files[0], this.botrequest);
    this.botrequest = new BotRequest();
 //   this.save();
  }

   private uploadFile(file: FileUploadModel, botrequest: BotRequest) {
            const fd = new FormData();
            fd.append('file', file.data);
            fd.append('botrequest',JSON.stringify(botrequest))

            const req = new HttpRequest('POST',  `${this.baseUrl}/import_classification/`, fd, {
                  reportProgress: true
            });

            file.inProgress = true;
            file.sub = this.http.request(req).pipe(
                  map(event => {
                        switch (event.type) {
                              case HttpEventType.UploadProgress:
                                    file.progress = Math.round(event.loaded * 100 / event.total);
                                    break;
                              case HttpEventType.Response:
                                    return event;
                        }
                  }),
                  tap(message => { }),
                  last(),
                  catchError((error: HttpErrorResponse) => {
                        file.inProgress = false;
                        file.canRetry = true;
                        return of(`${file.data.name} upload failed.`);
                  })
            ).subscribe(
                  (event: any) => {
                        if (typeof (event) === 'object') {
                            console.log("upload successful!")
                            this.success=true;
                        }
                  }
            );
      }
      
    private validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'csv' || ext.toLowerCase() == 'xlsx') {
            return true;
        }
        else {
            return false;
        }
    }
}

