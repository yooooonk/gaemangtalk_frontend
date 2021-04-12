import React from 'react';

import styled from 'styled-components';

// elements
import Message from '../elements/Message';


// 스크롤 css
import '../styles/scroll.css';

// 메시지 리스트 컴포넌트
const MessageList = (props) => {
  return (
    <Container className="scroll">
      <Message is_me={true} />

    </Container>

  )
}

const Container = styled.div`
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_column};
  width: 100%;
  height: 90%;
  padding: 0px 60px;
  overflow: auto;
`;

export default MessageList;