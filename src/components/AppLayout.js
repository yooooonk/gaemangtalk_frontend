import React from 'react';
import styled from 'styled-components';
import Header from './Header';
function AppLayout(props) {
  console.log(props);
  return (
    <Container>
      <Header />
      <Main>{props.children}</Main>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  min-width: 481px;
  ${(props) => props.theme.flex_column};

  @media ${(props) => props.theme.desktop} {
    flex-direction: row;
  }
`;
const Main = styled.div`
  width: 100%;
  height: 100%;
  ${(props) => props.theme.flex_row};
  justify-content: center;
  align-items: center;
`;

export default AppLayout;
