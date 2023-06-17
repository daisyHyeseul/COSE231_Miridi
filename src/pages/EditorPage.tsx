import Canvas from "../components/Editor/Canvas";
import Side from "../components/Editor/Side";
import Header from "../components/Header";
import { styled } from "styled-components";

const EditorPage = () => {
  return (
    <div className="Editor">
      <Header />
      <EditerContainer>
        <Side />
        <Canvas />
      </EditerContainer>
    </div>
  );
};

export default EditorPage;

export const EditerContainer = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background: whitesmoke;
`;
