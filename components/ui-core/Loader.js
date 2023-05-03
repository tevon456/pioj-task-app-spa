import styled, { keyframes } from "styled-components";

import Flex from "./Flex";
import Text from "./Text";

const Frames = keyframes`
  0% { left:0px; top:0px;}
  25% { left:70px; top:0px;}
  50% { left:70px; top:0px;}
  75% { left:0px; top:0px;}
`;

const Outer = styled.div`
  width: 100px;
  height: 8px;
  padding: 2px;
  margin-top: 4px;
  border: 2px solid var(--neutral-100);
  border-radius: 12px;
`;

const Inner = styled.div`
  width: 30px;
  height: 8px;
  border-radius: 12px;
  background-color: var(--neutral-100);
  position: relative;
  animation-name: ${Frames};
  animation-timing-function: cubic-bezier(0.98, -0.2, 0.65, 0.69);
  animation-duration: 2s;
  animation-iteration-count: infinite;
`;

export default function Loader() {
  return (
    <Flex justify="center" align="center" direction="column">
      <Text
        weight="bold"
        size="sm"
        mb="var(--space-xxs)"
        color="var(--text-light)"
      >
        Loading
      </Text>
      <Outer>
        <Inner />
      </Outer>
    </Flex>
  );
}
