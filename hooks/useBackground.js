import { useEffect } from "react";

function useBackground(background) {
  // const apply = (background) => {
  //   if (typeof document !== "undefined") {
  //     document.body.style.background = background;
  //   }
  // };
  useEffect(() => {
    document.body.style.background = background;

    return () => {
      document.body.style.background =
      "var(--global-background)"
    }
    // eslint-disable-next-line
  }, [background]);

  // return [apply];
}

export default useBackground;
