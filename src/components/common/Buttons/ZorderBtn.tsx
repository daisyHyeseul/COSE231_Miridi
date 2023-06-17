import Konva from "konva";
import { useRef } from "react";
import { Layer, Rect, Stage } from "react-konva";
import { ShapesProps, ZorderBtnProps } from "../../../types/Props";
import { styled } from "styled-components";
import { selectedShapeState, shapesState } from "../../../stores/atom";
import { useRecoilState } from "recoil";

const ZorderBtn = ({ onClick, zorder }: ZorderBtnProps) => {
  return (
    <CreateShapeButton onClick={onClick}>
      {zorder == "up" ? "앞으로" : "뒤로"}
    </CreateShapeButton>
  );
};
export default ZorderBtn;

export const CreateShapeButton = styled.button`
  display: block;
  width: 48%;
  height: 40px;
  margin-top: 14px;
  border-radius: 4px;
  background: #f0f0f0;
  border: solid 0px gray;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: #787878;
  cursor: pointer;
  font-family: "SCDreamRegular";
`;
