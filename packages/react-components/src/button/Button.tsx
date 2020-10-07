import * as React from "react";
import styled, { css, DefaultTheme } from "styled-components";

import Text from "../text";

export enum ButtonIconAlignment {
  left = "left",
  right = "right"
}

export enum ButtonDisplay {
  display = "display",
  flex = "flex"
}

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
  className?: string;
  label: string;
  iconAlignment?: ButtonIconAlignment;
  display?: ButtonDisplay;
  backgroundColor?: keyof DefaultTheme["colors"];
  textColor?: keyof DefaultTheme["colors"];
  loading?: boolean;
  small?: boolean;
  isSelected?: boolean;
  plain?: boolean;
  disabled?: boolean;
}

const Wrapper = styled.div<{display?: ButtonDisplay}>`
  z-index: 1;
  display: ${props => props.display || "inline"};
  position: relative;
`;

const StyledButton = styled.button<Omit<ButtonProps, "label" | "iconAlignment" | "display"> & {reverse?: boolean; }>`
  flex-direction: ${props => props.reverse ? "row" : "row-reverse"};

  ${props =>
    !props.plain &&
    css`
      font-family: ${props.theme.font.family.secondary};
      font-weight: ${props.theme.font.weights.medium};
      font-size: ${props.theme.font.sizes.bodySmall};
      position: relative;
      border-radius: ${props.theme.borderRadius.medium};
      height: 4rem;
      background: ${props.backgroundColor ? props.theme.colors[ props.backgroundColor ] : props.theme.colors.primary};
      border-color: ${props.backgroundColor ? props.theme.colors[ props.backgroundColor ] : props.theme.colors.primary};
      color: ${props.textColor ? props.theme.colors[ props.textColor ] : "white"};
      transition: all ease-in-out 0.2s;

      &:hover, &:focus, &:active {
        border-color: ${props.backgroundColor ? props.theme.colors[ props.backgroundColor ] : props.theme.colors.primary};
        box-shadow: 0px 1px 6px -2px ${props.theme.colors.primary};
      }

      &.selected {
        background: ${props.theme.colors.primary};
        border-color: ${props.theme.colors.primary};
        color: white;

        &:hover {
          box-shadow: 0px 0px 5px ${props.theme.colors.primary};
        }
      }
    `};

  ${props =>
    props.small &&
    css`
      height: auto;
      padding: 0.3rem 1.2rem;
      border-radius: ${props.theme.borderRadius.small};
      font-size: ${props.theme.font.sizes.small}
    `};

    ${props =>
    props.disabled &&
    css`
      opacity: 0.8;
      cursor: not-allowed;
    `};
`;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  label, iconAlignment, display, ...props
}, ref) => {
  const { className } = props;
  const iconAlign: boolean = iconAlignment === "right" || false;

  return (
    <Wrapper display={display}>
      <StyledButton ref={ref} {...props} className={`${className} ${props.isSelected ? " selected" : ""}`} disabled={props.loading || props.disabled} reverse={iconAlign}>
        <Text>
          {label}
        </Text>
      </StyledButton>
    </Wrapper>
  );
});
