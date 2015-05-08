
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
  this.success_coors = {}
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
    if(!!this.A1){
      if(this.A1 === this.A2 && this.A1 === this.A3){
        this.success = character
        this.success_coors = {x1: 0, y1: 80, x2: 300, y2: 80}
      }
      if(this.A1 === this.B2 && this.A1 === this.C3){
        this.success = character
        this.success_coors = {x1: 0, y1: 50, x2: 300, y2: 300}

      }
      if(this.A1 === this.B1 && this.A1 === this.C1){
        this.success = character
        this.success_coors = {x1: 50, y1: 50, x2: 50, y2: 300}

      }

    }
    if(!!this.B1){
      if(this.B1 === this.B2 && this.B1 === this.B3){
        this.success = character
        this.success_coors = {x1: 150, y1: 50, x2: 150, y2: 300}

      }
//       if(this.B1 === this.B2 && this.B1 === this.B3){
//         this.success = character
//
//       }
    }
    if(!!this.C1){
      if(this.C1 === this.C2 && this.C1 === this.C3){
        this.success = character
        this.success_coors = {x1: 150, y1: 50, x2: 150, y2: 300}

      }
      if(this.C1 === this.C2 && this.C1 === this.C3){
        this.success = character
        this.success_coors = {x1: 250, y1: 50, x2: 250, y2: 300}

      }
      if(this.A3 === this.C1 && this.B2 === this.C1){
        this.success = character
        this.success_coors = {x1: 300, y1: 50, x2: 0, y2: 300}

      }
    }
    // if((!!this.A1 && (
    //     (this.A1 === this.A2 && this.A1 === this.A3) || 
    //     (this.A1 === this.B2 && this.A1 === this.C3) || 
    //     (this.A3 === this.B2 && this.A1 === this.C1) ||
    //     (this.A1 === this.B1 && this.A1 === this.C1)
    //   )) || 
    //   (!!this.B1 && (
    //     (this.B1 === this.B2 && this.B1 === this.B3) ||
    //     (this.B1 === this.B2 && this.B1 === this.B3) 
    //   )) || 
    //   (!!this.C1 && (
    //     (this.C1 === this.C2 && this.C1 === this.C3) ||
    //     (this.C1 === this.C2 && this.C1 === this.C3) 
    //   ))){
    //     this.success = character
    // }
    console.log(this);
    return true 
  }
  return false
}

module.exports = board;
