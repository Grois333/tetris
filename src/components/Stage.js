import React from 'react';

import { StyledStage } from './styles/StyledStage';

// The Cells are going to be in the stage
import Cell from './Cell';

const Stage = ({ stage }) => (
        /* Render the row that each of them is an array that has a cell*/
  <StyledStage width={stage[0].length} height={stage.length}>

     {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}

   </StyledStage>
);


export default Stage;
