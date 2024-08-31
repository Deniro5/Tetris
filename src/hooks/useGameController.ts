import { useEffect, useRef } from "react";
import { useBoardStore } from "../zustand/useBoardStore";
import { useGameStore } from "../zustand/useGameStore";
import { getRandomShape } from "../utils";
import {
  cloneBoard,
  getNewBoard,
  handleTetris,
  isValidPosition,
} from "../utils/boardutils";

type Direction = "left" | "right" | "down";

function useGameController() {
  const { board, setBoard, setCurrentShape, currentShape } = useBoardStore();
  const {
    isPlaying,
    setIsPlaying,
    setScore,
    nextShape,
    setNextShape,
    score,
    level,
  } = useGameStore();

  const currentShapeRef = useRef(currentShape);
  const boardRef = useRef(board);
  const nextShapeRef = useRef(nextShape);
  const scoreRef = useRef(score);
  const levelRef = useRef(level);

  currentShapeRef.current = currentShape;
  boardRef.current = board;
  nextShapeRef.current = nextShape;
  scoreRef.current = score;
  levelRef.current = level;

  const handleRotate = () => {
    if (!currentShapeRef.current || currentShape?.shapeType === "O") return;

    const pivot = currentShapeRef.current.coordinates[0]; // Assuming the first point is the pivot
    const [pivotX, pivotY] = pivot;

    const newCoordinates: [number, number][] =
      currentShapeRef.current.coordinates.map(([x, y]) => {
        const newX = pivotX + (y - pivotY);
        const newY = pivotY - (x - pivotX);
        return [newX, newY];
      });

    const isValidRotation = newCoordinates.every((coordinate) =>
      isValidPosition(boardRef.current, coordinate)
    );

    if (isValidRotation) {
      setCurrentShape({
        shapeType: currentShapeRef.current.shapeType,
        coordinates: newCoordinates,
      });
    }
  };

  const handleMove = (direction: Direction) => {
    if (!currentShapeRef.current) return;

    const newCoordinates: [number, number][] =
      currentShapeRef.current.coordinates.map(([x, y]) => {
        let newX = x;
        let newY = y;

        switch (direction) {
          case "left":
            newX = x - 1;
            break;
          case "right":
            newX = x + 1;
            break;
          case "down":
            newY = y + 1;
            break;
          default:
            break;
        }
        return [newX, newY];
      });

    const isValidMove = newCoordinates.every((coordinate) =>
      isValidPosition(boardRef.current, coordinate)
    );

    const newShapeType = currentShapeRef.current.shapeType;

    if (isValidMove) {
      setCurrentShape({
        ...{
          shapeType: newShapeType,
          coordinates: newCoordinates,
        },
      });
    }
  };

  const getNextShape = () => {
    setCurrentShape(nextShapeRef.current || getRandomShape());
    setNextShape(getRandomShape());
  };

  const hasCurrentShapeLanded = () =>
    currentShapeRef.current?.coordinates.some((coordinate) => {
      const x = coordinate[0];
      const y = coordinate[1];
      return y === 19 || boardRef.current[y + 1][x];
    });

  const handlePostMove = () => {
    if (hasCurrentShapeLanded()) {
      const boardWithLandedShape = cloneBoard(boardRef.current);
      currentShapeRef.current?.coordinates.forEach((coordinate) => {
        boardWithLandedShape[coordinate[1]][coordinate[0]] =
          currentShapeRef.current?.shapeType || null;
      });
      const rowsAffected =
        currentShapeRef.current?.coordinates
          .map((coordinate) => coordinate[1])
          .sort() || [];
      const start = rowsAffected[0];
      const end = rowsAffected[rowsAffected?.length - 1];
      if (start <= 0) {
        handleGameOver();
        return;
      }
      const { boardAfterTetris, tetrises } = handleTetris(
        boardWithLandedShape,
        start,
        end
      );
      setScore(scoreRef.current + tetrises * 100);
      setBoard(boardAfterTetris);
      getNextShape();
    }
  };

  const handleGameOver = () => {
    alert("Game Over! Your final score was " + scoreRef.current);
    setIsPlaying(false);
    setBoard(getNewBoard());
    setScore(0);
    setNextShape(null);
  };

  //Setup the keyboard listeners
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          handleMove("left");
          break;
        case "ArrowUp":
          handleRotate();
          break;
        case "ArrowRight":
          handleMove("right");
          break;
        case "ArrowDown":
          handleMove("down");
          break;
        default:
          break;
      }
    };

    if (isPlaying) {
      getNextShape();
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying]);

  //set interval to drop blocks after a certain time has elapsed
  useEffect(() => {
    let dropTimer = null;

    if (isPlaying) {
      if (dropTimer) clearInterval(dropTimer);

      dropTimer = setInterval(() => {
        handleMove("down");
        handlePostMove();
      }, Math.max(1000 - levelRef.current * 50, 100));
    }
    return () => {
      if (dropTimer) {
        clearTimeout(dropTimer);
      }
    };
  }, [isPlaying, levelRef.current]);

  return {};
}

export default useGameController;
