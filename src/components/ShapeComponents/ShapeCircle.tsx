import Konva from "konva";
import React, { useRef } from "react";
import { Circle, Rect, Transformer } from "react-konva";
import { CreateShapeProps } from "../../types/Props";
import { selectedShapeRefState, selectedShapeState } from "../../atom";
import { useRecoilState } from "recoil";

const ShapeCircle = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}: CreateShapeProps) => {
  const shapeRef = useRef<Konva.Shape>(null);
  // const trRef = useRef<Konva.Transformer>(null);

  React.useEffect(() => {
    if (isSelected && shapeRef) {
      // console.log(isSelected);
      // trRef.current.nodes([shapeRef.current!]);
      // trRef.current.getLayer()!.batchDraw();
      // setSelectedRef(shapeRef.current!);
      // console.log(shapeRef.current);
      // if (shapeRef) console.log("ref.current", shapeRef.current);
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Circle
        onMouseDown={(e) => {
          onSelect(shapeRef.current!);
          console.log("클릭", shapeRef.current);
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
            shapeRef.current!
          );
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current!;
          const scaleX = node.scaleX();
          node.scaleY(1);

          node.scaleX(1);
          console.log("지금 반지름", node.width());
          onChange(
            {
              ...shapeProps.attrs,
              x: node.x(),
              y: node.y(),
              radius: Math.max(5, (node.width() / 2) * scaleX),
            },
            shapeRef.current!
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
