import Konva from "konva";
import React, { useRef } from "react";
import { Circle, Line, Rect, Transformer } from "react-konva";
import { CreateShapeProps } from "../../types/Props";

const ShapeLine = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}: CreateShapeProps) => {
  const shapeRef = useRef<Konva.Shape>(null);
  // const trRef = useRef< Konva.Transformer>(null);

  // React.useEffect(() => {
  //     if (isSelected&&trRef.current) {
  //       trRef.current.nodes([shapeRef.current!]);
  //       trRef.current.getLayer()!.batchDraw();
  //       // console.log("selected shape is", shapeProps);
  //     }
  //   }, [isSelected]);

  return (
    <React.Fragment>
      <Line
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
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange(
            {
              ...shapeProps.attrs,
              x: node.x(),
              y: node.y(),
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
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
export default ShapeLine;
