import styled from "styled-components";
import { useGameStore } from "../../zustand/useGameStore";
import { useBoardStore } from "../../zustand/useBoardStore";
import Square from "./Square";
import useGameController from "../../hooks/useGameController";
import { shapeColors } from "../../shapes";

function BoardComponent() {
  const { isPlaying, setIsPlaying } = useGameStore();
  const { board, currentShape } = useBoardStore();
  useGameController();

  const StartComponent = () => (
    <StartContainer>
      <Title> Tetris </Title>
      <Subtitle> How to Play: </Subtitle>
      <Text>
        Shift blocks to the left, right and down with the arrow keys. Use the up
        key to rotate blocks.
      </Text>
      <StartButton onClick={() => setIsPlaying(true)}> Start Game</StartButton>
    </StartContainer>
  );

  const renderBoard = () => (
    <>
      {board.map((row, rowIndex) =>
        row.map(
          (shapeType, colIndex) =>
            //if theres no color , the space is empty and we shouldnt render anything
            shapeType && (
              <Square
                key={`${rowIndex}-${colIndex}`}
                color={shapeColors[shapeType]}
                row={rowIndex}
                col={colIndex}
                size={28}
              />
            )
        )
      )}
      {currentShape &&
        currentShape.coordinates.map((coordinate) => (
          <Square
            key={`${coordinate[1]}-${coordinate[0]}`}
            color={shapeColors[currentShape.shapeType]}
            row={coordinate[1]}
            col={coordinate[0]}
            size={28}
          />
        ))}
    </>
  );
  return <Board>{isPlaying ? renderBoard() : <StartComponent />}</Board>;
}

const Board = styled.div`
  position: relative;
  border: 2px solid grey;
  width: 300px;
  height: 600px;
  background: black;
  display: flex;
  justify-content: center;
`;

const StartContainer = styled.div`
  text-align: center;
  color: white;
  padding: 72px 24px;
`;

const StartButton = styled.button`
  width: 100px;
  height: 25px;
  border: 1px solid white;
  color: white;
  background: black;
  margin-top: 40px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: white;
    color: black;
  }
`;

const Title = styled.h2`
  font-size: 32px;
`;

const Subtitle = styled.p`
  font-size: 16px;
`;

const Text = styled.p`
  font-size: 13px;
  margin-top: 25px;
`;

export default BoardComponent;
