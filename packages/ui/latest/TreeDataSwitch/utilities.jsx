/* eslint-disable eqeqeq */
import { getIn } from "../../utils/getIn";
import compact from "../../utils/compact";


/**
 * Function to parse lists of data with path and parentId values into a tree structure
 * paths must be delimited by "/"
 * parentId must be the id of the direct parent node
 * the tree structure will include checked state and open state for each node
 * and the initial checked ids can be provided as well as the open level (all nodes up to this level will be open)
 */
export function structureTreeData({ dataset = [], checkedIds = [], openLevel = 0 }) {
  const tree = { children: [], path: "", length: dataset.length, nodes: {}, level: 0, state: { expanded: true, checked: false } };

  dataset.forEach((datum) => {
    const { path } = datum;

    const split = compact(path.split("/"), compact.filters.falsy);

    split.reduce((at, part, partIndex, partList) => {
      let branch = getIn(at?.nodes, [part]);

      const isAtNode = datum.id == part;

      if (!branch) {
        const branchLevel = partList.length - 1;

        // create a tree branch for this path
        // node will be assigned later
        branch = {
          id: part,
          node: null,
          children: [],
          nodes: {},
          level: branchLevel,
          state: {
            expanded: openLevel >= branchLevel,
            checked: checkedIds.some((id) => id == part),
          },
          metadata: {},
        };

        at.nodes[part] = branch;
        at.children.push(part);

        // add to global node list for easy access
        tree.nodes[branch.id] = branch;
      }

      // handle out of order deeply nested nodes
      // if the node was traversed in the list later from when it was created in the tree
      // this should eventually reach it and assign it.
      if (isAtNode) {
        branch.node = datum;
        branch.path = datum.path;
        branch.datum = datum;
      }

      // move on to the next path piece
      return branch;
    }, tree);
  });

  return tree;
}
