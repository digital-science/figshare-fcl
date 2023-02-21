/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "@figshare/ui/button";

import { findEntityType } from "../../utils";

import styles from "./index.css";
import UnlinkIcon from "./unlink-icon";
import OpenLinkIcon from "./open-link-icon";


class LinkModal extends Component {
  static propTypes = {
    showURLInput: PropTypes.bool.isRequired,
    editorState: PropTypes.object,
    urlValue: PropTypes.string,
    onCancelLinkAddition: PropTypes.func,
    onConfirmLink: PropTypes.func,
    onRemoveLink: PropTypes.func,
    onURLChange: PropTypes.func,
  }

  static defaultProps = {
    urlValue: "",
    onURLChange: undefined,
    onConfirmLink: undefined,
    onCancelLinkAddition: undefined,
    onRemoveLink: undefined,
    editorState: {},
  }

  linkEntities = ["LINK", "LINKSUP", "LINKSUB"];

  render() {
    const {
      showURLInput,
      urlValue,
      onURLChange,
      onConfirmLink,
      onCancelLinkAddition,
      editorState,
    } = this.props;

    if (!showURLInput) {

      return null;
    }

    const selectionEntity = findEntityType(editorState);
    const hasLinkEntity = this.linkEntities.includes(selectionEntity);
    const title = hasLinkEntity ? "Edit link" : "Add link";
    const hasMinimumLength = urlValue.length >= 3;

    return (
      <div className={styles.modalShadow}>
        <div className={styles.modalContainer}>
          <div>
            <span className={styles.title}>{title}</span>
            <div> Link{this.renderOpenLinkButton(hasLinkEntity)} </div>
          </div>
          <input
            autoFocus={true}
            className={styles.input}
            placeholder="add link url here"
            type="text"
            value={urlValue}
            onChange={onURLChange}
          />
          <div className={styles.buttonsContainer}>
            {this.renderRemoveButton(hasLinkEntity)}
            <Button extraClass={styles.buttonCancel} type="simple" onClick={onCancelLinkAddition}>
              Cancel
            </Button>
            <Button disabled={!hasMinimumLength} extraClass={styles.buttonSave} type="simple" onClick={onConfirmLink} >
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }

  renderOpenLinkButton = (hasLinkEntity) => {
    const { urlValue } = this.props;
    if (!hasLinkEntity) {

      return null;
    }

    return (
      <Button extraClass={styles.buttonOpenLink} href={urlValue} target="_blank" type="link">
        <OpenLinkIcon className={styles.icon} /> Open link
      </Button>
    );
  }

  renderRemoveButton = (hasLinkEntity) => {
    const { onRemoveLink } = this.props;
    if (!hasLinkEntity) {

      return null;
    }

    return (
      <Button extraClass={styles.buttonUnlink} type="link" onClick={onRemoveLink}>
        <UnlinkIcon className="icon" /> Unlink
      </Button>
    );
  }
}

export default LinkModal;
