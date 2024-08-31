//4 is the middle index

export type ShapeType = "I" | "J" | "L" | "O" | "T" | "Z" | "S";

export const shapeColors: Record<ShapeType, string> = {
  I: "#00FFFF",
  J: "#0000FF",
  L: "#FFA500",
  O: "#FFFF00",
  T: "#800080",
  Z: "#FF0000",
  S: "#00AA00",
};

export type Shape = { shapeType: ShapeType; coordinates: [number, number][] };

export const shapes: Shape[] = [
  {
    shapeType: "I",
    coordinates: [
      [4, 1],
      [4, 0],
      [4, 2],
      [4, 3],
    ],
  },
  {
    shapeType: "O",
    coordinates: [
      [4, 0],
      [5, 0],
      [4, 1],
      [5, 1],
    ],
  },
  {
    shapeType: "L",
    coordinates: [
      [5, 1],
      [4, 0],
      [5, 0],
      [5, 2],
    ],
  },
  {
    shapeType: "J",
    coordinates: [
      [4, 1],
      [5, 0],
      [4, 0],
      [4, 2],
    ],
  },
  {
    shapeType: "T",
    coordinates: [
      [4, 1],
      [4, 0],
      [4, 2],
      [5, 1],
    ],
  },
  {
    shapeType: "Z",
    coordinates: [
      [5, 1],
      [4, 1],
      [5, 0],
      [4, 2],
    ],
  },
  {
    shapeType: "S",
    coordinates: [
      [4, 1],
      [4, 0],
      [5, 1],
      [5, 2],
    ],
  },
];
