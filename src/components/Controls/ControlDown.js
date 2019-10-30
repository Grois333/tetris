import React from 'react';

import './Controls.css';

//callback prop to down button
const ControlDown = ({ callback }) => (

  <div className="downArrow" onClick={callback}></div>

)

export default ControlDown;
