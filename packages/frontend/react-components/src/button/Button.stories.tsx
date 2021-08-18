import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {
  Story,
  Meta
} from "@storybook/react/types-6-0";
import { $enum } from "ts-enum-util";

import themeDecorator, { Colors } from "../utils/ThemeDecorator";
import {
  Button,
  ButtonDisplay,
  ButtonProps,
  ButtonIconAlignment
} from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    plain: { type: "boolean" },
    loading: { type: "boolean" },
    small: { type: "boolean" },
    isSelected: { type: "boolean" },
    disabled: { type: "boolean" },
    display: {
      type: "enum",
      control: {
        type: "select",
        options: ButtonDisplay
      }
    },
    iconAlignment: {
      type: "enum",
      control: {
        type: "select",
        options: ButtonIconAlignment
      }
    },
    textColor: {
      control: {
        type: "select",
        options: $enum(Colors).getKeys()
      }
    },
    backgroundColor: {
      type: "enum",
      control: {
        type: "select",
        options: $enum(Colors).getKeys()
      }
    }
  },
  decorators: [ themeDecorator ]
} as Meta;

const Template: Story<ButtonProps> = args => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = { label: "Button" };

export const Disabled = Template.bind({});

Disabled.args = {
  label: "Button",
  disabled: true
};
