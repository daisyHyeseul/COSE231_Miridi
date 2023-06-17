import Konva from "konva";
import React, { useRef } from "react";
import { Rect } from "react-konva";
import { CreateShapeProps } from "../../../types/Props";

const ShapeRetangle = ({
  shapeProps,
  onSelect,
  onChange,
}: CreateShapeProps) => {
  const shapeRef = useRef<Konva.Shape>(null);

  return (
    <React.Fragment>
      <Rect
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

          node.scaleX(1);
          node.scaleY(1);
          console.log("new width", Math.max(5, node.width() * scaleX));
          onChange(
            {
              ...shapeProps.attrs,
              x: node.x(),
              y: node.y(),
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
            },
            shapeRef.current!,
            e
          );
        }}
      />
    </React.Fragment>
  );
};
export default ShapeRetangle;
