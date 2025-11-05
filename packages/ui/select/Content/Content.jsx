import classnames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";

import { Menu } from "../../dropdown";
import SearchInput from "../../input/search";
import Context from "../context";

import style from "./Content.css";


export class Content extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    error: PropTypes.bool,
    loading: PropTypes.bool,
    placement: PropTypes.oneOf([
      "bottom", "bottom-start", "bottom-end",
      "top", "top-start", "top-end",
      "right", "right-start", "right-end",
      "left", "left-start", "left-end",
    ]),
    popperModifiers: PropTypes.array,
    onLoadMore: PropTypes.func,
  }

  static defaultProps = {
    children: null,
    className: undefined,
    error: false,
    forwardedRef: null,
    loading: false,
    placement: "bottom-start",
    popperModifiers: [],
    onLoadMore: () => undefined,
  }

  static contextType = Context

  state = { search: "" }

  render() {
    const { placement, popperModifiers } = this.props;

    return (
      <Menu modifiers={popperModifiers} placement={placement}>
        {this.renderContent}
      </Menu>
    );
  }

  renderContent = ({ isVisible, props }) => {
    const {
      className,
      loading,
      error,
    } = this.props;

    const { ref, ...contentProps } = props;

    const containerClassName = [
      style.container,
      className,
      { [style.visible]: isVisible }];

    const contentClassName = [
      style.content,
      {
        [style.loading]: loading,
        [style.error]: error,
      },
    ];

    return (
      <div
        ref={this.setContainerRef(ref)}
        className={classnames(containerClassName)}
        {...contentProps}
      >
        {this.renderSearch()}
        <div
          key={`${isVisible}-${this.state.search?.length > 0}`}
          className={classnames(contentClassName)}
          onScroll={this.onScroll}
        >
          {this.props.children}
        </div>
      </div>
    );
  }

  renderSearch = () => {
    const { searchable, searchPlaceholder } = this.context;
    const { search } = this.state;

    if (!searchable) {
      return null;
    }

    return (
      <div className={style.search}>
        <SearchInput
          aria-label={searchPlaceholder}
          className={style.searchInput}
          placeholder={searchPlaceholder}
          value={search}
          onChange={this.onSearch}
          onKeyDown={this.onKeyDown}
          onSubmit={(event) => this.onSubmit(event)}
        />
      </div>
    );
  }

  setContainerRef = (fwRef) => (node) => fwRef(node);

  onKeyDown = (ev) => {
    const { triggerRef } = this.context;

    if (ev.key === "Escape" && triggerRef) {
      triggerRef?.querySelector?.("[data-id=\"select-trigger-btn\"]")?.focus?.();
    }
  }

  onSearch = (search) => {
    const searchValue = search?.target?.value;
    this.setState({ search: searchValue });
    this.context.onSearch(searchValue);
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.context.onSearch(this.state.search);
  }

  onScroll = (event) => {
    const { error, loading, onLoadMore } = this.props;

    if (error || loading) {
      return;
    }

    const { target } = event;
    const { scrollTop, scrollHeight, offsetHeight } = target;

    const diff = scrollHeight - offsetHeight - scrollTop;

    if (diff < 1) {
      onLoadMore();
    }
  }
}

export default Content;
