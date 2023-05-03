import styled from "styled-components";

/**
 * A base component used for composing more complex components like cards and alerts etc
 * @prop {string} size - text sizes [xs,sm,rg-default,md,lg,xl,xxl,xxxl]
 * @prop {string} color - text color.
 * @prop {string} align - text alignment, defaults to left.
 * @prop {number} weight- font-weight, defaults to 500.
 * @prop {string} variantNumeric- font-variant-numeric, defaults to normal.
 * @prop {string} font -  font-family.
 */
const Text = styled.p`
  font-size: ${(props) => {
    switch (props.size) {
      case "xs":
        return "var(--text-xs)";
      case "sm":
        return "var(--text-sm)";
      case "rg":
        return "var(--text-rg)";
      case "md":
        return "var(--text-md)";
      case "lg":
        return "var(--text-lg)";
      case "xl":
        return "var(--text-xl)";
      case "xxl":
        return "var(--text-xxl)";
      case "xxxl":
        return "var(--text-xxxl)";
      default:
        return "var(--text-rg)";
    }
  }};
  font-weight: ${(props) => props.weight || 400};
  font-family: ${(props) => props.font || "var(--font-primary)"};
  text-align: ${(props) => props.align || "left"};
  font-variant-numeric: ${(props) => props.variantNumeric || "normal"};
  ${(props) => (props.mt ? `margin-top: ${props.mt}` : null)};
  ${(props) => (props.mb ? `margin-bottom: ${props.mb}` : null)};
  color: ${(props) => props.color || "var(--text-dark)"};
`;
export default Text;
