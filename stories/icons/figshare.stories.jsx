import React from "react";
import FigshareLogo from "@digital-science/figshare-fcl/icons/figshare/logo";
import FigshareText from "@digital-science/figshare-fcl/icons/figshare/text";
import FigshareFullLogo from "@digital-science/figshare-fcl/icons/figshare/index";
import Bitbucket from "@digital-science/figshare-fcl/icons/bitbucket/index";
import Ftp from "@digital-science/figshare-fcl/icons/ftpIntegration/index";
import GitHub from "@digital-science/figshare-fcl/icons/github/index";
import GitLab from "@digital-science/figshare-fcl/icons/gitlab/index";
import Orcid from "@digital-science/figshare-fcl/icons/orcid/index";
import OrcidSmall from "@digital-science/figshare-fcl/icons/orcid/small";
import Rss from "@digital-science/figshare-fcl/icons/rss/index";
import Bluesky from "@digital-science/figshare-fcl/icons/socialMedia/bluesky";
import Facebook from "@digital-science/figshare-fcl/icons/socialMedia/facebook";
import Linkedin from "@digital-science/figshare-fcl/icons/socialMedia/linkedin";
import Twitter from "@digital-science/figshare-fcl/icons/socialMedia/twitter";
import TwitterInverted from "@digital-science/figshare-fcl/icons/socialMedia/twitter_inverted";
import Vimeo from "@digital-science/figshare-fcl/icons/socialMedia/vimeo";

import { Cover } from "../story-utils/Cover";


export default {
  title: "Icons/Figshare",
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Banner = {
  render: () => (
    <Cover kind="story">
      <div
        style={ {
          display: "flex",
          margin: "48px",
          maxWidth: "700px",
          flexDirection: "column",
          justifyContent: "space-between",
        } }
      >
        <FigshareLogo animate={false} grayscale={false} />
        <br />
        <FigshareText />
        <br />
        <FigshareFullLogo />
      </div>
    </Cover>
  ),
};

export const BitbucketStory = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      <div style={ { display: "flex", margin: "48px", maxWidth: "700px", alignItems: "center" } }>
        <Bitbucket style={ { width: "48px", height: "48px", margin: "0 24px" } } />
      </div>
    </Cover>
  ),
};

export const FTPStory = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      <div style={ { display: "flex", margin: "48px", maxWidth: "700px", alignItems: "center" } }>
        <Ftp style={ { width: "48px", height: "48px", margin: "0 24px" } } />
      </div>
    </Cover>
  ),
};

export const GitHubStory = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      <div style={ { display: "flex", margin: "48px", maxWidth: "700px", alignItems: "center" } }>
        <GitHub style={ { width: "48px", height: "48px", margin: "0 24px" } } />
      </div>
    </Cover>
  ),
};

export const GitLabStory = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      <div style={ { display: "flex", margin: "48px", maxWidth: "700px", alignItems: "center" } }>
        <GitLab style={ { width: "48px", height: "48px", margin: "0 24px" } } />
      </div>
    </Cover>
  ),
};

export const OrcID = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      <div style={ { display: "flex", margin: "48px", maxWidth: "700px", alignItems: "center" } }>
        <Orcid style={ { width: "48px", height: "48px", margin: "0 24px" } } />
        <OrcidSmall style={ { width: "48px", height: "48px", margin: "0 24px" } } />
      </div>
    </Cover>
  ),
};

export const RssStory = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      <div style={ { display: "flex", margin: "48px", maxWidth: "700px", alignItems: "center" } }>
        <Rss fill="#ee802f" style={ { width: "24px", height: "24px", margin: "0 24px" } } />
      </div>
    </Cover>
  ),
};

export const SocialMedia = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      {() => {
        const iconStyle = {
          width: "30px",
          height: "30px",
          margin: "0 24px",
        };

        return (
          <div
            style={ {
              display: "flex",
              margin: "48px",
              maxWidth: "700px",
              alignItems: "center",
            } }
          >
            <Facebook fill="#4267B2" style={iconStyle} />
            <Bluesky fill="#4267B2" style={iconStyle} />
            <Linkedin fill="#0072b1" style={iconStyle} />
            <Twitter fill="#000" style={iconStyle} />
            <TwitterInverted fill="#000" style={iconStyle} />
            <Vimeo fill="#1AB7EA" style={iconStyle} />
          </div>
        );
      }}
    </Cover>
  ),
};
