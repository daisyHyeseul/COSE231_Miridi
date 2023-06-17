import styled from "styled-components";
import CreateShapeContainer from "../SideBar/CreateShapeContainer";
import PropertiesContainer from "../SideBar/PropertiesContainer";

const Side = () => {
  return (
    <PropertiesSideContainer>
      <CreateShapeContainer />
      <PropertiesContainer />
    </PropertiesSideContainer>
  );
};

export default Side;
export const PropertiesSideContainer = styled.div`
  overflow: visible;
  position: relative;
  width: 300px;
  background: white;
  padding: 20px;
  border-right: 1px solid lightgray;
  text-align: center;
  transition: width 0.3s;
`;
