import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


const Header = () => {
    return (
      <HeaderContainer>
        <HeaderWrapper>
            <HeaderTitle>
               Vector Graphic Editor
            </HeaderTitle>
        </HeaderWrapper>
      </HeaderContainer>
    );
  };
  
  export default Header;


export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
  padding : 10px;
  background-color: white;
  border-bottom: 2px solid lightgray;
  position: fixed;
  z-index: 5;
`;

export const HeaderTitle = styled.div`
  font-size: 28px;
  color: #919191;
  font-family: 'SCDreamBold';
  :hover {
    color: #1d1d1d;
    transition: 1s;
  }
  text-decoration: none;
  cursor: pointer;
`;