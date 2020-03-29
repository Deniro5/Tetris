import React from 'react';

const Intro = props => {

  return (
    <div className="introContainer">
      <h2> Tetris </h2>
      <p> How to Play: </p>
      <p style = {{fontSize:"14px", marginTop: "20px"}}> Shift blocks to the left, right and down with the arrow keys. Use the up key to rotate blocks. </p>
      <button onClick = {props.start}> Start Game</button>
    </div>
  );
}


export default Intro;


