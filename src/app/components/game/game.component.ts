import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../services/hhtp-service/http-service.service'
import { Question } from '../../models/question.model'
import { QuestionRelation } from '../../models/question-relation.model'
import { Game } from '../../models/game.model'
import { Players } from '../../models/players.model'
import { PlayerRelation } from '../../models/player-relation.model';

import { Router } from "@angular/router";

//import { DisplayQuestion } from '../../components/display-question';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  htttpService:HttpServiceService
  gameDifficulty = ['very easy','easy', 'normal','hard', 'very hard'];
  gameLenght = ['2', '5', '10','15', '20'];
  gameModel = new Game('1');
  questionRelationModel = new QuestionRelation('', '');
  difficultyModel = 'normal';
  lenghtModel = '2';
  filteredQuestions: Question[];
  gameQuestions: Question[] = [];
  randomIndexes = [];
  players:Players[];
  myInterval;

  constructor(hService:HttpServiceService, private router: Router) {
    this.htttpService = hService;
   }
    submitted = false;

    ngOnInit() {
    }
    onSubmit() { this.submitted = true; }

    displayArray(array){
      var test='';
      array.forEach(element => {
        test+=element + " ";
      });
      alert(test);
    }

    displayPlayers(){
      this.htttpService.displayPlayersList().subscribe(data => {
      this.players=data as Players[];
      console.log("Tik tak!");
      
      }, error=> console.error(error));
    }
  
    createUniqeRandom(max, randomArray) {
        var randomIndex = Math.floor(Math.random() * Math.floor(max));
        if(!this.randomIndexes.includes(randomIndex)){
          randomArray.push(randomIndex)
        }else this.createUniqeRandom(max, randomArray)
    }

    fillArrayWithUniqeRandoms(gameLenght, max, randomArray){
      var i;
      for (i = 0; i < gameLenght; i++){
        this.createUniqeRandom(max, randomArray)
      }
    }

    SetGameQuestions(randomArray, filteredQuestions){
      var i;
      var j;
      for (i = 0; i< randomArray.length; i++){
        for(j = 0; j < filteredQuestions.length;j++){
          if(j == randomArray[i]){
            this.gameQuestions.push(filteredQuestions[j]);
          }
        }
      }
    }

    myTimer(){
      this.myInterval =  setInterval(() => { this.displayPlayers() }, 1000);
    }

    startTheGame(){
      clearInterval(this.myInterval);
      this.players.forEach(element => {
        this.htttpService.postPlayerRelation(new PlayerRelation(element.playerID, this.gameModel.gameID));
      });
      this.gameQuestions.forEach(element => {
        setTimeout( () => { this.sendQuestion(element) }, 100 );
      });


      this.router.navigate(['/DispayQuestion']);

    }

    sendQuestion(question){
      this.htttpService.sendQuestion(question);
      console.log("Tik tak...");
    }

    createGame(gameDifficulty){
      var gameLenghtInt = parseInt(this.lenghtModel);

      this.htttpService.sortByDifficulty(gameDifficulty).subscribe(data => {
        this.filteredQuestions = data as Question[];
        this.fillArrayWithUniqeRandoms(gameLenghtInt, this.filteredQuestions.length, this.randomIndexes);
        this.SetGameQuestions(this.randomIndexes, this.filteredQuestions);
        this.myTimer();
        this.htttpService.postGame(this.gameModel);
        this.gameQuestions.forEach(element => {
          this.htttpService.postQuestionRelation(new QuestionRelation(element.questionID, this.gameModel.gameID));
        });
      }, error=> console.error(error));    
    }
}
//push -u origin master

