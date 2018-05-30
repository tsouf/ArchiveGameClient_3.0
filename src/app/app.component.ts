import { Component, OnInit, Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import { ISubscription } from "rxjs/Subscription";
import { AuthService} from '../app/services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit{
  constructor(public authservice:AuthService){

  }
  
ngOnInit():void{
  this.authservice.logout();
}

title = 'app';
}
