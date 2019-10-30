import React from 'react';

import { StyledCell } from './styles/StyledCell';

import { TETROMINOS } from '../tetrominos';

const Cell = ({ type }) => (

  //Grab the created TETROMINOS types and add the propertie of color
  <StyledCell type={type} color={TETROMINOS[type].color}>{console.log("rerender")}</StyledCell>
)

//Optimization for Speed controling
//It wont render all the 240 cells all the time
//Memo: Memorizes Cell Component, it will only rerender when the cells are changing
export default React.memo(Cell);
