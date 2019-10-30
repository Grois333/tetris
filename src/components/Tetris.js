import React, { useState } from 'react';

import { createStage, checkCollision } from '../gameHelpers';

import Logo from './Logo/Logo';

import Instructions from './Instructions/Instructions';

import Info from './Info/Info';

import ControlUp from './Controls/ControlUp';

import ControlDown from './Controls/ControlDown';

import ControlLeft from './Controls/ControlLeft';

import ControlRight from './Controls/ControlRight';


//Import Styled Componenst
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

//Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

// Game components
import Stage from './Stage';

import Display from './Display';

import StartButton from './StartButton';



const Tetris = ({user}) => {

  //Speed of the drop in the game depending the Level
  const [dropTime, setDropTime] = useState(null);

  //When the game is Over
  const [gameOver, setGameOver] = useState(false);

  //To set the Tetromino position
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();

  //Send the Tetromino to the stage
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);

  //Checking game status
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  //Setting the audio
   // let audio = new Audio("/tetris.mp3");


  // console.log(createStage());

  // console.log('re-render');

  //Player movement, left and right
  const movePlayer = dir => {

    //If it not collided with nothing on the sides, do the move! otherwise dont do anything
    if(!checkCollision(player, stage, { x: dir, y: 0 })){

      //Update player position
      updatePlayerPos({ x: dir, y: 0 });

    }

  }






  //Starting the Game
  const startGame = () => {

    //Reset everything
    setStage(createStage());
    setDropTime(1000);  //The Tetromino will drop 1s automatic
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);


    //audio.play();



  };

  //Droping down the player
  const drop = () => {

    //Increase level when player has cleared 10 rows
    if(rows > (level + 1) * 10){
      setLevel(prev => prev + 1);

      //Increase the speed of the drop in the game
      setDropTime(1000 / (level + 1) + 200);
    }

    //Check if not collided on drop down
    if(!checkCollision(player, stage, { x: 0, y: 1})){

      //Update player position
      updatePlayerPos({ x: 0, y: 1, collided: false});

    } else {

      //Game over
      if(player.pos.y < 1){
        console.log("GAME OVER!!!");

       //Update the Entrie HighScore if the current HighScore is grater than the previous
        if(score > user.entries){
          user.entries = score;
          onGameOver(user);
        }


        setGameOver(true);
        setDropTime(null);

        //audio = new Audio();
        // audio.pause();

        //console.log(user);



      }

      //else if it collided on drop, set the property to true (merge the player to the stage)
      updatePlayerPos({ x: 0, y: 0, collided: true});

    }

  }


  //Send To Server
  const onGameOver = (user) => {
     fetch('https://fathomless-eyrie-98144.herokuapp.com/high-score', {
       method: 'put',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify(user)
     }).then(response => response.json())
       // .then(user => {
       //   if(user.id){
       //     this.props.loadUser(user);
       //   }
       // })
   }




  //When player releases the key down pressed, set Interval drop again
  const keyUp = ({ keyCode }) => {

    if(!gameOver){
      if(keyCode === 40){
        console.log('Interval On!');
        setDropTime(1000 / (level + 1) + 200);
      }
    }

  }


  //Function to go down the player (when we press the down key)
  const dropPlayer = () => {

    // console.log('Interval Off!');

    // Stop the Interval drop when pressed down
    setDropTime(null);

    drop();
  }


  //Callback function when we press the keys in the keyboard
  const move = ({ keyCode }) => {

    //Check that the game is not Over
    if(!gameOver){
      if(keyCode === 37){ //left key arrow on the keyboard
        movePlayer(-1); //moving to the left
      } else if (keyCode === 39 ){ //right key arrow on the keyboard
        movePlayer(1); //moving to the right
      } else if (keyCode === 40){ //down key arrow on the keyboard
        dropPlayer(); //go down
      } else if (keyCode === 38){ //up key arrow on the keyboard
        playerRotate(stage, 1); // call rotate function to rotate tetromino
      }
    }
  }


 //We use Interval function for the drop time of the Tetromino
  useInterval(() => {

    drop();

  }, dropTime)


  //Function for Responsive Controls

  //To Left
  const moveLeft = () => {
    movePlayer(-1);
  }

  //To Right
  const moveRight = () => {
    movePlayer(1);
  }

  //To Down
  const moveDown = () => {
    dropPlayer();
    if(!gameOver){
      console.log('Interval On!');
      setDropTime(1000 / (level + 1) + 200);
    }
  }

  //To Rotate
  const toRotate = () => {
    playerRotate(stage, 1);
  }





  return(
    //Wrap with our background, Callback function when a key is press on the screen
    //If the game is over Display gameOver
    //call the startGame function on click start button

     // <Particles className='particles' params={particlesOptions}>



    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>



      <StyledTetris>

       <Logo />

     <Instructions />

      <Stage stage={stage} />


      <aside>


        {gameOver ? (

          <div>
            <audio src="" />
            <Info name={user.name} />
           <Display gameOver={gameOver} text="Game Over" />
            <Display text={`High Score: ${user.entries}`} />
           <Display text={`Score: ${score}`} />
           <Display text={`Rows: ${rows}`} />
           <Display text={`Level: ${level}`} />
          </div>

        ) : (

        <div>
          <audio src="./tetris1.mp3" autoPlay loop/>
          <Info name={user.name} />
          <Display text={`High Score: ${user.entries}`} />
         <Display text={`Score: ${score}`} />
         <Display text={`Rows: ${rows}`} />
         <Display text={`Level: ${level}`} />

         
          <ControlUp callback={toRotate}></ControlUp>
          <ControlDown callback={moveDown}></ControlDown>
          <ControlLeft callback={moveLeft}></ControlLeft>
          <ControlRight callback={moveRight}></ControlRight>
        

        </div>



       )}



        <StartButton callback={startGame}></StartButton>


      </aside>

      </StyledTetris>


    </StyledTetrisWrapper>

   // </Particles>

  )
}

export default Tetris;

//<StartButton onClick={toggle}  callback={startGame}>{playing ? "Pause" : "Play"}/>
