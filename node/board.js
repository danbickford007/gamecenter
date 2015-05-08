
board = function Board(){


  this.A1 = ''
  this.A2 = ''
  this.A3 = ''

  this.B1 = ''
  this.B2 = ''
  this.B3 = ''

  this.C1 = ''
  this.C2 = ''
  this.C3 = ''

  this.nextCharacter = ''

}

board.prototype.evaluate = function(position, character){
  console.log('>??>?>?>>?>?');
  console.log(this[position]);
  console.log(this.nextCharacter);
  console.log(character);
  if(this.nextCharacter != '' && this.nextCharacter != character){
    console.log('FAILED CHECK 1')
    return false
  }else if(this[position] == ''){
    this.nextCharacter = (this.nextCharacter == 'X' ? 'O' : 'X')
    this[position] = character
    return true 
  }
  return false
}

module.exports = board;
