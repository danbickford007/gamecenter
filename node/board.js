
board = function Board(){


  this.A1 = false
  this.A2 = false
  this.A3 = false

  this.B1 = false
  this.B2 = false
  this.B3 = false

  this.C1 = false
  this.C2 = false
  this.C3 = false

  this.nextCharacter = ''
  this.success = false
}

board.prototype.evaluate = function(position, character){
  console.log('>??>?>?>>?>?');
  console.log(this[position]);
  console.log(this.nextCharacter);
  console.log(character);
  if(this.nextCharacter != '' && this.nextCharacter != character){
    console.log('FAILED CHECK 1')
    return false
  }
  if(!this[position]){
    this.nextCharacter = (this.nextCharacter == 'X' ? 'O' : 'X')
    this[position] = character
    if((!!this.A1 && (this.A1 === this.A2 && this.A1 === this.A3)) || 
      (!!this.B1 && (this.B1 === this.B2 && this.B1 === this.B3)) || 
      (!!this.C1 && (this.C1 === this.C2 && this.C1 === this.C3))){
        this.success = character
    }
    console.log(this);
    return true 
  }
  return false
}

module.exports = board;
