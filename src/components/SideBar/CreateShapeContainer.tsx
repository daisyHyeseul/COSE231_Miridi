import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CreateShapeBtn from "../common/Buttons/CreateShapeBtn";
import { useRecoilState } from "recoil";
import Konva from "konva";
import uuid from "react-uuid";
import {
  selectedShapeRefState,
  selectedShapeState,
  shapesState,
} from "../../stores/atom";
import { Shape, ShapeConfig } from "konva/lib/Shape";
import { shapeActions } from "../../stores/ShapeSingleton";
import { ShapesProps } from "../../types/Props";

const CreateShapeContainer = () => {
  const [shapes, setShapes] = useRecoilState<Array<ShapesProps>>(shapesState);
  const [selectedShape, setSelectedShape] = useRecoilState(selectedShapeState);
  const [selectedRef, setSelectedRef] = useRecoilState<Shape<ShapeConfig>[]>(
    selectedShapeRefState
  );

  const onClickRect = (e: React.MouseEvent) => {
    const rectangle = new Konva.Rect({
      x: 400,
      y: 200,
      width: 100,
      height: 100,
      opacity: 1,
      stroke: "Grey",
      fill: Konva.Util.getRandomColor(),
    } as Konva.RectConfig);
    const newRect = {
      shapeid: uuid(),
      shapetype: "RECTANGLE",
      shape: rectangle,
    };
    shapeActions.updateShape([...shapes, newRect]);
    setShapes([...shapes, newRect]);
    setSelectedShape([]);
    setSelectedRef([]);
  };
  const onClickEllp = (e: React.MouseEvent) => {
    const Ellipse = new Konva.Ellipse({
      x: 300,
      y: 200,
      radiusX: 100,
      radiusY: 150,
      opacity: 1,
      stroke: "Grey",
      fill: Konva.Util.getRandomColor(),
    } as Konva.EllipseConfig);
    const newEllp = {
      shapeid: uuid(),
      shapetype: "ELLIPSE",
      shape: Ellipse,
    };
    setShapes([...shapes, newEllp]);
    shapeActions.updateShape([...shapes, newEllp]);
    setSelectedShape([]);
    setSelectedRef([]);
  };
  const onClickCirc = (e: React.MouseEvent) => {
    const circle = new Konva.Circle({
      x: 400,
      y: 200,
      radius: 50,
      opacity: 1,
      stroke: "Grey",
      fill: Konva.Util.getRandomColor(),
    } as Konva.CircleConfig);
    const newCirc = {
      shapeid: uuid(),
      shapetype: "CIRCLE",
      shape: circle,
    };

    setShapes([...shapes, newCirc]);
    shapeActions.updateShape([...shapes, newCirc]);
    setSelectedShape([]);
    setSelectedRef([]);
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
    setSelectedShape([]);
    setSelectedRef([]);
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
    setSelectedShape([]);
    setSelectedRef([]);
  };

  return (
    <CreateBtnContainer>
      <CreateShapeHeader>도형 생성</CreateShapeHeader>
      <CreateShapeBtn onClick={onClickRect} shapetype="Rectangle" />
      <CreateShapeBtn onClick={onClickCirc} shapetype="Circle" />
      <CreateShapeBtn onClick={onClickEllp} shapetype="Ellipse" />
      <CreateShapeBtn onClick={onClickLine} shapetype="Line" />
      <CreateShapeBtn onClick={onClickText} shapetype="Text" />
    </CreateBtnContainer>
  );
};

export default CreateShapeContainer;

export const CreateBtnContainer = styled.div`
  overflow: visible;
  width: 300px;
  position: relative;
  display: flex;
  justify-content: start;
  background: white;
  text-align: center;
  flex-wrap: wrap;
`;

export const CreateShapeHeader = styled.div`
  height: 36px;
  width: 300px;
  text-align: left;
  font-size: 18px;
  color: grey;
  margin: 5px 0px 0px 0;
  font-weight: bold;
  font-family: "SCDreamBold";
`;
