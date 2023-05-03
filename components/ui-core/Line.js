import Box from "./Box";
import React from "react";

/**
 * Draw a horizontal or vertical line.
 * @prop {string} variant - h for horizontal and v for vertical.
 * @prop {string} thickness - Specified in css units.
 * @prop {string} length - Specified in css units.
 * @prop {string} color - color of the line.
 */
function Line({ variant, thickness, length, color, ...rest }) {
  return (
    <Box
      style={{ display: "inline-block" }}
      bt={`${variant === "h" ? thickness || "1px" : "none"} solid ${color}`}
      bl={`${variant === "v" ? thickness || "1px" : "none"} solid ${color}`}
      width={variant === "h" ? length : "1px"}
      height={variant === "v" ? length : "1px"}
      {...rest}
    />
  );
}

export default Line;
