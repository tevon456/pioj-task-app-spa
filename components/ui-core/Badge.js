import { Box, Text } from ".";

import React from "react";

function Badge({
  color = "var(--neutral-200)",
  bg = "var(--neutral-400)",
  children,
  ...rest
}) {
  return (
    <Box
      bg={bg}
      pd="0px 8px"
      mg="0px"
      width="max-content"
      radius="4px"
      border={`1px solid ${color}`}
      style={{ display: "inline-block" }}
      {...rest}
    >
      <Text
        mt="0px"
        mb="0px"
        color={color}
        weight="300"
        className="margin-bottom--none margin-top--none"
      >
        {children}
      </Text>
    </Box>
  );
}

export default Badge;
