import Konva from "konva";
import { ShapesProps } from "../types/Props";
import uuid from "react-uuid";
const rectangle = new Konva.Rect({
  x: 400,
  y: 200,
  width: 100,
  height: 100,
  opacity: 1,
  fill: Konva.Util.getRandomColor(),
} as Konva.RectConfig);
const newRect = {
  shapeid: uuid(),
  shapetype: "RECTANGLE",
  shape: rectangle,
};
// private variable accessible only within current module
let Shapes: ShapesProps[] = [newRect];

export const shapeActions = {
  // configure the single instance logged in user
  updateShape: (newShapes: ShapesProps[]) => {
    Shapes = newShapes;
  },
  getShape: () => {
    return Shapes;
  },
};
