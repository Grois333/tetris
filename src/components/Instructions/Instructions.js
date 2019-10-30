import React from 'react';

import './Instructions.css';



const Instructions = () => {
  return (


        <div className="info">

           <p>How to play?</p>

           <ol>
             <li>Press the <strong>Start Game</strong> button.</li>
             <li>Press the <strong>Left</strong> and <strong>Right</strong> arrow keys to move the Tetromino.</li>
             <li>Press the <strong>Down</strong> arrow key to drop the Tetromino faster.</li>
             <li>Press the <strong>Up</strong> arrow key to rotate the Tetromino.</li>
             <li>Complete<strong>10 Full rows</strong> to advance through the levels .</li>
             <li>Have fun and Get the <strong>Highest Score</strong>.</li>
           </ol>

           <div className="score">

           <table>
               <tbody>
                 <tr>
                   <th>Row clear</th>
                   <th>Points</th>
                </tr>
                <tr>
                   <td>1 (single)</td>
                   <td>40</td>
                </tr>
                <tr>
                    <td>2 (double)</td>
                    <td>100</td>
                </tr>
                <tr>
                  <td>3 (triple)</td>
                  <td>300
                  </td>
                </tr>
                <tr>
                    <td>4 (tetris)</td>
                    <td>1200</td>
                </tr>
               </tbody>
             </table>

         </div>

         </div>


  );
}

export default Instructions;
