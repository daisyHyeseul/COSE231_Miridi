import styled from "styled-components";
import { PropertyColorProps } from "../../types/Props";

import ColorControlPopup from "../common/ColorControlPopup";
const PropertyColor = ({
  onClick,
  popupIsOpen,
  onChangeColor,
  Color,
}: PropertyColorProps) => {
  return (
    <ColorWrapper>
      <label>Color : </label>
      <ColorChip
        color={Color}
        onClick={(e) => {
          onClick(e, true);
        }}
      />
      :
      <div />
      {popupIsOpen ? (
        <ColorControlPopup onClick={onClick} onChangeColor={onChangeColor} />
      ) : (
        <></>
      )}
    </ColorWrapper>
  );
};

export default PropertyColor;
export const ColorWrapper = styled.div`
  display: flex;
`;

export const ShapePropertiesContainer = styled.div`
  background: white;
  text-align: left;
  font-family: "SCDreamRegular";
  color: grey;
`;

export const ColorChip = styled.div`
  background-color: ${(props) => props.color || "grey"};
  height: 20px;
  width: 20px;
  border-radius: 5px;
`;
