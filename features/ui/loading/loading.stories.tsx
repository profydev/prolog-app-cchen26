import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Loading } from "./loading";

export default {
  title: "UI/Loading",
  component: Loading,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Loading>;

const Template: StoryFn<typeof Loading> = () => <Loading />;

export const Default = Template.bind({});
Default.parameters = {
  viewMode: "docs",
};
