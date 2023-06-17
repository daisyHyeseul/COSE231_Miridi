import Konva from "konva";
import { useRef } from "react";
import { Layer, Rect, Stage } from "react-konva";
import { CreateShapeBtnProps, DeleteShapeBtnProps } from "../../../types/Props";
import { styled } from "styled-components";

const DeleteShapeBtn = ({ onDelete }: DeleteShapeBtnProps) => {
  return <DeleteShapeButton onClick={onDelete}>삭제</DeleteShapeButton>;
};
export default DeleteShapeBtn;

export const DeleteShapeButton = styled.button`
  display: block;
  width: 100%;
  height: 40px;
  margin-top: 14px;
  border-radius: 4px;
  background: #22cc88;
  border: solid 0px gray;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  font-family: "SCDreamRegular";
`;
