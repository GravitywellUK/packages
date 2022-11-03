import * as React from "react";

const noWrap = { whiteSpace: "nowrap" } as const;

/**
 * Sometimes with text-wrapping its desired to ensure a string of words appear
 * on the same line, or to avoid the one word on a line scenario
 * @example
 * // OH NO
 * big
 * apple
 * // WINNING
 * big apple
 */
export const NoWrap: React.FC<JSX.IntrinsicElements["span"]> = props => (
  <span
    {...props}
    style={{
      ...noWrap,
      ...props.style
    }}
  />
);