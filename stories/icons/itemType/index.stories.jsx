import React from "react";
import ItemTypePreprint from "@digital-science/figshare-fcl/icons/itemType/preprint";
import ItemTypeBook from "@digital-science/figshare-fcl/icons/itemType/book";
import ItemTypeSoftware from "@digital-science/figshare-fcl/icons/itemType/software";
import ItemTypePaper from "@digital-science/figshare-fcl/icons/itemType/paper";
import ItemTypeMetadata from "@digital-science/figshare-fcl/icons/itemType/metadata";
import ItemTypeThesis from "@digital-science/figshare-fcl/icons/itemType/thesis";
import ItemTypePoster from "@digital-science/figshare-fcl/icons/itemType/poster";
import ItemTypeDataset from "@digital-science/figshare-fcl/icons/itemType/dataset";
import ItemTypeMedia from "@digital-science/figshare-fcl/icons/itemType/media";
import ItemTypeFigure from "@digital-science/figshare-fcl/icons/itemType/figure";
import ItemTypePresentation from "@digital-science/figshare-fcl/icons/itemType/presentation";
import ItemTypeOnlineResource from "@digital-science/figshare-fcl/icons/itemType/onlineResource";
import ItemTypeWorkflow from "@digital-science/figshare-fcl/icons/itemType/workflow";
import ItemTypePerformance from "@digital-science/figshare-fcl/icons/itemType/performance";
import ItemTypeCollection from "@digital-science/figshare-fcl/icons/itemType/collection";
import ItemTypeProject from "@digital-science/figshare-fcl/icons/itemType/project";

import { Cover } from "../../story-utils/Cover";

import styles from "./index.stories.module.css";


export default {
  title: "Icons/ItemType",
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Preprint = {
  render: () => (
    <Cover kind="story">
      <ItemTypePreprint className={styles.icon} />
    </Cover>
  ),
};

export const Book = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      <ItemTypeBook className={styles.icon} />
    </Cover>
  ),
};

export const Software = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      <ItemTypeSoftware className={styles.icon} />
    </Cover>
  ),
};

export const Paper = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      <ItemTypePaper className={styles.icon} />
    </Cover>
  ),
};

export const Metadata = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      <ItemTypeMetadata className={styles.icon} />
    </Cover>
  ),
};

export const Thesis = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      <ItemTypeThesis className={styles.icon} />
    </Cover>
  ),
};

export const Poster = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      <ItemTypePoster className={styles.icon} />
    </Cover>
  ),
};

export const Dataset = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      <ItemTypeDataset className={styles.icon} />
    </Cover>
  ),
};

export const Media = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      <ItemTypeMedia className={styles.icon} />
    </Cover>
  ),
};

export const Figure = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      <ItemTypeFigure className={styles.icon} />
    </Cover>
  ),
};

export const Presentation = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      <ItemTypePresentation className={styles.icon} />
    </Cover>
  ),
};

export const OnlineResource = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      <ItemTypeOnlineResource className={styles.icon} />
    </Cover>
  ),
};

export const Workflow = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      <ItemTypeWorkflow className={styles.icon} />
    </Cover>
  ),
};

export const Performance = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      <ItemTypePerformance className={styles.icon} />
    </Cover>
  ),
};

export const Collection = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      <ItemTypeCollection className={styles.icon} />
    </Cover>
  ),
};

export const Project = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="story">
      <ItemTypeProject className={styles.icon} />
    </Cover>
  ),
};
