import PropTypes from "prop-types";
import React, { Component } from "react";
import isFunction from "@digital-science/figshare-fcl/helpers/utils/isFunction";

import Context from "./context";
import { mutations, reading } from "./storage";


export default class LinkingProvider extends Component {
  static propTypes = { children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired }

  constructor(...args) {
    super(...args);

    this.state = {
      data: {},
      defaultIdentifier: "default",
      add: this.mutationOp("add"),
      remove: this.mutationOp("remove"),
      update: this.mutationOp("update"),
      getPropsForAttributes: this.readOp("getPropsForAttributes"),
      getAttributeValue: this.readOp("getAttributeValue"),
    };
  }

  render() {
    const { children } = this.props;
    if (isFunction(children)) {
      return (
        <Context.Provider value={this.state}>
          {children(this.state)}
        </Context.Provider>
      );
    }

    return (
      <Context.Provider value={this.state}>
        {children}
      </Context.Provider>
    );
  }

  mutationOp = (type) => (...args) => {
    this.setState(({ data }) => {
      const nextData = mutations[type](data, ...args);
      if (data === nextData) {
        return undefined;
      }

      return { data: nextData };
    });
  };

  readOp = (type) => (...args) => reading[type](this.state.data, ...args);
}
