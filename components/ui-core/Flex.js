import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  flex-wrap: ${(props) => props.wrap || "no-wrap"};
  align-items: ${(props) => props.align || "initial"};
  justify-content: ${(props) => props.justify || "flex-start"};
  box-shadow: ${(props) => (props.highlight ? "0px 0px 0px 2px red" : null)};
  gap: ${(props) => props.gap || "0"};
`;

export default Flex;
