import { useState, useEffect } from 'react';

//Import the Stage
import { createStage } from '../gameHelpers';

//Generate Clean Board
export const useStage = (player, resetPlayer) => {

  const [stage, setStage] = useState(createStage());

  //To keep track of all the rows that are cleared
  const [rowsCleared, setrowsCleared ] = useState(0);

  useEffect(() => {

    //Rows to be cleared in the game, starts at 0
    setrowsCleared(0);

    //We give our stage to check if the rows contain any [0]s
    const sweepRows = newStage =>
      newStage.reduce((ack, row) => {

        //check if a row contains a tetromino and no empty ([0])
        if(row.findIndex(cell => cell[0] === 0 ) === -1){
          setrowsCleared(prev => prev + 1);
          //the row should be cleared, we empty the row
          ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
          return ack;
        }
        //push the row into the accumulator array, if we dont have afull row
        ack.push(row);
        return ack;
      }, [])

    const updateStage = prevStage => {

      //First we flush the Stage
      const newStage = prevStage.map(row =>
        row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      );

      //Then draw the tetromino
      player.tetromino.forEach((row, y) => {
        //loop to know the shape of the tetromino
        row.forEach((value, x) => {
          //if the tetromino has a shape, position the tetromino on the stage
          if(value !==0){
            //Coordinates on the Stage
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`, //check if the player is collided
            ];
          }
        });
      });

      //Check if we collided
      if(player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }

      return newStage;

    };

    setStage(prev => updateStage(prev));

  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};
