import Konva from "konva";
import React, { useRef } from "react";
import { Circle, Rect, Transformer } from "react-konva";
import { CreateShapeProps } from "../../types/Props";
import { selectedShapeRefState, selectedShapeState } from "../../atom";
import { useRecoilState } from "recoil";
import { Shape, ShapeConfig } from "konva/lib/Shape";

const ShapeCircle = ({ shapeProps, onSelect, onChange }: CreateShapeProps) => {
  const shapeRef = useRef<Konva.Shape>(null);
  // const trRef = useRef<Konva.Transformer>(null);

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
          console.log(e);
          console.log("x,y", e.target.x(), e.target.y());
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
          console.log("new radius", Math.max(5, (node.width() / 2) * scaleX));
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
      {/* {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )} */}
    </React.Fragment>
  );
};
export default ShapeCircle;
