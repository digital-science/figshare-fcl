/* eslint-disable eqeqeq */
import { getIn } from "../../utils/getIn";
import compact from "../../utils/compact";


type DatasetItem = {
  id: string;
  name: string;
  path: string;
  [key: string]: unknown;
};

type StructureTreeDataOptions = {
  dataset?: DatasetItem[];
  checkedIds?: string[];
  openLevel?: number;
};


export function structureTreeData({ dataset = [], checkedIds = [], openLevel = 0 }: StructureTreeDataOptions = {}) {
  const tree = { children: [], path: "", length: dataset.length, nodes: {}, level: 0, state: { expanded: true, checked: false } };

  dataset.forEach((datum) => {
    const { path } = datum;

    const split = compact(path.split("/"), compact.filters.falsy);

    split.reduce((at: any, part: string, partIndex: number, partList: string[]) => {
      let branch = getIn(at?.nodes, [part]);

      const isAtNode = datum.id == part;

      if (!branch) {
        const branchLevel = partList.length - 1;

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

        (tree as any).nodes[branch.id] = branch;
      }

      if (isAtNode) {
        branch.node = datum;
        branch.path = datum.path;
        branch.datum = datum;
      }

      return branch;
    }, tree);
  });

  return tree;
}
