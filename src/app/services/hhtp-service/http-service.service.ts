import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Question } from '../../models/question.model';
import { Answer } from '../../models/answer.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient,HttpParams } from '@angular/common/http';

 

@Injectable()
export class HttpServiceService {
questionToPost;
gameToPost;
questionRelationToPost;
playerRelationToPost;
questionToAnswer;
public resultArray: Question[];
;
url = "http://localhost:3000/question";
loginUrl = "http://localhost:3000/user/login";
userUrl = "http://localhost:3000/user";
playerUrl = "http://localhost:3000/player";
filteredQuestionURL = "http://localhost:3000/questionFiltered"
postGameURl = "http://localhost:3000/game";
QuestionRelationUrl = "http://localhost:3000/questionRelation";
playerRelationUrl = "http://localhost:3000/playerRelation";
sendQuestionUrl = "http://localhost:3000/sendQuestion";
displayQuestionUrl = "http://localhost:3000/displayQuestion";

constructor(private http: Http){
}

loginHTTP(model): Observable<any> { 
  return this.http.post(this.loginUrl,model)
  .map(data => data.status);
}

displayQuestionList(): Observable<any> {
  return this.http.get(this.url)
  .map(data => data.json());
}

displayPlayersList(): Observable<any> {
  return this.http.get(this.playerUrl)
  .map(data => data.json());
}
displayUserList():Observable<any> {
  return this.http.get(this.userUrl)
  .map(data => data.json());
}
/*
sortByDifficulty():Observable<any> {
let params = new HttpParams()
    set('questionDifficulty', 'easy');
  return this.http.get(this.url, )
  .map(data => data.json());
}*/

sortByDifficulty(difficulty:string):Observable<any> {
  return this.http.get(this.filteredQuestionURL,{params: {questionDifficulty :difficulty}})
    .map(data => data.json());
  }

  sendQuestion(question){
    this.questionToAnswer = question
    this.http.post(this.sendQuestionUrl,this.questionToAnswer)
    .subscribe(
       (val) => {
          console.log("POST call successful value returned in body", val);
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

postGame(model){
  this.gameToPost = model;
  console.log(this.gameToPost)
  this.http.post(this.postGameURl,this.gameToPost)
    .subscribe(
       (val) => {
          console.log("POST call successful value returned in body", val);
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
}

postQuestionRelation(model){
  this.questionRelationToPost = model;
  console.log(this.questionRelationToPost)
  this.http.post(this.QuestionRelationUrl,this.questionRelationToPost)
    .subscribe(
       (val) => {
          console.log("POST call successful value returned in body", val);
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
}

postPlayerRelation(model){
  this.playerRelationToPost = model;
  console.log(this.playerRelationToPost)
  this.http.post(this.playerRelationUrl,this.playerRelationToPost)
    .subscribe(
       (val) => {
          console.log("POST call successful value returned in body", val);
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
}
  
postNewQuestion(model){
  this.questionToPost = model;
  console.log(this.questionToPost)
  this.http.post(this.url,this.questionToPost)
    .subscribe(
       (val) => {
          console.log("POST call successful value returned in body", val);
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
    }
}

export const ServiceHTTP_PROVIDERS: Array<any> = [
  { provide: HttpServiceService, useClass: HttpServiceService }
];
