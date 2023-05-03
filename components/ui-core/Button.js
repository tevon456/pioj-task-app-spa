import styled from "styled-components";

const SButton = styled.button`
  font-size: ${(props) => props.font};
  display: ${(props) => props.display || "flex"};
  align-items: center;
  ${(props) =>
    props.fullWidth
      ? "display: flex;" +
        "margin-right: 0px !important;" +
        "width: 100%;" +
        "justify-content: center;"
      : null}
  padding: ${(props) => props.padding};
  font-weight: 400;
  font-family: var(--font-primary);
  text-align: center;
  border-radius: 6px;
  border: 2px solid ${(props) => props.bg || props.sbackground};
  color: ${(props) =>
    props.variant === "normal" || props.variant === undefined
      ? props.color || props.scolor
      : props.color || "var(--text-dark)"};
  background: ${(props) =>
    props.variant === "normal" || props.variant === undefined
      ? props.bg || props.sbackground || "var(--primary)"
      : "transparent"};
  transition-timing-function: ease;
  transition-duration: 0.3s;

  &:hover {
    background: ${(props) =>
      props.variant === "normal" || props.variant === undefined
        ? props.hover || props.bg || props.shover || "var(--primary)"
        : "transparent"};
    box-shadow: 0px 3px 3px rgba(46, 41, 51, 0.08),
      0px 2px 4px rgba(71, 63, 79, 0.08);
    border: 2px solid ${(props) => props.hover || props.bg || props.shover};
    color: ${(props) =>
      props.variant === "normal" || props.variant === undefined
        ? props.hoverColor || props.color || props.scolor
        : props.hoverColor || props.color || "var(--text-dark)"};
  }

  &:disabled {
    color: var(--text-light);
    cursor: not-allowed;
    box-shadow: none;
    opacity: 0.5;
    filter: grayscale(100%);
  }

  &:active {
    transform: translateY(1px);
  }
`;

/**
 * A base component used for composing more complex components like cards and alerts etc
 * @prop {string} size - sizes [xs,sm,md,lg]
 * @prop {string} color - text color.
 * @prop {string} bg - button background-color.
 * @prop {string} hover - button hover background color override.
 * @prop {number} kind- [primary,secondary,success,danger].
 * @prop {string} variant- outline, defaults to normal.
 * @prop {string} fullWidth- take max space in width.
 */
export default function Button(props) {
  let padding, font, sbackground, scolor, shover;
  switch (props.kind) {
    case "primary":
      sbackground = "var(--primary)";
      shover = "var(--primary-hovered)";
      scolor = "#fff";
      break;
    case "secondary":
      sbackground = "var(--neutral-700)";
      shover = "var(--neutral-500)";
      scolor = "#fff";
      break;
    case "success":
      sbackground = "var(--success)";
      shover = "var(--success-hovered)";
      scolor = "#fff";
      break;
    case "danger":
      sbackground = "var(--danger)";
      shover = "var(--danger-hovered)";
      scolor = "#fff";
      break;
    default:
      sbackground = "var(--primary)";
      shover = "var(--primary-hovered)";
      scolor = "#fff";
      break;
  }
  switch (props.size) {
    case "xs":
      padding = "0.2rem var(--space-xxs)";
      font = "var(--btn-xs)";
      break;
    case "sm":
      padding = "var(--space-xxxs) var(--space-xxs)";
      font = "var(--btn-sm)";
      break;
    case "md":
      padding = "var(--space-xxs) var(--space-sm)";
      font = "var(--btn-md)";
      break;
    case "lg":
      padding = "var(--space-sm) var(--space-md)";
      font = "var(--btn-lg)";
      break;
    default:
      padding = "var(--space-xxxs) var(--space-xxs)";
      font = "var(--btn-sm)";
      break;
  }

  let attributes = { font, padding, sbackground, shover, scolor };

  return <SButton {...attributes} {...props}></SButton>;
}
