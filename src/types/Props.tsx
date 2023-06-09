import Konva from "konva";
import { Shape, ShapeConfig } from "konva/lib/Shape";

export interface ShapesProps {
  shapeid: string;
  shapetype: string;
  shape: Konva.Shape;
}

export interface CreateShapeBtnProps {
  shapetype: string;
  onClick: (e: React.MouseEvent) => void;
}

export interface CreateShapeProps {
  shapeProps: any;
  onSelect: (e: React.MouseEvent, ref: Shape<ShapeConfig> | null) => void;
  onChange: (newAttrs: any, ref: Shape<ShapeConfig>, e: any) => void;

  // onDelete: () => void;
}
export interface DeleteShapeBtnProps {
  onDelete: (e: React.MouseEvent) => void;
}

export interface ZorderBtnProps {
  // onClick: (e: React.MouseEvent) => void;
  zorder: string;
}

export interface PropertiesProps {
  color: string;
  height: number | null;
  width: number | null;
  radius: number | null;
  x: number;
  y: number;
  opacity: number;
}
