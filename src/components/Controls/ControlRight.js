import React from 'react';

import './Controls.css';

//callback prop to right button
const ControlRight = ({ callback }) => (

  <div className="rightArrow" onClick={callback}></div>

)

export default ControlRight;
