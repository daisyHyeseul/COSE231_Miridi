import { atom, selector } from "recoil";
import { ShapesProps } from "../types/Props";
import { Shape, ShapeConfig } from "konva/lib/Shape";
import React from "react";
import { Node } from "konva/lib/Node";

export const shapesState = atom<ShapesProps[]>({
  key: "shapesState",
  default: [],
});

export const selectedShapeState = atom<ShapesProps[]>({
  key: "selectedShapeState",
  default: [],
});

export const selectedShapeRefState = atom<Shape<ShapeConfig>[]>({
  key: "selectedShapeRefState",
  default: [],
  dangerouslyAllowMutability: true,
});
