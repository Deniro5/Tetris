import styled from "styled-components";
import BoardComponent from "./components/BoardComponent";
import GameInfo from "./components/Gameinfo";

function App() {
  return (
    <GameContainer>
      <BoardComponent />
      <GameInfo />
    </GameContainer>
  );
}

const GameContainer = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  gap: 36px;
`;

export default App;
