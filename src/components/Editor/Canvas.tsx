import React, {
  LegacyRef,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Stage,
  Layer,
  Star,
  Text,
  Circle,
  Rect,
  Line,
  Transformer,
} from "react-konva";
import Konva from "konva";
import { ShapesProps } from "../../types/Props";
import ShapeRetangle from "../ShapeComponents/ShapeRectangle";
import ShapeRectangle from "../ShapeComponents/ShapeRectangle";
import ShapeCircle from "../ShapeComponents/ShapeCircle";
import ShapeLine from "../ShapeComponents/ShapeLine";
import ShapeText from "../ShapeComponents/ShapeText";
import {
  selectedShapeRefState,
  selectedShapeState,
  shapesState,
} from "../../atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { Node, NodeConfig } from "konva/lib/Node";
import { Shape, ShapeConfig } from "konva/lib/Shape";

const Canvas = () => {
  const layerRef = useRef<Konva.Layer>(null);
  const trRef = useRef<Konva.Transformer>(null);
  // const [selectedRef, setSelectedRef] = useRecoilState<Shape<ShapeConfig>[]>(
  //   selectedShapeRefState
  // );
  const [selectedRef, setSelectedRef] = useState<Shape<ShapeConfig>[]>(
    [] as Shape<ShapeConfig>[]
  );
  const [selectedShape, setSelectedShape] = useRecoilState(selectedShapeState);
  const [shapes, setShapes] = useRecoilState<Array<ShapesProps>>(shapesState);

  const shapeComponents: any = {
    RECTANGLE: ShapeRectangle,
    CIRCLE: ShapeCircle,
    LINE: ShapeLine,
    TEXT: ShapeText,
    // Add more shape types and components as needed
  };

  React.useEffect(() => {
    if (trRef.current) {
      trRef.current.nodes(selectedRef);
      // const newnodes = selectedShape[0].shape as Node<NodeConfig>;
      // trRef.current.nodes([newnodes]);
      trRef.current.getLayer()!.batchDraw();
    }
    if (
      shapes.length > 0 &&
      selectedShape.length > 0 &&
      selectedShape[0] != null
    ) {
      // console.log("current ShapeRef", selectedRef);
      // console.log("current selected shape", selectedShape);
      // console.log("current  shape", shapes);
    }
  }, [selectedRef, selectedShape, shapes]);

  // console.log(shapeRef.current);
  const canvasWidth = 900;
  const canvasHeight = 500;

  return (
    <CanvasContainer>
      <CanvasWrapper>
        <Stage
          width={canvasWidth}
          height={canvasHeight}
          onMouseDown={(e) => {
            const clickedOnEmpty = e.target === e.target.getStage();
            if (clickedOnEmpty) {
              setSelectedShape([]);
              setSelectedRef([]);
            }
          }}
        >
          <Layer ref={layerRef}>
            {shapes.map((shape: any) => {
              const ShapeComponent = shapeComponents[shape.shapetype];
              if (ShapeComponent) {
                return (
                  <ShapeComponent
                    key={shape.shapeid}
                    shapeProps={shape.shape}
                    isSelected={shape === selectedShape[0]}
                    onSelect={(ref: Shape<ShapeConfig>) => {
                      setSelectedShape([shape]);
                      setSelectedRef([ref]);
                    }}
                    onChange={(newAttrs: any, ref: Shape<ShapeConfig>) => {
                      const updatedShapes = shapes.map((shape: any) => {
                        if (shape.shapeid === selectedShape[0].shapeid) {
                          const updateShape = {
                            ...shape,
                            shape: { ...shape, attrs: newAttrs },
                          };
                          console.log("updateShape", updateShape);
                          setSelectedShape([updateShape]);
                          return updateShape;
                        }
                        return shape;
                      });
                      setShapes(updatedShapes);
                      console.log("updated shapes", updatedShapes);
                    }}
                  />
                );
              }
              return null;
            })}
            <Transformer
              ref={trRef}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          </Layer>
        </Stage>
      </CanvasWrapper>
    </CanvasContainer>
  );
};

export default Canvas;
export const CanvasContainer = styled.div`
  position: relative;
  z-index: 0;
  flex: 1;
  display: flex;
  padding: 90px;
`;
export const CanvasWrapper = styled.div`
  width: 900px;
  height: 500px;
  position: relative;
  z-index: 0;
  background: white;
`;
