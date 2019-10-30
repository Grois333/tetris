import React from 'react';

import './Controls.css';

//callback prop to up button
const ControlUp = ({ callback }) => (

  <div className="upArrow" onClick={callback}></div>

)

export default ControlUp;
