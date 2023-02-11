export class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  // get the magnitude of the vector
  getMagnitude() {
    // use pythagoras theorem to work out the magnitude of the vector
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  add(addendVector) {
    // add vector components
    return new Vector(this.x + addendVector.x, this.y + addendVector.y);
  }

  sub(subtrahendVector) {
    return new Vector(this.x - subtrahendVector.x, this.y - subtrahendVector.y);
  }

  //returns a new vector with minimum magnitude of each component of two vectors
  min(vector1, vector2) {
    let newX, newY;
    if (vector1.x > 0) {
      newX = vector1.x < vector2.x ? vector1.x : vector2.x;
    } else if (vector1.x < 0) {
      newX = vector1.x < -vector2.x? -vector2.x : vector1.x;
    }
    if (vector1.y > 0) {
      // newY = vector1.y < vector2.y ? vector1.y : vector2.y;
      //* keep velocity as it is during fall
      newY = vector1.y;
    } else if(vector1.y<0){
      newY = vector1.y < -vector2.y ? -vector2.y : vector1.y;
    }

    return new Vector(newX, newY);
  }
}
