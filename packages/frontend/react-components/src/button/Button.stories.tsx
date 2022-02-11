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
      type: {
        name: "enum",
        value: $enum(ButtonDisplay).getKeys()
      }
    },
    iconAlignment: {
      type: {
        name: "enum",
        value: $enum(ButtonIconAlignment).getKeys()
      }
    },
    textColor: {
      type: {
        name: "enum",
        value: $enum(Colors).getKeys()
      }
    },
    backgroundColor: {
      type: {
        name: "enum",
        value: $enum(Colors).getKeys()
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
