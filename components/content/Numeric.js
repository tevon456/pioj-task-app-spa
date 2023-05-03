import { UICore } from "..";

export default function Numeric({
  value,
  color,
  stylizedDecimal = true,
  options = { style: "currency", currency: "USD" },
  style,
  ...rest
}) {
  let formatter = new Intl.NumberFormat("en-US", {
    style: options?.style,
    ...options,
  });

  return (
    <UICore.Text
      mt="2px"
      mb="2px"
      color={color || "var(--neutral-500)"}
      className="truncate"
      style={{
        maxWidth: "160px",
        fontVariantNumeric: "tabular-nums",
        ...style,
      }}
      {...rest}
    >
      {stylizedDecimal ? (
        <>
          {formatter.format(value).split(".")[0]}
          <small
            style={{
              fontSize: "14px",
              position: "relative",
              letterSpacing: ".4px",
              top: "-2px",
              left: "1px",
            }}
          >
            .{formatter.format(value).split(".")[1]}
          </small>
        </>
      ) : (
        <>{formatter.format(value)}</>
      )}
    </UICore.Text>
  );
}
