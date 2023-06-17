import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { PropertyOpacityProps, ShapesProps } from "../../types/Props";
import {
  selectedShapeRefState,
  selectedShapeState,
  shapesState,
} from "../../stores/atom";
import { Shape, ShapeConfig } from "konva/lib/Shape";
import ColorControlPopup from "../common/ColorControlPopup";
const PropertyOpacity = ({
  onChangeOpacity,
  opacity,
}: PropertyOpacityProps) => {
  return (
    <ShapePropertiesContainer>
      <div> opacity : {opacity * 100}</div>
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={opacity * 100 || ""}
        onChange={(e: any) => {
          onChangeOpacity(e);
        }}
      />
    </ShapePropertiesContainer>
  );
};

export default PropertyOpacity;

export const ShapePropertiesContainer = styled.div`
  background: white;
  text-align: left;
  font-family: "SCDreamRegular";
  color: grey;
`;
