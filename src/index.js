import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import DinoIpsum from './js/dino-ipsum';
import DinoHangman from './js/dino-hangman';

let newDino = new DinoHangman();

let promise = DinoIpsum.getDinos();
promise.then(function(response) {
  const dinoName = JSON.parse(response); 
  newDino.addDino(dinoName[0][0]);
  $("#start-game").removeClass("hidden");
},  function(error) {
  $("#displayError").text(`There was an error ${error}`);
});
$("#start-game").click(function(){
  $("#start-game").addClass("hidden");
  $(".start-game").removeClass("hidden");
  newDino.updateCurrentState();
  $("#displayName").text(newDino.currentState.join(" "));
  $("#chances").text(newDino.tries);
});



$("form").submit(function(e){
  e.preventDefault();
  let letter = $("input").val();
  $("input").val("");
  newDino.guess(letter);
  $("#displayName").text(newDino.currentState.join(" "));
  $("#chances").text(`${newDino.tries} Incorrect Guesses: ${newDino.incorrectGuess}`);
  if(!newDino.currentState.includes("_")){
    $(".start-game").addClass("hidden");
    $("#displayName").text(`Winner you guessed it right the dinosaur was ${newDino.dino}!`);
    $('#play-again').removeClass("hidden");
  }
  if (newDino.tries < 0) {
    $(".start-game").addClass("hidden");
    $('#play-again').removeClass("hidden");
    $("#displayName").text(`You Lose, you couldn't guess ${newDino.dino}. What a loser!`);
  }
});

$('#play-again').click(function(){
  newDino = new DinoHangman();
  let promise = DinoIpsum.getDinos();
  promise.then(function(response) {
    const dinoName = JSON.parse(response); 
    newDino.addDino(dinoName[0][0]);
    $("#start-game").removeClass("hidden");
  },  function(error) {
    $("#displayError").text(`There was an error ${error}`);
  });
  $("#displayName").text("");
  $('#play-again').addClass("hidden");
});