import React from "react";
import { autoUpdate, flip, useFloating } from "@floating-ui/react-dom";

const FloatingContainer = ({ children }) => {
  const { x, y, reference, floating, strategy } = useFloating({
    middleware: [flip()],
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate
  });

  return <>{children({ x, y, reference, floating, strategy })}</>;
};

export default FloatingContainer;
