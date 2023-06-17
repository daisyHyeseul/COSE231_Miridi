import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { ShapesProps } from "../../types/Props";
import {
  selectedShapeRefState,
  selectedShapeState,
  shapesState,
} from "../../stores/atom";
import DeleteShapeBtn from "../common/Buttons/DeleteShapeBtn";
import { Shape, ShapeConfig } from "konva/lib/Shape";

import PropertyColor from "./PropertyColor";
import ZorderBtn from "../common/Buttons/ZorderBtn";
import PropertyOpacity from "./PropertyOpacity";
import PropertyText from "./PropertyText";

const PropertiesContainer = () => {
  const [shapes, setShapes] = useRecoilState<Array<ShapesProps>>(shapesState);
  const [selectedShape, setSelectedShape] = useRecoilState(selectedShapeState);
  const [propertiesValue, setPropertiesValue] = useState<ShapeConfig>({});
  const [selectedRef, setSelectedRef] = useRecoilState<Shape<ShapeConfig>[]>(
    selectedShapeRefState
  );
  const [colorPopupIsOpen, setColorPopupIsOpen] = useState(false);

  useEffect(() => {
    if (selectedShape.length == 1) {
      for (const thisshape of shapes) {
        if (thisshape.shapeid === selectedShape[0].shapeid) {
          setPropertiesValue(thisshape.shape.attrs);
        }
      }
    }
  }, [shapes, selectedShape]);

  const isSelected = (shp: ShapesProps) => {
    return selectedShape.some(
      (selectedItem) => selectedItem.shapeid === shp.shapeid
    );
  };

  const onDelete = (e: React.MouseEvent) => {
    setShapes(shapes.filter((shape) => !isSelected(shape)));
    setSelectedShape([]);
    setSelectedRef([]);
  };

  const changeColor = (e: React.MouseEvent, newColor: string) => {
    setPropertiesValue({ ...propertiesValue, fill: newColor });
    const updatedShapes = shapes.map((shape: any) => {
      if (shape.shapeid === selectedShape[0].shapeid) {
        const updateShape = {
          ...shape,
          shape: {
            ...shape,
            attrs: { ...shape.shape.attrs, fill: newColor },
          },
        };
        setSelectedShape([updateShape]);
        return updateShape;
      }
      return shape;
    });
    setShapes(updatedShapes);
  };

  const changeZorederUp = () => {
    if (selectedShape.length == 1 && selectedShape[0]) {
      const deletedShapes = shapes.filter(
        (shp) => shp.shapeid != selectedShape[0].shapeid
      );
      const item = shapes.find((i) => i.shapeid === selectedShape[0].shapeid);
      if (item) {
        const newShapes = [...deletedShapes, item];

        setShapes(newShapes);
      }
    }
  };

  const changeZorederDown = () => {
    if (selectedShape.length == 1 && selectedShape[0]) {
      const deletedShapes = shapes.filter(
        (shp) => shp.shapeid != selectedShape[0].shapeid
      );
      const item = shapes.find((i) => i.shapeid === selectedShape[0].shapeid);
      if (item) {
        const newShapes = [item, ...deletedShapes];

        setShapes(newShapes);
      }
    }
  };

  const changeOpacity = (e: any) => {
    setPropertiesValue({ ...propertiesValue, opacity: e.target.value });
    const updatedShapes = shapes.map((shape: any) => {
      if (shape.shapeid === selectedShape[0].shapeid) {
        const updateShape = {
          ...shape,
          shape: {
            ...shape,
            attrs: { ...shape.shape.attrs, opacity: e.target.value / 100 },
          },
        };
        setSelectedShape([updateShape]);
        return updateShape;
      }
      return shape;
    });
    setShapes(updatedShapes);
  };

  // const changeStrokeColor = (e: React.MouseEvent, newColor: string) => {
  //   setPropertiesValue({ ...propertiesValue, stroke: newColor });
  //   const updatedShapes = shapes.map((shape: any) => {
  //     if (shape.shapeid === selectedShape[0].shapeid) {
  //       const updateShape = {
  //         ...shape,
  //         shape: {
  //           ...shape,
  //           attrs: { ...shape.shape.attrs, stroke: newColor },
  //         },
  //       };
  //       setSelectedShape([updateShape]);
  //       return updateShape;
  //     }
  //     return shape;
  //   });
  //   setShapes(updatedShapes);
  // };

  const onClickColorPopup = (e: React.MouseEvent, ispopup: boolean) => {
    setColorPopupIsOpen(ispopup);
  };

  return (
    <PropertiesSideContainer>
      {selectedShape.length == 1 && selectedShape[0].shape != null ? (
        <ShapePropertiesContainer>
          <PropertiesHeader>도형 속성</PropertiesHeader>
          {propertiesValue.fill ? (
            <PropertyColor
              onClick={onClickColorPopup}
              popupIsOpen={colorPopupIsOpen}
              onChangeColor={changeColor}
              Color={propertiesValue.fill}
            />
          ) : (
            <></>
          )}

          {/* {propertiesValue.stroke ? (
            <PropertyColor
              onClick={onClickColorPopup}
              popupIsOpen={colorPopupIsOpen}
              onChangeColor={changeStrokeColor}
              Color={propertiesValue.strock}
            />
          ) : (
            <></>
          )} */}
          <PropertyText
            property={propertiesValue}
            shapeType={selectedShape[0].shapetype}
          />
          {propertiesValue.opacity ? (
            <PropertyOpacity
              onChangeOpacity={changeOpacity}
              opacity={propertiesValue.opacity}
            />
          ) : (
            <></>
          )}
          <FlexBtnContainer>
            <ZorderBtn onClick={changeZorederUp} zorder="up" />
            <ZorderBtn onClick={changeZorederDown} zorder="down" />
          </FlexBtnContainer>
          <DeleteShapeBtn onDelete={onDelete} />
        </ShapePropertiesContainer>
      ) : (
        <div />
      )}
    </PropertiesSideContainer>
  );
};

export default PropertiesContainer;
export const PropertiesSideContainer = styled.div`
  overflow: visible;
  position: relative;
  text-align: center;
  border-bottom: ;
`;
export const FlexBtnContainer = styled.div`
  overflow: visible;
  position: relative;
  display: flex;
  justify-content: space-between;
  background: white;
  text-align: center;
  transition: width 0.3s;
`;

export const ShapePropertiesContainer = styled.div`
  background: white;
  text-align: left;
  font-family: "SCDreamRegular";
  color: grey;
`;

export const PropertiesHeader = styled.div`
  height: 36px;
  width: 300px;
  text-align: left;
  font-size: 18px;
  color: grey;
  margin: 17px 0px 0px 0;
  padding: 20px 0px 10px 0px;
  border-top: 1px solid #f0f0f0;
  font-weight: bold;
  font-family: "SCDreamBold";
`;
