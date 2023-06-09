import Konva from "konva";
import { useRef } from "react";
import { Layer, Rect, Stage } from "react-konva";
import { ZorderBtnProps } from "../../types/Props";
import { styled } from "styled-components";
import { selectedShapeRefState } from "../../atom";
import { useRecoilState } from "recoil";
import { Shape, ShapeConfig } from "konva/lib/Shape";

const ZorderBtn = ({ zorder }: ZorderBtnProps) => {
  const [selectedRef, setSelectedRef] = useRecoilState<Shape<ShapeConfig>[]>(
    selectedShapeRefState
  );

  const onClick = () => {
    if (zorder == "up") {
    }
  };
  return <CreateShapeButton onClick={onClick}>{zorder}</CreateShapeButton>;
};
export default ZorderBtn;

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
