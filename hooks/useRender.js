import { useState, useEffect } from "react";

/**
 * A hook for Rendering when used as a useEffect dependency
 */
function useRender() {
  const [renderWatch, setRenderWatch] = useState(Date.now());
  const callRender = () => {
    setRenderWatch(Date.now());
  };

  useEffect(() => {
    console.log(`Rendered at ${new Date().toLocaleTimeString()}`);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderWatch]);

  return [renderWatch, callRender];
}

export default useRender;
