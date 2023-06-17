import Konva from "konva";
import { useRef } from "react";
import { Layer, Rect, Stage } from "react-konva";
import { CreateShapeBtnProps } from "../../../types/Props";
import { styled } from "styled-components";

const CreateShapeBtn = ({ shapetype, onClick }: CreateShapeBtnProps) => {
  return <CreateShapeButton onClick={onClick}>{shapetype}</CreateShapeButton>;
};
export default CreateShapeBtn;

export const CreateShapeButton = styled.button`
  font-size: 14px;
  height: 32px;
  padding: 0 15px;
  margin: 0 6px 6px 0;
  border-radius: 15px;
  border: solid 0px gray;
  box-sizing: border-box;
  background: #f0f0f0;
  color: #787878;
  cursor: pointer;
  font-family: "SCDreamRegular";
`;
