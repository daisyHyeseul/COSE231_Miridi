import React, { useRef, useEffect, useState } from "react";
import Canvas from "../components/Editor/Canvas";
import { CompilerOptionsValue } from "typescript";
import Konva from "konva";
import { ShapesProps } from "../types/Props";
import CreateShapeBtn from "../components/Buttons/CreateShapeBtn";
import uuid from "react-uuid";
import PropertiesSide from "../components/Editor/PropertiesSide";
import Header from "../components/Header";
import { styled } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { shapesState } from "../atom";

const EditorPage = () => {
  // const shapes = [{
  //   shapeid : uuid(),
  //   shapetype: "RECT",
  //   shape : new Konva.Rect({
  //     x: 50,
  //     y: 50,
  //     width: 100,
  //     height: 100,
  //     fill: 'red',
  //     draggable: true,
  //   }as Konva.RectConfig),
  // }];

  return (
    <div className="Editor">
      <Header />
      <EditerContainer>
        <PropertiesSide />
        <Canvas />
      </EditerContainer>
    </div>
  );
};

export default EditorPage;

export const EditerContainer = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background: whitesmoke;
`;
