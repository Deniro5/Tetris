import { shapes } from "../shapes";

export const getRandomShape = () => {
  const shapeIndex = Math.floor(Math.random() * Object.keys(shapes).length);
  return shapes[shapeIndex];
};
