import Konva from "konva";
import { Shape, ShapeConfig } from "konva/lib/Shape";
import React from "react";

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
  onClick: (e: React.MouseEvent) => void;
  zorder: string;
}

export interface ColorChipProps {
  color: string;
  onClick: (e: React.MouseEvent, newColor: string) => void;
}

export interface PropertyColorProps {
  onChangeColor: (e: React.MouseEvent, newColor: string) => void;
  onClick: (e: React.MouseEvent, ispopup: boolean) => void;
  popupIsOpen: boolean;
  Color: string;
}

export interface ColorPopupProps {
  onChangeColor: (e: React.MouseEvent, newColor: string) => void;
  onClick: (e: React.MouseEvent, ispopup: boolean) => void;
}

export interface PropertyOpacityProps {
  onChangeOpacity: (e: any) => void;
  opacity: number;
}

export interface PropertyTextProps {
  property: ShapeConfig;
  shapeType: string;
}
