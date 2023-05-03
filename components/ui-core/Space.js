import React from "react";
let space = "\u00A0";
const Space = ({ amount }) => (
  <span>{space.repeat(amount === undefined ? 1 : amount)}</span>
);
export default Space;
