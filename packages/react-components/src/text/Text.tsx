import styled, { css, DefaultTheme } from "styled-components";

export enum TextSizes {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
  p = "p",
  a = "a",
  small = "small"
}

export interface TextProps {
  bold?: boolean;
  light?: boolean;
  color?: keyof DefaultTheme["colors"];
  uppercase?: boolean;
  size?: TextSizes;
  family?: keyof DefaultTheme["font"]["family"]
}

// use as keywrod to decide which styleset to use
const Text = styled.span.attrs<TextProps>(({ size }) => ({ as: size }))<TextProps>`
  font-family: ${({ theme }) => theme.font.family.secondary}, sans-serif;
  font-weight: ${({ theme }) => theme.font.weights.regular};
  font-style: normal;
  text-transform: ${props => (props.uppercase ? "uppercase" : "none")};
  letter-spacing: ${props => (props.uppercase ? "0.2rem" : "inherit")};
  color: ${props =>
    props.color ? props.theme.colors[ props.color ] : "inherit"};


  ${props => {
    switch (props.size) {
      case "h1":
        return css`
          font-size: ${props.theme.font.sizes.heading1};
          line-height: 1.2em;
          font-family: ${props.theme.font.family.primary};
          font-size: ${props.theme.font.weights.light};
        `;
      case "h2":
        return css`
          font-size: ${props.theme.font.sizes.heading2};
          line-height: 1.2em;
          font-family: ${props.theme.font.family.primary};
          font-size: ${props.theme.font.weights.medium};
        `;

      case "h3":
        return css`
          font-size: ${props.theme.font.sizes.heading3};
          line-height: 1.2em;
          font-family: ${props.theme.font.family.primary};
          font-weight: ${props.theme.font.weights.light};
        `;

      case "h4":
        return css`
          font-size: ${props.theme.font.sizes.heading4};
          line-height: 1.2em;
          font-family: ${props.theme.font.family.primary};
          font-weight: ${props.theme.font.weights.regular};
        `;

      case "h5":
        return css`
          font-size: ${props.theme.font.sizes.heading5};
          line-height: 1.2em;
          font-family: ${props.theme.font.family.secondary};
          font-size: ${props.theme.font.weights.medium};
          text-transform: uppercase;
        `;
      case "h6":
        return css`
          font-size: ${props.theme.font.sizes.heading6};
          line-height: 1.2em;
          font-family: ${props.theme.font.family.secondary};
          font-weight: ${props.theme.font.weights.medium};
          text-transform: uppercase;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-size: 1.4rem;
        `;
      case "p":
        return css`
          font-family: ${props.theme.font.family.secondary};
          font-size: ${props.theme.font.sizes.bodyRegular};
          line-height: 1.4em;
        `;
      case "a":
        return css`
          font-family: ${props.theme.font.family.secondary};
          font-size: ${props.theme.font.sizes.bodyRegular};
          line-height: 1.4em;
        `;
      case "small":
        return css`
          font-family: ${props.theme.font.family.secondary};
          font-size: ${props.theme.font.sizes.bodySmall};
          line-height: 1.2em;
        `;
      default:
        return css`
          font-family: ${props.theme.font.family.secondary};
          font-size: ${props.theme.font.sizes.bodyRegular};
        `;
    }
  }}
  font-weight: ${props => (props.light && props.theme.font.weights.light)};
  font-weight: ${props => (props.bold && props.theme.font.weights.bold)};
  font-family: ${props => props.family && props.theme.font.family[ props.family ]};
`;

export default Text;