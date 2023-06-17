import { styled } from "styled-components";
import palette from "../../styles/colorPalette";
import { ColorPopupProps } from "../../types/Props";
import { ColorChip } from "./ColorChip";

const ColorControlPopup = ({ onClick, onChangeColor }: ColorPopupProps) => {
  const colors = [
    palette.red,
    palette.yellow,
    palette.green,
    palette.blue,
    palette.purple,
    palette.white,
    palette.black,
  ];

  return (
    <ColorControlPopupWrapper
      onClick={(e) => {
        onClick(e, false);
      }}
    >
      {colors.map((color) => {
        return <ColorChip color={color} onClick={onChangeColor}></ColorChip>;
      })}
    </ColorControlPopupWrapper>
  );
};
export default ColorControlPopup;

export const ColorControlPopupWrapper = styled.div`
  position: absolute;
  width: 304px;
  display: flex;
  justify-content: space-between;
  margin: 0;
  border-radius: 8px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: var(--background_color);
  box-sizing: border-box;
  cursor: default;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  z-index: 9999994;
  outline: none;
`;
