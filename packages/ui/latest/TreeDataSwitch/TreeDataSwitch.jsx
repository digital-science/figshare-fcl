/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/aria-role */
import React from "react";
import PropTypes from "prop-types";
import Checkbox from "@digital-science/figshare-fcl/input/checkbox";
import RenderSwitch from "@digital-science/figshare-fcl/renderSwitch";
import ChevronLargeRightSvg from "@digital-science/figshare-fcl/icons/react/ChevronLargeRight";
import ChevronLargeDownSvg from "@digital-science/figshare-fcl/icons/react/ChevronLargeDown";

import { Block } from "../Block";
import { Button } from "../Button";
import { Text } from "../Text";
import { Tag } from "../Tag";
import { Tooltip } from "../Tooltip";
import { getIn } from "../../utils/getIn";
import { SearchInput } from "../SearchInput";


export function TreeDataSwitch({ name: fieldName, readOnly, tree, onChange, searchPlaceholder, noSearchResultsMessage, renderActions, renderBulkActions }) {
  const [, updateState] = React.useState({ tree });
  const [search, setSearch] = React.useState("");
  const searchResults = React.useMemo(() => {
    if (search.length < 3) {
      return [];
    }

    return Object.values(tree.nodes).filter((node) => {
      const name = getIn(node, "datum.name", "");

      return (name.toLowerCase().includes(search.toLowerCase()));
    });
  }, [search, tree]);

  const onSearchChange = React.useCallback((e) => {
    setSearch(e.target.value);
  }, [setSearch]);

  const onNodeChange = React.useCallback(({ node, event, checked }) => {
    onChange?.({ name: fieldName, tree, node, event, checked });
  }, [fieldName, tree]);

  const onUpdate = React.useCallback((update) => {
    updateState(update);
    onChange?.({ name: fieldName, ...update });
  }, [fieldName, onChange]);

  // REVIEW: implement module level css specific to this component
  return (
    <Block kind="layout-columns gap-2">
      <Block kind="layout-rows gap-2 align-center justify-space-between">
        <Block kind="layout-rows align-center justify-start flex-grow children-span-full" >
          <SearchInput id={`${fieldName}.search`} name={`${fieldName}.search`} placeholder={searchPlaceholder} value={search} onChange={onSearchChange} />
        </Block>
        {renderBulkActions && (
          typeof renderBulkActions === "function" ? renderBulkActions({ tree, search, onUpdate, name: fieldName, readOnly }) : renderBulkActions
        )}
      </Block>
      <Block kind="layout-columns gap-2">
        <RenderSwitch key="tree-or-search-results-list-switch" value={search.length >= 3}>
          <RenderSwitch.Case value={true}>
            <RenderSwitch key="search-results-branch" value={searchResults.length === 0}>
              <RenderSwitch.Case value={true}>
                <Block kind="layout-rows gap-2 align-center justify-start span-full padding-2">
                  <Text kind="body" tag="p">{noSearchResultsMessage}</Text>
                </Block>
              </RenderSwitch.Case>
              <RenderSwitch.Case value={false}>
                {searchResults.map((node) => (
                  <TreeNode
                    key={node.id}
                    fieldName={fieldName}
                    node={node}
                    readOnly={readOnly}
                    renderActions={renderActions}
                    type="listitem"
                    onChange={onNodeChange}
                  />
                ))}
              </RenderSwitch.Case>
            </RenderSwitch>
          </RenderSwitch.Case>
          <RenderSwitch.Case value={false}>
            {tree.children.map((nodeId) => (
              <TreeNode
                key={nodeId}
                fieldName={fieldName}
                node={tree.nodes[nodeId]}
                readOnly={readOnly}
                renderActions={renderActions}
                type="treeitem"
                onChange={onNodeChange}
              />
            ))}
          </RenderSwitch.Case>
        </RenderSwitch>
      </Block>
    </Block>
  );
}

TreeDataSwitch.propTypes = {
  tree: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  searchPlaceholder: PropTypes.string,
  noSearchResultsMessage: PropTypes.string,
  readOnly: PropTypes.bool,
  renderActions: PropTypes.func,
  renderBulkActions: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};

TreeDataSwitch.defaultProps = {
  tree: { children: [], path: "", length: 0, nodes: {}, level: 0, state: { expanded: true, checked: false } },
  searchPlaceholder: "Search...",
  noSearchResultsMessage: "No results found.",
  readOnly: false,
  renderActions: undefined,
  renderBulkActions: undefined,
};


