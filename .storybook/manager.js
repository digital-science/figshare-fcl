import { create } from "@storybook/theming";
import { addons } from "@storybook/manager-api";

addons.setConfig({
  theme: create({
    base: "dark",
    brandTitle: "figshare storybook",
    brandUrl: "https://figshare.com",
    brandImage: "/logo.png",
  }),
});
