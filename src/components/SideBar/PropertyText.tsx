import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { PropertyTextProps } from "../../types/Props";
import { selectedShapeState } from "../../stores/atom";
const PropertyText = ({ property, shapeType }: PropertyTextProps) => {
  const [selectedShape, setSelectedShape] = useRecoilState(selectedShapeState);

  return (
    <ShapePropertiesContainer>
      <div> x: {property.x}</div>
      <div>y: {property.y}</div>
      {shapeType == "RECTANGLE" ? (
        <div> Height : {property.height}</div>
      ) : (
        <></>
      )}{" "}
      {shapeType == "RECTANGLE" ? <div> Width : {property.width}</div> : <></>}{" "}
      {shapeType == "CIRCLE" ? <div> radius : {property.radius}</div> : <></>}
      {shapeType == "ELLIPSE" ? (
        <div> radiusX : {property.radiusX}</div>
      ) : (
        <></>
      )}{" "}
      {shapeType == "ELLIPSE" ? (
        <div> radiusY : {property.radiusY}</div>
      ) : (
        <></>
      )}
    </ShapePropertiesContainer>
  );
};

export default PropertyText;

export const ShapePropertiesContainer = styled.div`
  background: white;
  text-align: left;
  font-family: "SCDreamRegular";
  color: grey;
`;
