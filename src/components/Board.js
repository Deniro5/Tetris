import React, { useState, useEffect } from "react";
import GameInfo from "./GameInfo";
import Intro from "./Intro";
import shapes from "./Shapes";

const Board = () => {
  const [board, setBoard] = useState([]); //keep track of tetrises and which square is where
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [current, setCurrent] = useState([]);
  const [currentColor, setCurrentColor] = useState("");
  const [next, setNext] = useState([]);
  const [nextColor, setNextColor] = useState("");
  const [timer, setTimer] = useState(false);
  const [start, setStart] = useState(false);
  const colors = ["red", "purple", "green", "orange", "brown", "yellow", "blue"];

  window.onkeydown = (e) => {
    if (e.keyCode === 37) {
      // left arrow
      shiftShape(-1);
    } else if (e.keyCode === 38) {
      // up arrow
      rotate();
    } else if (e.keyCode === 39) {
      // right arrow
      shiftShape(1);
    } else if (e.keyCode === 40) {
      // down arrow
      dropShape();
    }
  };

  useEffect(
    () => {
      if (timer && start) {
        //initialize the timer once after start is set
        setTimer(false);
        setTimeout(autoDropHelper, 1000 - 50 * level);
      }
    },
    [timer, start]
  );

  const rotate = () => {
    if (currentColor !== "purple") {
      // can't rotate a square
      const centerx = current[0][0];
      const centery = current[0][1];
      let newShape = [...current];
      const shapeCopy = [...current];
      let count = 1;
      let arr = [[centerx, centery]];
      while (count < 4) {
        //get new coordinates of rotated shape
        let x =
          shapeCopy[count][0] +
          (centerx - shapeCopy[count][0]) +
          (centery - shapeCopy[count][1]);
        let y =
          shapeCopy[count][1] +
          (centery - shapeCopy[count][1]) +
          (shapeCopy[count][0] - centerx);
        arr.push([x, y]);
        count++;
      }
      let update = true;
      for (let item of arr) {
        //Check that each new coordinate would be valid.
        if (item[0] < 0 || item[0] > 9) {
          update = false;
          break;
        }
        if (item[1] < 0 || item[1] > 19) {
          update = false;
          break;
        }
        if (board[item[1]][item[0]].length !== 0) {
          update = false;
          break;
        }
      }
      if (update) {
        newShape[1][0] = arr[1][0];
        newShape[1][1] = arr[1][1];
        newShape[2][0] = arr[2][0];
        newShape[2][1] = arr[2][1];
        newShape[3][0] = arr[3][0];
        newShape[3][1] = arr[3][1];
        setCurrent(newShape);
      }
    }
  };

  const autoDropHelper = () => {
    let newShape = [...current];
    //If the shape did not land on the ground or another shape
    if (
      newShape[0][1] <= 18 &&
      newShape[1][1] <= 18 &&
      newShape[2][1] <= 18 &&
      newShape[3][1] <= 18 &&
      (board[newShape[0][1] + 1][newShape[0][0]].length === 0 &&
        board[newShape[1][1] + 1][newShape[1][0]].length === 0 &&
        board[newShape[2][1] + 1][newShape[2][0]].length === 0 &&
        board[newShape[3][1] + 1][newShape[3][0]].length === 0)
    ) {
      newShape[0][1] += 1;
      newShape[1][1] += 1;
      newShape[2][1] += 1;
      newShape[3][1] += 1;
      setCurrent(newShape);
      setTimeout(autoDropHelper, 1000 - 50 * level);
    } else {
      //update board if shape landed
      let newBoard = [...board];
      newBoard[newShape[0][1]][newShape[0][0]] = currentColor;
      newBoard[newShape[1][1]][newShape[1][0]] = currentColor;
      newBoard[newShape[2][1]][newShape[2][0]] = currentColor;
      newBoard[newShape[3][1]][newShape[3][0]] = currentColor;
      //handle potential tetrises
      let affectedRows = [newShape[1][1], newShape[0][1], newShape[2][1], newShape[3][1]];
      affectedRows.sort(function(a, b) {
        return a - b;
      });
      let tetrises = 0;
      let gameOver = false;
      for (let row of affectedRows) {
        //for each row check if the game is done
        if (row < 1) {
          gameOver = true;
        }
        let res = checkTetris(row, newBoard);
        if (res) {
          tetrises++;
        }
      }
      if (tetrises !== 0) {
        //add individually because we need to see if we changed levels
        let newScore = score;
        for (let i = 0; i < tetrises; i++) {
          newScore += 100;
          if (newScore % 1000 === 0) {
            //check if there is a level change
            setLevel(level + 1);
          }
        }
        setScore(newScore);
      }
      //generate next shape
      const nextIndex = Math.floor(Math.random() * shapes.length);
      let newNext = [...shapes[nextIndex]];
      let nextCopy = [];
      for (let arr of newNext) {
        nextCopy.push([arr[0], arr[1]]); //We have to do it like this to avoid mutating the original array
      }
      setCurrentColor(nextColor);
      setCurrent(next);
      setNext(nextCopy);
      setNextColor(colors[nextIndex]);
      if (gameOver) {
        setTimer(false);
        setStart(false);
        alert("Game Over!");
      } else {
        setTimer(true);
      }
    }
  };

  const dropShape = () => {
    let newShape = [...current];
    if (
      newShape[0][1] <= 18 &&
      newShape[1][1] <= 18 &&
      newShape[2][1] <= 18 &&
      newShape[3][1] <= 18 &&
      (board[newShape[0][1] + 1][newShape[0][0]].length === 0 &&
        board[newShape[1][1] + 1][newShape[1][0]].length === 0 &&
        board[newShape[2][1] + 1][newShape[2][0]].length === 0 &&
        board[newShape[3][1] + 1][newShape[3][0]].length === 0)
    ) {
      newShape[0][1] += 1;
      newShape[1][1] += 1;
      newShape[2][1] += 1;
      newShape[3][1] += 1;
      setCurrent(newShape);
    }
  };

  const shiftShape = (direction) => {
    let newShape = [...current];
    //Check that the shape wont hit the walls or another block
    if (
      ((direction === -1 &&
        newShape[0][0] >= 1 &&
        newShape[1][0] >= 1 &&
        newShape[2][0] >= 1 &&
        newShape[3][0] >= 1) ||
        (direction === 1 &&
          newShape[0][0] <= 8 &&
          newShape[1][0] <= 8 &&
          newShape[2][0] <= 8 &&
          newShape[3][0] <= 8)) &&
      (board[newShape[0][1]][newShape[0][0] + 1 * direction].length === 0 &&
        board[newShape[1][1]][newShape[1][0] + 1 * direction].length === 0 &&
        board[newShape[2][1]][newShape[2][0] + 1 * direction].length === 0 &&
        board[newShape[3][1]][newShape[3][0] + 1 * direction].length === 0)
    ) {
      newShape[0][0] += 1 * direction;
      newShape[1][0] += 1 * direction;
      newShape[2][0] += 1 * direction;
      newShape[3][0] += 1 * direction;
      setCurrent(newShape);
    }
  };

  const checkTetris = (row, newBoard) => {
    let tetris = true;
    for (let item of newBoard[row]) {
      //check if all elements in the row are occupied
      if (item.length === 0) {
        tetris = false;
        break;
      }
    }
    //adjust the board if needed. Shift all rows above, down by 1
    if (tetris) {
      newBoard[row] = newBoard[row - 1];
      newBoard[row - 1] = ["", "", "", "", "", "", "", "", "", ""];
      row--;
      while (row >= 1) {
        //drop all the bricks above this line. if we find an empty row it means we can stop the process
        let emptyrow = true;
        for (let item of newBoard[row - 1]) {
          if (item.length > 0) {
            emptyrow = false;
            break;
          }
        }
        if (emptyrow) {
          break;
        } else {
          newBoard[row] = newBoard[row - 1];
          newBoard[row - 1] = ["", "", "", "", "", "", "", "", "", ""];
        }
        row--;
      }
      setBoard(newBoard);
    }
    return tetris;
  };

  const startGame = () => {
    const shapeIndex = Math.floor(Math.random() * shapes.length);
    let shape = [...shapes[shapeIndex]];
    let shapeCopy = [];
    for (let arr of shape) {
      shapeCopy.push([arr[0], arr[1]]); //We have to do it like this to avoid mutating the original array
    }
    const nextIndex = Math.floor(Math.random() * shapes.length);
    let next = [...shapes[nextIndex]];
    let nextCopy = [];
    for (let arr of next) {
      nextCopy.push([arr[0], arr[1]]); //We have to do it like this to avoid mutating the original array
    }
    let newBoard = [];
    for (let i = 0; i < 20; i++) {
      let newRow = [];
      for (let j = 0; j < 10; j++) {
        newRow.push("");
      }
      newBoard.push(newRow);
    }
    setBoard(newBoard);
    setCurrentColor(colors[shapeIndex]);
    setCurrent(shapeCopy);
    setTimer(true);
    setStart(true);
    setNext(nextCopy);
    setNextColor(colors[nextIndex]);
    setScore(0);
    setLevel(1);
  };

  if (!start) {
    return (
      <div className='boardContainer'>
        <Intro
          start={() => {
            startGame();
          }}
        />
        <GameInfo next={next} nextColor={nextColor} score={score} level={level} />
      </div>
    );
  }

  return (
    <div className='boardContainer'>
      <GameInfo next={next} nextColor={nextColor} score={score} level={level} />
      {current.map((square) => (
        <div
          className='square'
          style={{
            background: currentColor,
            top: square[1] * 30 + "px",
            left: square[0] * 30 + "px",
          }}
        />
      ))}
      {board.map((row, rowIndex) =>
        row.map(
          (square, colIndex) =>
            square.length > 0 && (
              <div
                className='square'
                style={{
                  background: square,
                  top: rowIndex * 30 + "px",
                  left: colIndex * 30 + "px",
                }}
              />
            )
        )
      )}
    </div>
  );
};

export default Board;
