import Konva from "konva";
import { useRef } from "react";
import { Layer, Rect, Stage } from "react-konva";
import { CreateShapeBtnProps } from "../../types/Props";
import { styled } from "styled-components";

const CreateShapeBtn = ({ shapetype, onClick }: CreateShapeBtnProps) => {
  return <CreateShapeButton onClick={onClick}>{shapetype}</CreateShapeButton>;
};
export default CreateShapeBtn;

export const CreateShapeButton = styled.button`
  font-family: var(--font_family_default);
  font-size: 14px;
  height: 32px;
  padding: 0 10px;
  margin: 0 6px 6px 0;
  border-radius: 4px;
  border: solid 1px gray;
  box-sizing: border-box;
  background-color: lightgray;
  color: black;
  cursor: pointer;
`;