export function TreeNode({ node, type, fieldName, readOnly, onChange, renderActions }) {
  const isExpandable = node.children && node.children.length > 0;
  const [expanded, setExpanded] = React.useState(!!node.state.expanded);
  const [checked, setChecked] = React.useState(!!node.state.checked);
  const isListed = type === "listitem";

  React.useEffect(() => {
    setExpanded(!!node.state.expanded);
  }, [node.state.expanded]);
  React.useEffect(() => {
    setChecked(!!node.state.checked);
  }, [node.state.checked]);

  const onExpandCollapse = React.useCallback(() => {
    setExpanded((prev) => {
      node.state.expanded = !prev;

      return !prev;
    });
  }, [node, setExpanded]);

  const onSwitchChange = React.useCallback((e) => {
    const { checked: newChecked } = e.target;
    setChecked(newChecked);
    node.state.checked = newChecked;
    onChange?.({ node, event: e, checked: newChecked });
  }, [node, setChecked]);

  function renderSubtree() {
    return (
      <>
        {node.children.map((childId) => (
          <TreeNode key={childId} fieldName={fieldName} node={node.nodes[childId]} readOnly={readOnly} renderActions={renderActions} onChange={onChange} />
        ))}
      </>
    );
  }

  const levelStyle = React.useMemo(() => {
    if (isListed) {
      return { paddingLeft: "6px" };
    }

    return { paddingLeft: `${6 + (node.level * 18) + (isExpandable ? 0 : 38)}px` };
  }, [isListed, node.level, isExpandable]);

  const ariaProps = isListed ? {
    "data-disabled": node.state.disabled ? "true" : "false",
    "data-checked": checked ? "true" : "false",
  } : {
    "aria-expanded": isExpandable ? expanded : undefined,
    "aria-level": node.level + 1,
    "aria-setsize": node.children.length,
    "aria-posinset": node.path.indexOf(node.id) + 1,
    "data-state": expanded ? "expanded" : "collapsed",
    "data-disabled": node.state.disabled ? "true" : "false",
    "data-checked": checked ? "true" : "false",
  };

  return (
    <>
      <Block
        kind="layout-rows gap-2 align-center justify-between padding-1 span-full"
        role={type}
        {...ariaProps}
        style={levelStyle}
      >
        <Block kind="layout-rows span-fit-content align-center gap-2 justify-start">
          {isExpandable && !isListed && (
            <Button em="low" kind="tertiary" span="icon" tooltip={node.state.expanded ? "Collapse" : "Expand"} onClick={onExpandCollapse}>
              <Button.Label hidden={true}>{node.state.expanded ? "Collapse" : "Expand"}</Button.Label>
              <Button.Icon>
                {expanded ? (<ChevronLargeDownSvg />) : (<ChevronLargeRightSvg />)}
              </Button.Icon>
            </Button>
          )}
          <Text kind="body" tag="p">{node.datum.name}</Text>
        </Block>
        <Block kind="layout-rows span-fit-content align-center gap-2 justify-end">
          <RenderSwitch key="readonly-node-switch" value={readOnly}>
            <RenderSwitch.Case value={true}>
              <Tag color={checked ? Tag.colors.green : Tag.colors.red}>{checked ? "ON" : "OFF"}</Tag>
            </RenderSwitch.Case>
            <RenderSwitch.Case value={false}>
              <RenderSwitch key="simple-switch-or-with-tooltip-switch" value={!!node.metadata.tooltip}>
                <RenderSwitch.Case value={false}>
                  <Checkbox
                    checked={checked}
                    disabled={node.state.disabled}
                    id={`switch-${fieldName}-${node.id}`}
                    name={`${fieldName}.${node.id}`}
                    variant="switch"
                    onChange={onSwitchChange}
                  />
                </RenderSwitch.Case>
                <RenderSwitch.Case value={true}>
                  <Tooltip role="label">
                    <Tooltip.Trigger asChild={false}>
                      {/* NOTE: [fcl] Checkbox accepts innerRef and cannot be cloned with a simple ref. Needs an update */}
                      <Checkbox
                        checked={checked}
                        disabled={node.state.disabled}
                        id={`switch-${fieldName}-${node.id}`}
                        name={`${fieldName}.${node.id}`}
                        variant="switch"
                        onChange={onSwitchChange}
                      />
                    </Tooltip.Trigger>
                    <Tooltip.Content data-font-style="normal" data-layout="flex">
                      {node.metadata.tooltip}
                    </Tooltip.Content>
                  </Tooltip>
                </RenderSwitch.Case>
              </RenderSwitch>
            </RenderSwitch.Case>
          </RenderSwitch>
          {renderActions && renderActions({ node, expanded, checked, readOnly, isListed })}
        </Block>
      </Block>
      {expanded && !isListed && renderSubtree()}
    </>
  );
}

TreeNode.propTypes = {
  node: PropTypes.object.isRequired,
  fieldName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["treeitem", "listitem"]),
  renderActions: PropTypes.func,
  readOnly: PropTypes.bool,
};

TreeNode.defaultProps = {
  type: "treeitem",
  renderActions: undefined,
  readOnly: false,
};
