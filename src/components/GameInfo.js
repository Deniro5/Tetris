import React from 'react';


const GameInfo = props => {

  return (
    <div className = "gameInfoContainer">
        <div className = "infoDiv">
          <p>Next</p>
          <div className = "nextContainer">
          {props.next.map((square)=> (
              <div className = "square" style = {{background: props.nextColor, top: square[1] * 17 + "px", left: square[0] * 17 + "px", height: "15px" , width: "15px"}} />
          ))}
          </div>

        </div>
        <div className = "infoDiv">
          <p>Score</p>
          <p>{props.score}</p> 
        </div>
        <div className = "infoDiv">
          <p>Level</p>
          <p>{props.level}</p> 
        </div>
    </div>
    );
  }


export default GameInfo;
