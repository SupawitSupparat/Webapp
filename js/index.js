
var question,button1,button2,button3,button4,ourRequest,ourData,currentQuestion,randomQuestion,numberOfQuestions,gameOver = false,gameStart = false,score,time = 0,running = 0,QCrunning = 0,QCtime = 300;

window.onload = function(){
button1 = document.getElementById('button1');
button2 = document.getElementById('button2');
button3 = document.getElementById('button3');
button4 = document.getElementById('button4');
question = document.getElementById('question');
currentQuestion = 0;
fetchData();
}

function fetchData(){
ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://api.myjson.com/bins/na049');
ourRequest.onload = function(){
console.log(ourRequest.responseText);
ourData = JSON.parse(ourRequest.responseText);
};
ourRequest.send();
}

function startGame(numberOfQuestion){
gameStart = true;
gameOver = false;
numberOfQuestions = numberOfQuestion;
currentQuestion = 0;
score = 0;
document.getElementById('score').innerHTML = 'Score : 0/' + numberOfQuestions;
document.getElementById('answer').innerHTML = 'start game';
document.getElementById('alltime').innerHTML ="" ;
document.getElementById('averagetime').innerHTML = "";
resetClock();
startStopClock();
nextQuestion();
resetQC();
startQC();

}

function renderCurrentQuestion(){
document.getElementById('currentQuestion').innerHTML  = 'Question : ' +parseInt(currentQuestion+1) +'/'+ numberOfQuestions;
}

function nextQuestion(){

if ( currentQuestion >= numberOfQuestions ){ 
gameOver = true;
startStopClock();
stopQC();

updateTime();
document.getElementById('answer').innerHTML = 'game over';
document.getElementById('timer').innerHTML = '30.0';

} else { 
resetQC();
startQC();
renderCurrentQuestion();
while ( true ){
  var x = randomNumber();
  if ( x == randomQuestion ){

  } else {
    randomQuestion = x;
    break;
  }
}
console.log(randomQuestion);
renderQuestion(randomQuestion);
}
}

function randomNumber(){
return Math.floor(Math.random() * ourData.theQuestion.length);
}

function renderQuestion(i){ 
  question.innerHTML = ourData.theQuestion[i].question;
  button1.innerHTML = ourData.theQuestion[i].choices[0];
  button2.innerHTML = ourData.theQuestion[i].choices[1];
  button3.innerHTML = ourData.theQuestion[i].choices[2];
  button4.innerHTML = ourData.theQuestion[i].choices[3];
}

function answer(i) {
  if ( !gameOver && gameStart){ 
    if ( i == 99 ){

    } else if ( ourData.theQuestion[randomQuestion].choices[i-1] == ourData.theQuestion[randomQuestion].answer){ 

      document.getElementById('answer').innerHTML = 'correct';
      document.getElementById('score').innerHTML = 'Score : ' + (score += 1) + '/' + numberOfQuestions ;

    } else { 
      console.log('incorrect');
      document.getElementById('answer').innerHTML = 'incorrect';
    }
    currentQuestion += 1;
    nextQuestion();
  }
   else {
  }
}

function startStopClock(){
if ( running == 0 ) {
running = 1;
console.log(running);
increment();
} else {
running = 0;
}
}
function resetClock(){
running = 0;
time = 0;
}

function increment(){
if ( running == 1 ){
setTimeout(function(){
  time++;
  console.log(time);
  increment();
},100);
}
}

function updateTime(){
var mins = Math.floor(time/10/60);
var secs = Math.floor(time/10);
var tenths = time % 10;
document.getElementById('alltime').innerHTML ='Used time : ' + mins + ' : ' + secs + ' : ' + tenths ;
document.getElementById('averagetime').innerHTML = 'Average time per question '  + (time/10/numberOfQuestions).toFixed(3) + ' seconds';
}

function startQC(){
if ( QCrunning == 0 ){
QCrunning = 1;
QCdeduction();
} else {
QCrunning = 0;
}
} 

function stopQC(){
if ( QCrunning == 1 ){
QCrunning = 0;
}
}

function resetQC(){
QCrunning = 0;
QCtime = 300;
}

function QCdeduction(){
if ( QCrunning == 1 ){
setTimeout(function(){
  QCtime--;
  if (QCtime <= 0 ){
    answer(99);
  }
  var mins = Math.floor(QCtime/10/60);
  var secs = Math.floor(QCtime/10);
  document.getElementById('timer').innerHTML = secs ;
  QCdeduction();
},100);
}
}
