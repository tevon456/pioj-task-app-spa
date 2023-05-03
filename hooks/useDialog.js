import { useEffect, useState } from "react";

import Dialog from "./Dialog";

function useDialog() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    }
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [open]);
  function toggle() {
    setOpen(!open);
  }
  return { open, toggle, Dialog };
}

export default useDialog;
