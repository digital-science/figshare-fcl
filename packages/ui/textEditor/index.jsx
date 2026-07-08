/* eslint-disable max-lines */
import classnames from "classnames";
import React from "react";
import {
  CompositeDecorator,
  Editor,
  EditorState,
  getDefaultKeyBinding,
  Modifier,
  RichUtils,
} from "draft-js";
import PropTypes from "prop-types";

import styles from "./index.module.css";
import {
  applyEntity,
  removeEntity,
  findEntityType,
  findEntityURL,
  toggleEntityOnSelection,
  getSelectionEntity,
  DraftEntity,

  onConvertDraftToHTML,
  onConvertHTMLtoDraft,
  parseBlocksForUnicode,
  parsePastedContent,

  removeFormatting,
  handleKeyCommand,
  STRIKE_THROUGH_UNDERLINE,
} from "./utils";
import decorators from "./decorators";
import { LinkModal, Toolbar } from "./components";


const DEFAULT_MAX_TEXT_LENGTH = 10000;
const DEFAULT_MIN_TEXT_LENGTH = 5000;
const KEY_ENTER = 13;
const DEBOUNCE_DELAY = 1000;

export default class TextEditor extends React.Component {
  static propTypes = {
    /**
      Callback called when the editor contents are edited or changed.
      Called with the new `value` as the first argument by default.
      If `fieldName` is specified, the `fieldName` will be the first argument,
      followed by the new `value`.
     */
    onChange: PropTypes.func.isRequired,
    /**
      Optional class to append to the text editor wrapper node.
     */
    className: PropTypes.string,
    /**
      Disables the editor.
     */
    disabled: PropTypes.bool,
    /**
      Identify the editor through a unique field name. Will be passed to the `onChange` function as the first argument.
     */
    fieldName: PropTypes.string,
    /**
      Optional flag to show the editor with styles for the title.
     */
    isSingleRow: PropTypes.bool,
    /**
      Maximum number of characters for the editor text value. Includes markup.
     */
    maxTextLength: PropTypes.number,
    /**
      Minimum number of characters for the editor text value. Includes markup.
     */
    minTextLength: PropTypes.number,
    /**
      Placeholder text for the editor.
     */
    placeholder: PropTypes.string,
    /**
      Configuration options for the editor toolbar.
     */
    toolbarConfig: PropTypes.array,
    /**
      Editor text value.
     */
    value: PropTypes.string,
    /**
      Callback called when the editor looses focus.
     */
    onBlur: PropTypes.func,
    /**
      Callback called when the editor gains focus.
     */
    onFocus: PropTypes.func,
  };

  static defaultProps = {
    className: undefined,
    isSingleRow: false,
    disabled: false,
    placeholder: "",
    fieldName: "",
    maxTextLength: DEFAULT_MAX_TEXT_LENGTH,
    minTextLength: DEFAULT_MIN_TEXT_LENGTH,
    value: "",
    onBlur: undefined,
    onFocus: undefined,
    toolbarConfig: [],
  };

  constructor(props) {
    super(props);

    const contentState = onConvertHTMLtoDraft(this.props.value);

    const editorState = EditorState.createWithContent(
      contentState,
      this.decorator
    );

    this.state = {
      editorState: EditorState.moveSelectionToEnd(editorState),
      urlValue: "",
      showURLInput: false,
    };
  }

  lastActionWasClick = false;
  editorNode = null;
  inputNode = null;
  linkEntityTypes = ["LINK", "LINKSUP", "LINKSUB"];

  decorator = new CompositeDecorator(decorators);

  render() {
    const {
      className,
      isSingleRow,
      disabled,
      placeholder,
      minTextLength,
      toolbarConfig,
      onBlur,
      onFocus,
    } = this.props;
    const { editorState, urlValue, showURLInput } = this.state;
    const editorStyle = {
      height: "calc(100% - 80px)",
      overflow: "auto",
      overflowX: "hidden",
    };

    return (
      <div className={className}>
        <div className={styles.componentContainer}>
          <div
            className={classnames(styles.editorContainer,
              { [styles.disabled]: disabled },
              { [styles.titleEditorContainer]: isSingleRow })}
          >
            <div
              className={classnames(styles.editor, { [styles.titleEditor]: isSingleRow })}
              role="presentation"
              style={editorStyle}
              onClick={this.onClickEditor}
              onKeyDown={this.onKeyDownEditor}
            >
              <Editor
                ref={this.setEditorRef}
                editorState={editorState}
                handleBeforeInput={this.handleBeforeInput}
                handleKeyCommand={this.handleKeyCommand}
                handlePastedText={this.handlePaste}
                keyBindingFn={this.keyBindingFn}
                placeholder={placeholder}
                readOnly={disabled}
                onBlur={onBlur}
                onChange={this.onChange}
                onFocus={onFocus}
              />
            </div>
            <Toolbar
              disabled={disabled}
              editorNode={this.editorNode}
              editorState={editorState}
              toolbarConfig={toolbarConfig}
              onChange={this.onChange}
              onToggle={this.onToggle}
            />
          </div>
          <LinkModal
            ref={this.setInputRef}
            editorState={editorState}
            showURLInput={showURLInput}
            urlValue={urlValue}
            onCancelLinkAddition={this.onCancelLinkAddition}
            onConfirmLink={this.onConfirmModal}
            onRemoveLink={this.onRemoveLink}
            onSelectionChange={this.onSelectionChange}
            onURLChange={this.onURLChange}
          />
        </div>
        {minTextLength && this.renderTextLength()}
      </div>
    );
  }

