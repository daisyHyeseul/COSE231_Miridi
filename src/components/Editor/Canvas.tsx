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
  Group,
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
  const [selectedRef, setSelectedRef] = useRecoilState<Shape<ShapeConfig>[]>(
    selectedShapeRefState
  );
  const [isShifted, setIsShifted] = useState<number>(0);
  // const [selectedRef, setSelectedRef] = useState<Shape<ShapeConfig>[]>(
  //   [] as Shape<ShapeConfig>[]
  // );
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
      trRef.current.getLayer()!.batchDraw();
      console.log("current ShapeRef", selectedRef);
      console.log("current selected shape", selectedShape);
      console.log("current  shape", shapes);
    }
  }, [selectedRef, selectedShape, shapes]);

  const canvasWidth = 900;
  const canvasHeight = 500;

  const isSelected = (shape: ShapesProps) => {
    for (const key of selectedShape) {
      if (key.shapeid === shape.shapeid) {
        return true;
      }
    }
    return false;
  };

  const isSelectedRef = (ref: Shape<ShapeConfig>) => {
    return selectedRef.some((selectedRefItem) => selectedRefItem === ref);
  };

  document.addEventListener("keydown", function (event) {
    // 키보드 이벤트 핸들러 함수
    if (event.key === "Shift") {
      // Enter 키가 눌리고 someCondition이 참일 때만 이벤트 처리
      // 원하는 작업 수행
      setIsShifted(1);
    }
  });

  document.addEventListener("keyup", function (event) {
    // 키보드 이벤트 핸들러 함수
    if (event.key === "Shift") {
      // Enter 키가 눌리고 someCondition이 참일 때만 이벤트 처리
      // 원하는 작업 수행
      setIsShifted(0);
    }
  });

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
            {shapes.map((thisshape: any) => {
              const ShapeComponent = shapeComponents[thisshape.shapetype];
              console.log("let's go", thisshape);
              if (ShapeComponent) {
                return (
                  <ShapeComponent
                    key={thisshape.shapeid}
                    shapeProps={thisshape.shape}
                    onSelect={(
                      e: React.MouseEvent,
                      ref: Shape<ShapeConfig>
                    ) => {
                      if (isShifted) {
                        setSelectedShape([...selectedShape, thisshape]);
                        setSelectedRef([...selectedRef, ref]);
                      } else if (!isSelectedRef(ref)) {
                        setSelectedShape([thisshape]);
                        setSelectedRef([ref]);
                      }
                      return;
                    }}
                    onChange={(
                      newAttrs: any,
                      ref: Shape<ShapeConfig>,
                      e: MouseEvent
                    ) => {
                      const updatedShapes = shapes.map((shp: any) => {
                        const tgt = e.target as ShapeConfig;
                        if (
                          tgt.attrs._id === shp.shape._id &&
                          isSelectedRef(ref)
                        ) {
                          return {
                            ...shp,
                            shape: {
                              ...shp.shape,
                              attrs: newAttrs,
                            },
                          };
                        }

                        return shp;
                      });
                      console.log("updatedShape", updatedShapes);
                      setShapes(updatedShapes);
                    }}
                  />
                );
              }
              return null;
            })}
            {selectedRef.length > 0 && (
              <Transformer
                ref={trRef}
                boundBoxFunc={(oldBox, newBox) => {
                  if (newBox.width < 5 || newBox.height < 5) {
                    return oldBox;
                  }
                  return newBox;
                }}
              />
            )}
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
