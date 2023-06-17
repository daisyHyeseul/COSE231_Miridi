import { styled } from "styled-components";
import { ColorChipProps } from "../../types/Props";

export const ColorChip = ({ color, onClick }: ColorChipProps) => {
  return (
    <ColorChipButton
      color={color}
      onClick={(e) => {
        onClick(e, color);
      }}
    ></ColorChipButton>
  );
};

export const ColorChipButton = styled.button<{ color?: string }>`
  height: 32px;
  width: 32px;
  border-radius: 4px;
  border: solid 1px gray;
  box-sizing: border-box;
  background-color: ${(props) => props.color || "grey"};
  color: black;
  cursor: pointer;
`;
