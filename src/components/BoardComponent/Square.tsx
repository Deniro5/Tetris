import React from "react";
import styled from "styled-components";

interface SquareProps {
  color: string;
  row: number;
  col: number;
  size: number;
}

const Square: React.FC<SquareProps> = ({ color, row, col, size }) => (
  <StyledSquare color={color} row={row} col={col} size={size} />
);

const StyledSquare = styled.div<{
  color: string;
  row: number;
  col: number;
  size: number;
}>`
  position: absolute;
  top: ${({ row, size }) => row * (size + 2)}px;
  left: ${({ col, size }) => col * (size + 2)}px;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  border: 1px solid white;
  background: ${({ color }) => color};
`;

export default Square;
