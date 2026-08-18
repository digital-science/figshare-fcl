function getPiece(node, parent) {
  let local = `${node.tagName.toLowerCase()}`;

  if (node.id && node.id !== "") {
    return `#${node.id}`;
  }

  if (parent) {
    const { children } = parent;

    if (children.length > 1) {
      let nth = 0;

      for (let i = 0; i < children.length; i += 1) {
        const sibling = children[i];

        if (sibling === node) {
          nth += 1;
          break;
        } else if (sibling.nodeName === node.nodeName) {
          nth += 1;
        }
      }

      if (nth > 1) {
        local = `${local}:nth-of-type(${nth})`;
      }
    }
  }

  return local;
}

export function getDOMPath(el) {
  let path = "";

  try {
    let cursor = el;
    path = getPiece(cursor, cursor?.parentNode);

    // if the node had an id, assume it's unique and return it.
    if (path.includes("#")) {
      return path;
    }

    while (cursor.parentNode) {
      cursor = cursor.parentNode;

      if (cursor.tagName === "HTML") {
        break;
      }

      path = `${getPiece(cursor, cursor?.parentNode)} > ${path}`;
    }
  } catch (e) {
    return "";
  }

  return path;
}

export default getDOMPath;
