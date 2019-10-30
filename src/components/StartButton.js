import React from 'react';

import { StyledStartButton } from './styles/StyledStartButton';

//callback prop to start button
const StartButton = ({ callback }) => (

  <StyledStartButton onClick={callback}> Start Game </StyledStartButton>
)

export default StartButton;
