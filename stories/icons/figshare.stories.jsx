import React from "react";
import {
  Bitbucket,
  Bluesky,
  Facebook,
  FigshareLogo,
  FigshareLogoFull,
  FigshareLogoMono,
  FigshareWordmark,
  FtpIntegration,
  Github,
  Gitlab,
  Linkedin,
  Orcid,
  OrcidSolid,
  Rss,
  Twitter,
  Vimeo,
} from "@digital-science/figshare-fcl/icons/react";

import { Cover } from "../story-utils/Cover";

import { IconGallery } from "./IconGallery";


export default {
  title: "Icons/Figshare",
  parameters: { docs: { canvas: { withToolbar: true } } },
};

const row = { display: "flex", margin: "24px 48px", gap: 32, alignItems: "center", flexWrap: "wrap" };

export const Banner = {
  render: () => (
    <Cover kind="story">
      <div style={row}>
        <FigshareLogo animate={false} grayscale={false} style={ { height: 60, width: "auto" } } />
        <FigshareLogo animate={true} grayscale={true} style={ { height: 60, width: "auto" } } />
        <FigshareLogoMono style={ { height: 60, width: "auto", color: "#55636d" } } />
        <FigshareWordmark style={ { height: 60, width: "auto", color: "#55636d" } } />
        <FigshareLogoFull style={ { height: 60, width: "auto", color: "#55636d" } } />
      </div>
    </Cover>
  ),
};

export const Integrations = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      <div style={row}>
        <Bitbucket style={ { width: 48, height: 48 } } />
        <FtpIntegration style={ { width: 48, height: 48 } } />
        <Github style={ { width: 48, height: 48 } } />
        <Gitlab style={ { width: 48, height: 48 } } />
        <Rss style={ { width: 48, height: 48 } } />
        <Orcid style={ { height: 36, width: "auto" } } />
        <OrcidSolid style={ { width: 48, height: 48 } } />
      </div>
    </Cover>
  ),
};

export const SocialMedia = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      <div style={row}>
        <Facebook color="#4267B2" style={ { width: 30, height: 30 } } />
        <Bluesky color="#0085ff" style={ { width: 30, height: 30 } } />
        <Linkedin color="#0072b1" style={ { width: 30, height: 30 } } />
        <Twitter color="#000" style={ { width: 30, height: 30 } } />
        <Vimeo color="#1AB7EA" style={ { width: 30, height: 30 } } />
      </div>
    </Cover>
  ),
};

export const AllFigshare = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      <IconGallery folder="figshare" size={48} />
    </Cover>
  ),
};
