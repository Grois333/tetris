import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../tetrominos';

import { STAGE_WIDTH, checkCollision } from '../gameHelpers';


export const usePlayer = () => {

  //Initial State of the Player
  const [player, setPlayer] = useState({

    //Setting the position of the Tetromino shape, grab the first TETROMINO created shape [0]
    pos: { x: 0, y: 0},
    tetromino: TETROMINOS[0].shape,
    collided: false,

  });


 //Creating Rotation Function
  const rotate = (matrix, dir) => {

    // Make the rows to become columns (transpose)
    const rotatedTetro = matrix.map((_, index) =>
       matrix.map(col => col[index]),
     );

     // Reverse each row to get a rotated tetromino (matrix)
     if(dir > 0) return rotatedTetro.map(row => row.reverse());
     return rotatedTetro.reverse();
  };

  //Tetromino Rotation and Checking for collision detection when roteted tetromino
  const playerRotate = (stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    //Checking for collision detection
    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while(checkCollision(clonedPlayer, stage, { x: 0, y: 0 })){

      //keeps track of how many steps we are moving to the sides back and fort
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1 ));
      //if we try to rotate more than the width of the tetromino
      if(offset > clonedPlayer.tetromino[0].length){
        //We rotate back (reverse direction)
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;

      }
    }

    setPlayer(clonedPlayer);
  };


  const updatePlayerPos = ({ x, y, collided}) => {

    //set the player state, with new values
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y)}, //addimg values to the state
      collided,
    }))
  }

  //Reseting everything, player in stage, and tetromino random shape in stage
  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0},
      tetromino: randomTetromino().shape,
      collided: false,
    })
  }, [])

  return [player, updatePlayerPos, resetPlayer, playerRotate];
}
