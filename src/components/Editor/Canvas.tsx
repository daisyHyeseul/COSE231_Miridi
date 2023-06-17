import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import Konva from "konva";
import { ShapesProps } from "../../types/Props";
import ShapeRectangle from "../common/ShapeComponents/ShapeRectangle";
import ShapeCircle from "../common/ShapeComponents/ShapeCircle";
import ShapeLine from "../common/ShapeComponents/ShapeLine";
import ShapeText from "../common/ShapeComponents/ShapeText";
import {
  selectedShapeRefState,
  selectedShapeState,
  shapesState,
} from "../../stores/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { Shape, ShapeConfig } from "konva/lib/Shape";
import ShapeEllipse from "../common/ShapeComponents/ShapeEllipse";
import { shapeActions } from "../../stores/ShapeSingleton";
import { ShiftKeyObserver } from "../../stores/observer";

const Canvas = () => {
  const layerRef = useRef<Konva.Layer>(null);
  const trRef = useRef<Konva.Transformer>(null);
  const [selectedRef, setSelectedRef] = useRecoilState<Shape<ShapeConfig>[]>(
    selectedShapeRefState
  );
  const [isShifted, setIsShifted] = useState<boolean>(false);
  const [selectedShape, setSelectedShape] = useRecoilState(selectedShapeState);
  const [shapes, setShapes] = useRecoilState<Array<ShapesProps>>(shapesState);

  let newShapes = useRecoilValue(shapesState);

  const { addObserver, removeObserver } = ShiftKeyObserver();
  const handleShiftKey = (value: boolean) => {
    setIsShifted(value);
  };
  useEffect(() => {
    addObserver({ update: handleShiftKey });

    return () => {
      removeObserver({ update: handleShiftKey });
    };
  }, [addObserver, removeObserver]);

  // const [shapes, setShapes] = useState<ShapesProps[]>();
  // useEffect(() => {
  //   setShapes(shapeActions.getShape());
  // }, [shapes]);

  const shapeComponents: any = {
    RECTANGLE: ShapeRectangle,
    CIRCLE: ShapeCircle,
    LINE: ShapeLine,
    TEXT: ShapeText,
    ELLIPSE: ShapeEllipse,
  };

  useEffect(() => {
    if (trRef.current) {
      trRef.current.nodes(selectedRef);
      trRef.current.getLayer()!.batchDraw();
    }
  }, [selectedRef, selectedShape, shapes]);

  const canvasWidth = 900;
  const canvasHeight = 500;

  const isSelectedRef = (ref: Shape<ShapeConfig>) => {
    return selectedRef.some((selectedRefItem) => selectedRefItem === ref);
  };

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
            {shapes!.map((thisshape: any, index) => {
              const ShapeComponent = shapeComponents[thisshape.shapetype];
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
                      const updatedShapes = newShapes.map(
                        (shp: any, index2) => {
                          if (index == index2) {
                            return {
                              ...shp,
                              shape: {
                                ...shp.shape,
                                attrs: newAttrs,
                              },
                            };
                          }
                          return shp;
                        }
                      );
                      newShapes = updatedShapes;
                      setShapes(newShapes);
                      shapeActions.updateShape(newShapes);
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
