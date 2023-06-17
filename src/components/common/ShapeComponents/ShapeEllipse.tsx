import Konva from "konva";
import React, { useRef } from "react";
import { Ellipse } from "react-konva";
import { CreateShapeProps } from "../../../types/Props";

const ShapeEllipse = ({ shapeProps, onSelect, onChange }: CreateShapeProps) => {
  const shapeRef = useRef<Konva.Shape>(null);

  return (
    <React.Fragment>
      <Ellipse
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
          const scaleY = node.scaleY();
          node.scaleY(1);
          node.scaleX(1);
          onChange(
            {
              ...shapeProps.attrs,
              x: node.x(),
              y: node.y(),
              radiusX: Math.max(5, (node.width() * scaleX) / 2),
              radiusY: Math.max((node.height() * scaleY) / 2),
            },
            shapeRef.current!,
            e
          );
        }}
      />
    </React.Fragment>
  );
};
export default ShapeEllipse;