  renderTextLength = () => {
    const { editorState } = this.state;
    const { maxTextLength, minTextLength } = this.props;

    const html = onConvertDraftToHTML(editorState);

    const htmlLength = `${html?.length} `;

    if (html.length < minTextLength) {
      return null;
    }

    return (
      <div className={styles.editorTextLength}>
        <span className={styles.textNumber}>{htmlLength}</span>
        <span>{`out of a total of ${maxTextLength} characters (includes html tags)`}</span>
      </div>
    );
  };

  setEditorRef = (node) => (this.editorNode = node);
  setInputRef = (node) => (this.inputNode = node);

  onFocusEditor = () => this.editorNode.focus();

  onClickEditor = () => {
    this.lastActionWasClick = true;
    setTimeout(() => {
      this.lastActionWasClick = false;
    }, DEBOUNCE_DELAY);
  };

  onKeyDownEditor = () => (this.lastActionWasClick = false);

  onChange = (editorState) => {
    const newEditorState = parseBlocksForUnicode(editorState);
    this.setState(
      { editorState: newEditorState },
      () => {
        const entity = findEntityType(this.state.editorState);
        if (this.lastActionWasClick && this.linkEntityTypes.includes(entity)) {
          this.lastActionWasClick = false;
          const url = findEntityURL(editorState);

          this.setState({ showURLInput: true, urlValue: url });
        }
      }
    );
    const { onChange, fieldName } = this.props;
    const convertedValue = onConvertDraftToHTML(editorState);

    if (!fieldName) {
      onChange(convertedValue);
    } else {
      onChange(fieldName, convertedValue);
    }
  };

  onToggle = (style, type) => () => {
    const { editorState } = this.state;
    let toggleArgs = null;

    switch (type) {
      case "undo":
        return this.onChange(EditorState.undo(editorState));
      case "redo":
        return this.onChange(EditorState.redo(editorState));
      case "sup":
        return this.onAddSup();
      case "sub":
        return this.onAddSub();
      case "link":
        return this.onAddLink();
      case "clear":
        return this.onRemoveFormatting();
      case "paste":
        return this.onPasteAsPlainText();
      case "block":
        toggleArgs = RichUtils.toggleBlockType(editorState, style);
        break;
      default:
        toggleArgs = RichUtils.toggleInlineStyle(editorState, style);
    }

    return this.onChange(toggleArgs);
  };

  onRemoveFormatting = () => {
    const { editorState } = this.state;

    const unstyledState = removeFormatting(editorState);
    this.setState({ editorState: unstyledState });
  };

  onAddEntity = (editorState, entity) => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const selectionKey = getSelectionEntity(editorState);
    const entityType =
      selectionKey && contentState.getEntity(`${selectionKey}`).type;

    if (!selection.isCollapsed()) {
      if (entityType === entity) {
        this.setState({ editorState: RichUtils.toggleLink(editorState, selection, null) });
      } else {
        const contentStateWithEntity = contentState.createEntity(entity);
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        this.setState({
          editorState: RichUtils.toggleLink(
            newEditorState,
            newEditorState.getSelection(),
            entityKey
          ),
        });
      }
    } else {
      // If the button is active outside of the selection
      // we should deactivate it
      if (entityType === entity) {
        const currentFocusIndex = editorState.getSelection().getFocusOffset();
        const currentTextLength = contentState.getPlainText("\u0001")?.length;

        const newContentState =
          currentFocusIndex === currentTextLength ? Modifier.insertText(contentState, selection, " ") : contentState;

        const newEditorState = EditorState.createWithContent(
          newContentState,
          this.decorator
        );
        const nextOffSet = currentFocusIndex + 1;
        const newSelection = selection.merge({
          focusOffset: nextOffSet,
          anchorOffset: nextOffSet,
        });

        this.setState({
          editorState: EditorState.acceptSelection(
            newEditorState,
            newSelection
          ),
        });
      }

      return entityType;
    }

