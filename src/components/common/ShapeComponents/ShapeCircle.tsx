import Konva from "konva";
import React, { useRef } from "react";
import { Circle } from "react-konva";
import { CreateShapeProps } from "../../../types/Props";

const ShapeCircle = ({ shapeProps, onSelect, onChange }: CreateShapeProps) => {
  const shapeRef = useRef<Konva.Shape>(null);

  return (
    <React.Fragment>
      <Circle
        onMouseDown={(e: React.MouseEvent) => {
          onSelect(e, shapeRef.current!);
        }}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange(
            {
              ...shapeProps.attrs,
              x: e.target.x(),
              y: e.target.y(),
            },
            shapeRef.current!,
            e
          );
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current!;
          const scaleX = node.scaleX();
          node.scaleY(1);
          node.scaleX(1);
          onChange(
            {
              ...shapeProps.attrs,
              x: node.x(),
              y: node.y(),
              radius: Math.max(5, (node.width() / 2) * scaleX),
            },
            shapeRef.current!,
            e
          );
        }}
      />
    </React.Fragment>
  );
};
export default ShapeCircle;
