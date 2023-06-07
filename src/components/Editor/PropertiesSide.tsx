import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CreateShapeBtn from "../Buttons/CreateShapeBtn";
import { useRecoilState } from "recoil";
import { PropertiesProps, ShapesProps } from "../../types/Props";
import Konva from "konva";
import uuid from "react-uuid";
import { selectedShapeState, shapesState } from "../../atom";
import DeleteShapeBtn from "../Buttons/DeleteShapeBtn";
import { ShapeConfig } from "konva/lib/Shape";

const PropertiesSide = () => {
  const [shapes, setShapes] = useRecoilState<Array<ShapesProps>>(shapesState);
  const [selectedShape, setSelectedShape] = useRecoilState(selectedShapeState);
  const [opacityValue, setopacityValue] = useState<number>();
  const [propertiesValue, setPropertiesValue] = useState<ShapeConfig>({});

  useEffect(() => {
    if (selectedShape.length > 0 && selectedShape[0].shape != null) {
      setPropertiesValue(selectedShape[0].shape.attrs);
    }
    console.log("properties", propertiesValue);
    if (
      shapes.length > 0 &&
      selectedShape.length > 0 &&
      selectedShape[0] != null
    ) {
      console.log("[b]current selected shape", selectedShape[0].shape.attrs);
      console.log("[b]current  shape", shapes[0].shape.attrs);
    }
  }, [shapes, selectedShape]);

  const onClick = (e: React.MouseEvent) => {
    const rectangle = new Konva.Rect({
      x: 400,
      y: 200,
      width: 100,
      height: 100,
      opacity: 1,
      fill: "lightgrey",
    } as Konva.RectConfig);
    const newRect = {
      shapeid: uuid(),
      shapetype: "RECTANGLE",
      shape: rectangle,
    };
    setShapes([...shapes, newRect]);
    setSelectedShape([newRect]);
  };

  const onClickCirc = (e: React.MouseEvent) => {
    const circle = new Konva.Circle({
      x: 400,
      y: 200,
      radius: 50,
      opacity: 1,
      fill: "lightgrey",
    } as Konva.CircleConfig);
    const newCirc = {
      shapeid: uuid(),
      shapetype: "CIRCLE",
      shape: circle,
    };

    setShapes([...shapes, newCirc]);
    setSelectedShape([newCirc]);
  };

  const onClickLine = (e: React.MouseEvent) => {
    const line = new Konva.Line({
      points: [73, 70, 340, 23],
      stroke: "red",
      tension: 1,
      opacity: 1,
    } as Konva.LineConfig);
    const newLine = {
      shapeid: uuid(),
      shapetype: "LINE",
      shape: line,
    };
    setShapes([...shapes, newLine]);

    setSelectedShape([newLine]);
  };

  const onClickText = (e: React.MouseEvent) => {
    const text = new Konva.Text({
      x: 100,
      y: 15,
      text: "Simple Text",
      fontSize: 30,
      fontFamily: "Calibri",
      fill: "green",
      opacity: 1,
    } as Konva.LineConfig);
    const newText = {
      shapeid: uuid(),
      shapetype: "TEXT",
      shape: text,
    };
    setShapes([...shapes, newText]);
    setSelectedShape([newText]);
  };

  const changeOpacity = (e: any) => {
    setopacityValue(e.target.value);
    const updatedShapes = shapes.map((shape: any) => {
      if (shape === selectedShape[0]) {
        return {
          ...shape,
          shape: {
            ...shape.shape,
            opacity: e.target.value / 100,
          },
        };
      }
      return shape;
    });
    setShapes(updatedShapes);
  };

  const onDelete = (e: React.MouseEvent) => {
    setShapes(shapes.filter((shape) => shape != selectedShape[0]));
    setSelectedShape([]);
  };

  // document.addEventListener("keydown", function (event) {
  //   if (
  //     event.key === "Delete" &&
  //     selectedShape != null &&
  //     selectedShape.shape != null
  //   ) {
  //     // 삭제 키를 눌렀을 때 실행할 동작을 여기에 작성합니다.
  //     console.log(selectedShape);
  //     setShapes(shapes.filter((shape) => shape != selectedShape));
  //     setSelectedShape(null);
  //     console.log("Delete 키가 눌렸습니다.");
  //   }
  // });

  return (
    <PropertiesSideContainer>
      <CreateBtnContainer>
        <CreateShapeBtn onClick={onClick} shapetype="Rectangle" />
        <CreateShapeBtn onClick={onClickCirc} shapetype="Circle" />
        <CreateShapeBtn onClick={onClickLine} shapetype="Line" />
        <CreateShapeBtn onClick={onClickText} shapetype="Text" />
      </CreateBtnContainer>

      {selectedShape.length > 0 && selectedShape[0].shape != null ? (
        <ShapePropertiesContainer>
          <DeleteShapeBtn onDelete={onDelete} />
          <ColorWrapper>
            <label>Color : </label>
            <ColorChip color={propertiesValue.fill} /> :
            <div />
          </ColorWrapper>
          <div>
            <div> x: {propertiesValue.x}</div>
            <div>y: {propertiesValue.y}</div>
            Height :{" "}
            {selectedShape[0].shapetype == "RECTANGLE"
              ? propertiesValue.height
              : null}
          </div>
          <div>
            {" "}
            Width :{" "}
            {selectedShape[0].shapetype == "RECTANGLE"
              ? propertiesValue.width
              : null}
          </div>
          <div>
            {" "}
            radius :{" "}
            {selectedShape[0].shapetype == "CIRCLE"
              ? propertiesValue.radius
              : null}
          </div>
          <div> opacity : {opacityValue}</div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={opacityValue || ""}
            onChange={changeOpacity}
          />
        </ShapePropertiesContainer>
      ) : (
        <div />
      )}
    </PropertiesSideContainer>
  );
};

export default PropertiesSide;
export const PropertiesSideContainer = styled.div`
  overflow: visible;
  position: relative;
  width: 300px;
  background: white;
  padding: 15px;
  border-right: 1px solid lightgray;
  text-align: center;
  transition: width 0.3s;
`;
export const CreateBtnContainer = styled.div`
  overflow: visible;
  position: relative;
  display: flex;
  background: white;
  text-align: center;
  transition: width 0.3s;
`;
export const ColorWrapper = styled.div`
  display: flex;
`;

export const ShapePropertiesContainer = styled.div`
  overflow: visible;
  position: relative;
  background: white;
  padding: 15px;
  text-align: left;
  transition: width 0.3s;
  padding: 5px 24px;
`;

export const ColorChip = styled.div`
  background-color: ${(props) => props.color || "grey"};
  height: 20px;
  width: 20px;
  border-radius: 5px;
`;
