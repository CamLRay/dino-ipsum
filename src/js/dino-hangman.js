export default class DinoHangman {
  constructor(){
    this.tries = 1;
    this.incorrectGuess = "";
  }

  addDino(dino){
    this.dino = dino;
  }
  updateCurrentState(){
    this.currentState = [];
    for(let i = 0; i < this.dino.length; i++) {
      this.currentState.push('_');
    }
  }

  guess(letter) {
    let indexes = [];
    for(let i =0; i < this.dino.length; i++) {
      if(this.dino[i].toLowerCase() === letter.toLowerCase()) {
        indexes.push(i);
      }
    }
    if(indexes.length === 0){
      this.tries++;
      this.incorrectGuess += letter;
    } else {
      indexes.forEach((index) => {
        this.currentState[index] = letter.toLowerCase();
        this.currentState[0] = this.currentState[0].toUpperCase();
      });
    }
  }
}
