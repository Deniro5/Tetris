import styled from "styled-components";
import { useGameStore } from "../../zustand/useGameStore";
import Square from "../BoardComponent/Square";
import { shapeColors } from "../../shapes";

function GameInfo() {
  const { score, level, nextShape } = useGameStore();

  const renderNextShape = () => (
    <NextShapeContainer>
      {nextShape?.coordinates.map((coordinate) => (
        <Square
          color={shapeColors[nextShape.shapeType]}
          row={coordinate[1]}
          col={coordinate[0]}
          size={15}
        />
      ))}
    </NextShapeContainer>
  );

  return (
    <GameInfoContainer>
      <InfoSection>
        <Text> Next </Text>
        <Text> {nextShape?.shapeType ? renderNextShape() : "-"} </Text>
      </InfoSection>
      <InfoSection>
        <Text> Score </Text>
        <Text> {score} </Text>
      </InfoSection>
      <InfoSection>
        <Text> Level </Text>
        <Text> {level} </Text>
      </InfoSection>
    </GameInfoContainer>
  );
}

const GameInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Text = styled.p`
  margin: 0;
`;

const NextShapeContainer = styled.div`
  position: relative;
  margin-left: -64px;
  margin-top: 16px;
  height: 56px;
`;

export default GameInfo;
