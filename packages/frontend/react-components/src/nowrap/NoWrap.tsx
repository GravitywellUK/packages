import * as React from "react";

const space = {
  flex: "1",
  pointerEvents: "none"
} as const;

export const Spacer: React.FC<JSX.IntrinsicElements["div"]> = props => (
  <div
    {...props}
    style={{
      ...space,
      ...props.style
    }}
  />
);