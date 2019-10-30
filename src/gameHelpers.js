export const STAGE_WIDTH = 12;

export const STAGE_HEIGHT = 20;

//Create the Stage of rows of cells (Array in an Array)
export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, 'clear']) // 0 is a clean cell, clear is that no tetrominos collision
);


//Check for collisions (out of the stage and with other Tetrominos)
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {

  //Loop through the tetromino
  for(let y = 0; y < player.tetromino.length; y += 1){
    for(let x = 0; x < player.tetromino[y].length; x += 1){

     // 1. Check that we are on an actual Tetromino cell
      if(player.tetromino[y][x] !== 0){

        if(
        // 2. Check that our move is inside the game areas height (y)
        // We shouldn't go through the bottom of the play area
        !stage[y + player.pos.y + moveY] ||

        // 3. Check that our move is inside the game areas width (x)
        !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||

        // 4. Check that the cell we are moving to, isn't set to clear
        stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
       ) {

          return true;

        }
      }

    }
  }

};
