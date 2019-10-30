import React from 'react';

import './Controls.css';

//callback prop to left button
const ControlLeft = ({ callback }) => (

  <div className="leftArrow" onClick={callback}></div>

)

export default ControlLeft;
