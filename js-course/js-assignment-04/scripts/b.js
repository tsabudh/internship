for (let i = 0; i <= NUMBER_OF_BOXES; i++) {
    let xOffset, yOffset, width, height;
    xOffset = Math.max(
      Math.floor(Math.random() * CONTAINER_WIDTH - BOX.WIDTH),
      0
    );
    yOffset = Math.max(
      Math.floor(Math.random() * CONTAINER_HEIGHT - BOX.HEIGHT),
      0
    );
    width = BOX.WIDTH;
    height = BOX.HEIGHT;

while(xDifference <= BOX.WIDTH && yDifference <= BOX.HEIGHT){

    for(let box in box1Coordinates){
         xDifference = Math.abs(boxCoordinates[`${box}`]?.xOffset - xOffset);
       yDifference = Math.abs(boxCoordinates[`${box}`].yOffset - yOffset);

      
    
    }
}}