    return null;
  };

  onAddScript = (entity) => {
    const { editorState } = this.state;
    const currentEntityType = findEntityType(editorState);
    const selection = editorState.getSelection();

    if (!selection.isCollapsed()) {
      // If we have a selection - apply/remove the requested entity
      this.setState({
        editorState: toggleEntityOnSelection(
          editorState,
          entity,
          currentEntityType
        ),
      });
    } else {
      // If the current entity is LINK - then we need to apply SUB/SUP
      if (currentEntityType === DraftEntity.LINK) {
        this.setState({ editorState: applyEntity(editorState, entity, currentEntityType) });

        return;
      }
      // If entity (SUB/SUP) is selected - currentEntityType should have a value
      const removeEntityFn = removeEntity(editorState, this.decorator);
      const applyEntityFn = applyEntity(editorState, entity, currentEntityType);
      const newEditorState = currentEntityType ? removeEntityFn : applyEntityFn;

      this.setState({ editorState: newEditorState });
    }
  };

  onAddSub = () => this.onAddScript(DraftEntity.SUB);
  onAddSup = () => this.onAddScript(DraftEntity.SUP);

  onURLChange = (e) => this.setState({ urlValue: e.target.value });

  onAddLink = () => {
    const { editorState } = this.state;
    const selection = editorState.getSelection();

    if (!selection.isCollapsed()) {
      const url = findEntityURL(editorState);
      this.setState({
        showURLInput: true,
        urlValue: url,
      });
    }
  };

  onConfirmModal = () => {
    const { editorState } = this.state;
    const currentEntityType = findEntityType(editorState);
    let entity = "";

    switch (currentEntityType) {
      case DraftEntity.SUB:
        entity = DraftEntity.LINKSUB;
        break;
      case DraftEntity.SUP:
        entity = DraftEntity.LINKSUP;
        break;
      default:
        entity = DraftEntity.LINK;
    }

    return this.onConfirmLink(entity);
  };

  onConfirmLink = (entity) => {
    const { editorState, urlValue } = this.state;
    const entityType = findEntityType(editorState);

    if (!urlValue.length) {
      this.onRemoveLink();

      return;
    }

    if (urlValue.length && this.linkEntityTypes.includes(entityType)) {
      this.onModifyLink(editorState, urlValue);

      return;
    }

    this.onCreateLink(entity);
  };

  onModifyLink = (editorState, urlValue) => {
    const contentState = editorState.getCurrentContent();
    const newContentState = contentState.replaceEntityData(
      getSelectionEntity(editorState),
      { url: urlValue }
    );

    const newEditorState = EditorState.set(editorState, { currentContent: newContentState });
    this.setState(
      {
        editorState: newEditorState,
        showURLInput: false,
        urlValue: "",
      },
      this.onFocusEditor
    );
  };

  onRemoveLink = () => {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    const entityType = findEntityType(editorState);

    this.setState(
      {
        editorState: RichUtils.toggleLink(editorState, selection, null),
        urlValue: undefined,
        showURLInput: false,
      },
      this.onFocusEditor
    );

    if (entityType === "LINKSUP" || entityType === "LINKSUB") {
      this.onRemoveLinkWithEntity(entityType);
    }
  };

  onRemoveLinkWithEntity = (entity) => {
    const { editorState } = this.state;

    if (entity === "LINKSUP") {
      this.onAddEntity(editorState, "SUP");
    }
    if (entity === "LINKSUB") {
      this.onAddEntity(editorState, "SUB");
    }
  };

  onCreateLink = (entity = "LINK") => {
    const { editorState, urlValue } = this.state;
    const contentState = editorState.getCurrentContent();

    const contentStateWithEntity = contentState.createEntity(
      entity,
      "MUTABLE",
      { url: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

    this.lastActionWasClick = false;

    this.setState(
      {
        editorState: RichUtils.toggleLink(
          newEditorState,
          newEditorState.getSelection(),
          entityKey
        ),
        showURLInput: false,
        urlValue: "",
      },
      this.onFocusEditor
    );
  };

  onCancelLinkAddition = () => {
    this.setState(
      {
        showURLInput: false,
        urlValue: "",
      },
      this.onFocusEditor
    );
  };

  onPasteAsPlainText = async() => {
    const { editorState } = this.state;
    const content = editorState.getCurrentContent();
    const pastedText = await navigator.clipboard.readText();
    const newContent = Modifier.insertText(
      content,
      editorState.getSelection(),
      pastedText
    );

    const newEditorState = EditorState.push(
      editorState,
      newContent,
      "insert-characters"
    );
    this.onChange(newEditorState);
  };

  keyBindingFn = (e) => {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    const contentBlock = contentState.getBlockForKey(selection.getStartKey());
    const blockLists = ["ordered-list-item", "unordered-list-item"];
    const currentBlockType = contentBlock.getType();

    if (e.which === KEY_ENTER) {
      if (
        blockLists.includes(currentBlockType) &&
        !contentBlock.getText().length
      ) {
        const toggleArgs = RichUtils.toggleBlockType(
          editorState,
          currentBlockType
        );
        this.onChange(toggleArgs);

        return;
      }
    }

    // eslint-disable-next-line consistent-return
    return getDefaultKeyBinding(e);
  };

  handleKeyCommand = (command) => {
    const { editorState } = this.state;
    this.onChange(handleKeyCommand(command, editorState));
  };

  handlePaste = (text, html = "") => {
    if (!html.includes(STRIKE_THROUGH_UNDERLINE)) {
      return false;
    }

    this.setState({ editorState: parsePastedContent(this.state.editorState, html) });

    return true;
  };
}
