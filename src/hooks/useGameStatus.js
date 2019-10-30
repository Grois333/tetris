import { useState, useEffect, useCallback } from 'react';


//Set the Game Status
export const useGameStatus = rowsCleared => {

  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  //Scores
  const linePoints = [40, 100, 300, 1200];

  const calcScore = useCallback(() => {

    // If we clear a row (not 0) so we have a Score
    if(rowsCleared > 0){

      //This is how original Tetris score is calculated
      setScore(prev => prev + linePoints[rowsCleared -1] * (level + 1));

      //Keep track of Rows Cleared
      setRows(prev => prev + rowsCleared);
    }
  }, [level, linePoints, rowsCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared, score]);

  return [score, setScore, rows, setRows, level, setLevel];

};
