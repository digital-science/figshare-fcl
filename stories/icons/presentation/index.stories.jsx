import React from "react";
import Quote from "@digital-science/figshare-fcl/icons/presentation/quote";
import Project from "@digital-science/figshare-fcl/icons/presentation/project";
import Collection from "@digital-science/figshare-fcl/icons/presentation/collection";
import Exclamation from "@digital-science/figshare-fcl/icons/presentation/exclamation";
import CheckMark from "@digital-science/figshare-fcl/icons/presentation/checkMark";
import Note from "@digital-science/figshare-fcl/icons/presentation/note";
import Ftp from "@digital-science/figshare-fcl/icons/presentation/ftp";
import EnvelopeSuccess from "@digital-science/figshare-fcl/icons/presentation/envelopeSuccess";
import EnvelopeError from "@digital-science/figshare-fcl/icons/presentation/envelopeError";
import EmbedCode from "@digital-science/figshare-fcl/icons/presentation/embedCode";
import EmbedTitle from "@digital-science/figshare-fcl/icons/presentation/embedTitle";
import Ribbon from "@digital-science/figshare-fcl/icons/presentation/ribbon";
import Publications from "@digital-science/figshare-fcl/icons/presentation/publications";

import { Cover } from "../../story-utils/Cover";

import styles from "./index.stories.module.css";


export default {
  title: "Icons",
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Presentation = {
  render: () => (
    <Cover kind="story">
      <Quote className={styles.icon} />
      <Project className={styles.icon} />
      <Collection className={styles.icon} />
      <Exclamation className={styles.icon} />
      <CheckMark className={styles.icon} />
      <Note className={styles.icon} />
      <Ftp className={styles.icon} />
      <br />
      <EnvelopeSuccess className={styles.icon} />
      <EnvelopeError className={styles.icon} />
      <EmbedCode className={styles.icon} />
      <EmbedTitle className={styles.icon} />
      <Ribbon className={styles.icon} />
      <Publications className={styles.icon} />
    </Cover>
  ),
};
