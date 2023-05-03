import { UICore } from "..";
import { devices } from "../../utils";
import { useWindowSize } from "../../hooks";

export default function Card({ children, ...rest }) {
  const windowSize = useWindowSize();

  return (
    <UICore.Box
      radius="6px"
      mg="var(--space-none)"
      bg="#17181a"
      border="1px solid #3a3a3d"
      pd={
        windowSize?.width > devices.DEVICE_SIZES.TABLET_SM
          ? "var(--space-lg)"
          : "var(--space-md)"
      }
      {...rest}
    >
      {children}
    </UICore.Box>
  );
}
