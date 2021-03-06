import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { withKnobs, text } from "@storybook/addon-knobs";
import { $enum } from "ts-enum-util";
import keys from "lodash/keys";

import themeDecorator, { Colors, theme } from "../utils/ThemeDecorator";

import {
  Text, TextProps, TextSize
} from "./Text";

export default {
  title: "Components/Text",
  component: Text,
  argTypes: {
    bold: { type: "boolean" },
    light: { type: "boolean" },
    uppercase: { type: "boolean" },
    Color: {
      control: {
        type: "select",
        options: $enum(Colors).getKeys()
      }
    },
    size: {
      control: {
        type: "select",
        options: TextSize
      }
    },
    family: {
      control: {
        type: "select",
        options: keys(theme.font.family)
      }
    }

  },
  decorators: [ withKnobs, themeDecorator ]
} as Meta;

const Template: Story<TextProps> = args => (
  <Text {...args}>
    {text("Text", "Hello world!")}
  </Text>
);

export const H1 = Template.bind({});

H1.args = { size: TextSize.h1 };

export const Paragraph = Template.bind({});

Paragraph.args = { size: TextSize.p };
