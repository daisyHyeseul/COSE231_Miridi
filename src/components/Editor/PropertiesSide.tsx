import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CreateShapeBtn from "../Buttons/CreateShapeBtn";
import { useRecoilState } from "recoil";
import { PropertiesProps, ShapesProps } from "../../types/Props";
import Konva from "konva";
import uuid from "react-uuid";
import {
  selectedShapeRefState,
  selectedShapeState,
  shapesState,
} from "../../atom";
import DeleteShapeBtn from "../Buttons/DeleteShapeBtn";
import { Shape, ShapeConfig } from "konva/lib/Shape";
import ZorderBtn from "../Buttons/ZorderBtn";

const PropertiesSide = () => {
  const [shapes, setShapes] = useRecoilState<Array<ShapesProps>>(shapesState);
  const [selectedShape, setSelectedShape] = useRecoilState(selectedShapeState);
  const [propertiesValue, setPropertiesValue] = useState<ShapeConfig>({});
  const [selectedRef, setSelectedRef] = useRecoilState<Shape<ShapeConfig>[]>(
    selectedShapeRefState
  );

  useEffect(() => {
    if (selectedShape.length == 1) {
      for (const thisshape of shapes) {
        if (thisshape.shapeid === selectedShape[0].shapeid) {
          setPropertiesValue(thisshape.shape.attrs);
        }
      }
    }
  }, [shapes, selectedShape]);

  const onClick = (e: React.MouseEvent) => {
    const rectangle = new Konva.Rect({
      x: 400,
      y: 200,
      width: 100,
      height: 100,
      opacity: 1,
      fill: Konva.Util.getRandomColor(),
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
      fill: Konva.Util.getRandomColor(),
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
      stroke: Konva.Util.getRandomColor(),
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
      fill: Konva.Util.getRandomColor(),
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

  const onDelete = (e: React.MouseEvent) => {
    setShapes(shapes.filter((shape) => shape != selectedShape[0]));
    setSelectedShape([]);
    setSelectedRef([]);
  };

  // document.addEventListener("keyup", function (event) {
  //   if (
  //     event.key === "Delete" &&
  //     selectedShape.length > 0 &&
  //     selectedShape[0].shape != null
  //   ) {
  //     // 삭제 키를 눌렀을 때 실행할 동작을 여기에 작성합니다.
  //     setShapes(shapes.filter((shape) => shape != selectedShape[0]));
  //     setSelectedShape([]);
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
          <ZorderBtn zorder="up" />

          <ZorderBtn zorder="down" />
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
          <div> opacity : {propertiesValue.opacity! * 100}</div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={propertiesValue.opacity! * 100 || ""}
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
