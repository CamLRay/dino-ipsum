import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import DinoIpsum from './js/dino-ipsum';
import DinoHangman from './js/dino-hangman';
import {buildButtons} from './js/services';
import './assets/images/img-1.png';
import './assets/images/img-2.png';
import './assets/images/img-3.png';
import './assets/images/img-4.png';
import './assets/images/img-5.png';
import './assets/images/img-6.png';
import './assets/images/img-7.png';

let newDino = new DinoHangman();
$('.button-container').html(buildButtons());
$('.button-container').addClass('hidden');
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
  $('.button-container').removeClass('hidden');
  $(".button").attr("disabled", false);
  $(".img").html(`<img src='./assets/images/img-${newDino.tries}.png'>`);
  $("#chances").text("")
});

$(".button").click(function(){
  let letter = $(this).attr("value");
  $(this).attr("disabled", true);
  newDino.guess(letter);
  $("#displayName").text(newDino.currentState.join(" "));
  $("#chances").text(`${newDino.incorrectGuess}`);
  if(!newDino.currentState.includes("_")){
    $(".start-game").addClass("hidden");
    $("#displayName").text(`Winner you guessed it right the dinosaur was ${newDino.dino}!`);
    $('#play-again').removeClass("hidden");
  }
  if (newDino.tries > 6) {
    $(".start-game").addClass("hidden");
    $('#play-again').removeClass("hidden");
    $("#displayName").text(`You Lose, you couldn't guess ${newDino.dino}. What a loser!`);
  }
  $(".img").html(`<img src='./assets/images/img-${newDino.tries}.png'>`);
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
  $(".img").html('')
  $("#chances").text("")
});

