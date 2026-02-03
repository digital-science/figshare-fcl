#!/usr/bin/env node
/* eslint-disable no-console, react/forbid-foreign-prop-types */
/**
 * Storybook Documentation Generator for FCL
 *
 * Analyzes a React component's PropTypes and internal logic to automatically
 * generate a comprehensive .stories.mdx file with:
 *   - Live interactive demo Story
 *   - Auto-detected state examples (loading, error, disabled, etc.)
 *   - Variant galleries for oneOf props (theme, size, variant)
 *   - Props table (ArgsTable)
 *   - Realistic mock data
 *
 * Usage:
 *   node scripts/generate-story.js packages/ui/button/button/index.jsx
 *   node scripts/generate-story.js --dry-run packages/ui/alerts/alerts.jsx
 *   node scripts/generate-story.js --title="UI/Custom/Name" packages/ui/component/index.jsx
 *   node scripts/generate-story.js --output=stories/custom packages/ui/component/index.jsx
 */

"use strict";

const fs = require("fs");
const path = require("path");

// ─────────────────────────────────────────────────────────────────────────────
//  Config
// ─────────────────────────────────────────────────────────────────────────────

const PKG_NAME = "@digital-science/figshare-fcl";
const ROOT_DIR = path.resolve(__dirname, "..");
const PACKAGES_UI = path.join(ROOT_DIR, "packages", "ui");
const STORIES_DIR = path.join(ROOT_DIR, "stories");

// ─────────────────────────────────────────────────────────────────────────────
//  AST helpers
// ─────────────────────────────────────────────────────────────────────────────

const SKIP_KEYS = new Set(["start", "end", "loc", "range", "extra", "comments", "tokens"]);

function walkAST(node, visitors) {
  if (!node || typeof node !== "object") {
    return;
  }
  if (node.type && visitors[node.type]) {
    visitors[node.type](node);
  }
  for (const key of Object.keys(node)) {
    if (SKIP_KEYS.has(key)) {
      continue;
    }
    const child = node[key];
    if (Array.isArray(child)) {
      for (const item of child) {
        if (item && typeof item === "object" && item.type) {
          walkAST(item, visitors);
        }
      }
    } else if (child && typeof child === "object" && child.type) {
      walkAST(child, visitors);
    }
  }
}

/** Extract human-readable text from leading JSDoc comments on a node. */
function extractComment(node) {
  const comments = node.leadingComments || [];

  return comments.
    filter((c) => c.type === "CommentBlock").
    map((c) =>
      c.value.
        split("\n").
        map((line) => line.replace(/^\s*\*+\s?/, "").trim()).
        filter(Boolean).
        join(" ")
    ).
    join(" ").
    trim();
}

/**
 * Convert a PropTypes AST node into a plain info object.
 * Returns: { type, required, values }
 * where type is a string like 'string', 'bool', 'oneOf', etc.
 */
function extractPropType(node) {
  if (!node) {
    return { type: "unknown", required: false, values: null };
  }

  switch (node.type) {
    case "Identifier": {
      if (node.name === "isRequired") {
        return { type: "unknown", required: true, values: null };
      }

      return { type: node.name, required: false, values: null };
    }

    case "MemberExpression": {
      const propName = node.property.name;
      if (propName === "isRequired") {
        const inner = extractPropType(node.object);

        return { ...inner, required: true };
      }

      return { type: propName, required: false, values: null };
    }

    case "CallExpression": {
      const { callee, arguments: args } = node;
      let fnName = null;
      if (callee.type === "Identifier") {
        fnName = callee.name;
      } else if (callee.type === "MemberExpression") {
        fnName = callee.property.name;
      }

      if (fnName === "oneOf") {
        const arg = args[0];
        let values = null;
        if (arg?.type === "ArrayExpression") {
          values = arg.elements.
            filter((e) => e && ["StringLiteral", "NumericLiteral", "BooleanLiteral"].includes(e.type)).
            map((e) => String(e.value));
        }

        return { type: "oneOf", required: false, values };
      }
      if (fnName === "shape") {
        return { type: "shape", required: false, values: null };
      }
      if (fnName === "oneOfType") {
        return { type: "oneOfType", required: false, values: null };
      }
      if (fnName === "arrayOf") {
        return { type: "arrayOf", required: false, values: null };
      }
      if (fnName === "instanceOf") {
        return { type: "instanceOf", required: false, values: null };
      }

      return { type: fnName || "unknown", required: false, values: null };
    }

    default:
      return { type: "unknown", required: false, values: null };
  }
}

/**
 * Like extractPropType but resolves Object.keys(localVarName) references.
 */
function extractPropTypeResolved(node, localVars) {
  if (!node) {
    return { type: "unknown", required: false, values: null };
  }

  // PropTypes.oneOf(Object.keys(varName)) or oneOf(Object.keys(varName))
  if (node.type === "CallExpression") {
    const { callee, arguments: args } = node;
    let fnName = null;
    if (callee.type === "Identifier") {
      fnName = callee.name;
    } else if (callee.type === "MemberExpression") {
      fnName = callee.property.name;
    }

    if (fnName === "oneOf" && args[0]?.type === "CallExpression") {
      const inner = args[0];
      if (
        inner.callee?.type === "MemberExpression" &&
        inner.callee.object?.name === "Object" &&
        inner.callee.property?.name === "keys" &&
        inner.arguments[0]?.type === "Identifier"
      ) {
        const varName = inner.arguments[0].name;
        const values = localVars[varName] || null;

        return { type: "oneOf", required: false, values };
      }
    }
  }

  // Handle .isRequired wrapping
  if (node.type === "MemberExpression" && node.property?.name === "isRequired") {
    const inner = extractPropTypeResolved(node.object, localVars);

    return { ...inner, required: true };
  }

  return extractPropType(node);
}

/** Serialize an AST literal/expression node to a JS value string. */
function serializeDefaultValue(node) {
  if (!node) {
    return undefined;
  }
  switch (node.type) {
    case "StringLiteral": return `"${node.value}"`;
    case "NumericLiteral": return String(node.value);
    case "BooleanLiteral": return String(node.value);
    case "NullLiteral": return "null";
    case "Identifier":
      if (node.name === "undefined") {
        return "undefined";
      }
      if (node.name === "null") {
        return "null";
      }

      return node.name;
    case "ArrowFunctionExpression":
    case "FunctionExpression": return "() => {}";
    case "ArrayExpression": return "[]";
    case "ObjectExpression": return "{}";
    default: return undefined;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  Component parsing
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Parse a component JSX file and return:
 *   { name, propTypes: [{ name, type, required, values, defaultValue, description }], isControlled }
 */
function parseComponent(filePath) {
  const source = fs.readFileSync(filePath, "utf8");

  let parser = null;
  try {
    parser = require(path.join(ROOT_DIR, "node_modules/@babel/parser"));
  } catch {
    console.error("Error: @babel/parser not found in node_modules.");
    process.exit(1);
  }

  const ast = parser.parse(source, {
    sourceType: "module",
    plugins: ["jsx", "classProperties", "importMeta"],
    attachComment: true,
  });

  const info = { name: null, propTypes: [], defaultProps: {}, isControlled: false, isDefaultExport: false };
  // { varName: string[] } for Object.keys() resolution
  const localVars = {};

  // ── Pass 1: collect const obj = { key: ... } at module scope ──────────────
  walkAST(ast, {
    VariableDeclarator(node) {
      if (
        node.id?.type === "Identifier" &&
        node.init?.type === "ObjectExpression"
      ) {
        const keys = node.init.properties.
          map((p) => {
            if (p.type !== "ObjectProperty") {
              return null;
            }
            if (p.key.type === "Identifier") {
              return p.key.name;
            }
            if (p.key.type === "StringLiteral") {
              return p.key.value;
            }

            return null;
          }).
          filter(Boolean);
        localVars[node.id.name] = keys;
      }
    },
  });

  function extractProps(objNode) {
    return objNode.properties.
      filter((p) => p.type === "ObjectProperty").
      map((p) => {
        const name = p.key.name || p.key.value;
        const typeInfo = extractPropTypeResolved(p.value, localVars);
        const description = extractComment(p);

        return { name, ...typeInfo, description };
      });
  }

  function extractDefaults(objNode) {
    const out = {};
    for (const p of objNode.properties) {
      if (p.type !== "ObjectProperty") {
        continue;
      }
      const name = p.key.name || p.key.value;
      out[name] = serializeDefaultValue(p.value);
    }

    return out;
  }

  function processClassBody(classBody) {
    if (!classBody?.body) {
      return;
    }
    for (const member of classBody.body) {
      if (member.type !== "ClassProperty" || !member.static) {
        continue;
      }
      if (member.key?.name === "propTypes" && member.value?.type === "ObjectExpression") {
        info.propTypes = extractProps(member.value);
      }
      if (member.key?.name === "defaultProps" && member.value?.type === "ObjectExpression") {
        info.defaultProps = extractDefaults(member.value);
      }
    }
  }

  // ── Pass 2: extract component info ────────────────────────────────────────
  walkAST(ast, {
    ClassDeclaration(node) {
      if (!info.name && node.id) {
        info.name = node.id.name;
      }
      processClassBody(node.body);
    },
    ClassExpression(node) {
      if (!info.name && node.id) {
        info.name = node.id.name;
      }
      processClassBody(node.body);
    },
    ExportDefaultDeclaration(node) {
      info.isDefaultExport = true;
      if (node.declaration?.type === "ClassDeclaration" && node.declaration.id) {
        info.name = node.declaration.id.name;
      }
      if (node.declaration?.type === "FunctionDeclaration" && node.declaration.id) {
        info.name = node.declaration.id.name;
      }
      // export default someIdentifier (e.g. export default exported)
      if (node.declaration?.type === "Identifier") {
        info.isDefaultExport = true;
      }
    },
    ExportNamedDeclaration(node) {
      // export class Foo or export function Foo
      const decl = node.declaration;
      if (
        decl &&
        (decl.type === "ClassDeclaration" || decl.type === "FunctionDeclaration") &&
        decl.id
      ) {
        if (!info.name) {
          info.name = decl.id.name;
        }
        // isDefaultExport stays false — this is a named export
      }
    },
    AssignmentExpression(node) {
      if (
        node.operator === "=" &&
        node.left?.type === "MemberExpression" &&
        node.right?.type === "ObjectExpression"
      ) {
        const propName = node.left.property?.name;
        if (propName === "propTypes") {
          if (!info.name) {
            info.name = node.left.object?.name || null;
          }
          info.propTypes = extractProps(node.right);
        }
        if (propName === "defaultProps") {
          info.defaultProps = extractDefaults(node.right);
        }
      }
    },
  });

  // Merge defaults into propTypes
  for (const prop of info.propTypes) {
    if (prop.name in info.defaultProps) {
      prop.defaultValue = info.defaultProps[prop.name];
    }
  }

  // Detect controlled component
  const hasValueLike = info.propTypes.some((p) => ["value", "checked"].includes(p.name));
  const hasOnChange = info.propTypes.some((p) => p.name === "onChange");
  info.isControlled = hasValueLike && hasOnChange;

  return info;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Path computation
// ─────────────────────────────────────────────────────────────────────────────

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Derive all path-related metadata from the component file's absolute path.
 */
function computePaths(absComponentPath, outputOverride, titleOverride) {
  const relFromPkgUi = path.relative(PACKAGES_UI, absComponentPath);
  // e.g. "button/button/index.jsx"  or  "select/Select.jsx"

  const segments = relFromPkgUi.split(path.sep);
  const fileName = segments[segments.length - 1];
  const isIndex = /^index\.(jsx?|tsx?)$/i.test(fileName);

  // Directory segments (without filename)
  const dirSegments = segments.slice(0, -1);

  // If the file is NOT index.*, append the stem as a segment hint
  // but avoid duplicating a segment that's already the last dir part
  const pathSegments = [...dirSegments];
  if (!isIndex) {
    const stem = fileName.replace(/\.(jsx?|tsx?)$/i, "").toLowerCase();
    const lastDir = dirSegments[dirSegments.length - 1]?.toLowerCase();
    if (stem !== lastDir) {
      pathSegments.push(stem);
    }
  }

  // Story title:  UI/Button/Button
  const title = titleOverride || ["UI", ...pathSegments.map(capitalize)].join("/");

  // Import path:  @digital-science/figshare-fcl/button/button
  const importPath = `${PKG_NAME}/${pathSegments.join("/")}`;

  // Jest path:    ui/button/button
  const jestPath = `ui/${pathSegments.join("/")}`;

  // Output file path
  const componentName = pathSegments[pathSegments.length - 1];
  let outputPath = null;
  if (outputOverride) {
    outputPath = path.resolve(ROOT_DIR, outputOverride, `${componentName}.generated.stories.mdx`);
  } else {
    outputPath = path.join(STORIES_DIR, ...pathSegments, `${componentName}.generated.stories.mdx`);
  }

  return { title, importPath, jestPath, outputPath };
}

// ─────────────────────────────────────────────────────────────────────────────
//  Mock value generation
// ─────────────────────────────────────────────────────────────────────────────

const NAMED_MOCKS = {
  id: "\"demo-component\"",
  name: "\"component-name\"",
  label: "\"Label\"",
  title: "\"Sample Title\"",
  placeholder: "\"Enter a value...\"",
  searchPlaceholder: "\"Search...\"",
  value: "\"Sample value\"",
  tooltip: "\"Helpful tooltip\"",
  message: "\"Sample message text\"",
  ariaLabel: "\"Component label\"",
};

// Realistic mock data for common array props so demos render visible content
const NAMED_ARRAY_MOCKS = {
  initialMessages: "[{ id: \"msg-1\", type: \"success\", content: \"Operation completed successfully.\" }, "
    + "{ id: \"msg-2\", type: \"error\", content: \"Something went wrong.\", title: \"Error\" }, "
    + "{ id: \"msg-3\", type: \"warning\", content: \"This action cannot be undone.\" }, "
    + "{ id: \"msg-4\", type: \"info\", content: \"Your session expires in 5 minutes.\" }]",
  messages: "[{ id: \"msg-1\", type: \"info\", content: \"Sample message.\" }]",
  items: "[{ id: \"item-1\", label: \"Item one\" }, { id: \"item-2\", label: \"Item two\" }]",
  options: "[{ value: \"opt-1\", label: \"Option one\" }, { value: \"opt-2\", label: \"Option two\" }]",
  data: "[{ id: \"1\", label: \"Data item one\" }, { id: \"2\", label: \"Data item two\" }]",
};

const SKIP_PROPS = new Set(["className", "style", "forwardedRef", "innerRef", "ref"]);

// Bool prop names handled as dedicated state blocks — excluded from generic bool examples
const KNOWN_STATE_BOOLS = new Set(["loading", "error", "disabled"]);

/**
 * Returns a JSX prop string snippet for the given prop, e.g.:
 *   'value="Sample value"'  or  'disabled={true}'
 * Returns null to omit the prop entirely.
 */
function mockPropSnippet(prop) {
  if (SKIP_PROPS.has(prop.name)) {
    return null;
  }

  // If we know a named mock, use it
  if (NAMED_MOCKS[prop.name]) {
    const val = NAMED_MOCKS[prop.name];

    return val.startsWith("\"") ? `${prop.name}=${val}` : `${prop.name}={${val}}`;
  }

  switch (prop.type) {
    case "string": return `${prop.name}="Sample ${prop.name}"`;
    case "bool": return `${prop.name}={false}`;
    case "number": return `${prop.name}={0}`;
    case "func": return `${prop.name}={() => {}}`;
    // node: use children text content instead
    case "node": return null;
    case "array":
      if (NAMED_ARRAY_MOCKS[prop.name]) {
        return `${prop.name}={${NAMED_ARRAY_MOCKS[prop.name]}}`;
      }

      return `${prop.name}={[]}`;
    case "object": return `${prop.name}={{}}`;
    // elementType: skip complex types
    case "elementType":return null;
    case "oneOf":
      if (prop.values?.length) {
        return `${prop.name}="${prop.values[0]}"`;
      }

      return null;
    case "oneOfType": return null;
    case "shape": return `${prop.name}={{}}`;
    default: return null;
  }
}

/** Build the props string for a demo component instance. */
function buildPropsString(props, overrides = {}, indent = "  ") {
  const lines = [];

  for (const prop of props) {
    if (prop.name in overrides) {
      const v = overrides[prop.name];
      if (v !== null) {
        lines.push(`${indent}${prop.name}=${v.startsWith("\"") ? v : `{${v}}`}`);
      }
      continue;
    }

    if (!prop.required && !["id", "value", "checked", "onChange"].includes(prop.name)) {
      // Include array props with named mocks so the demo renders visible content
      if (prop.type === "array" && NAMED_ARRAY_MOCKS[prop.name]) {
        lines.push(`${indent}${prop.name}={${NAMED_ARRAY_MOCKS[prop.name]}}`);
      }
      continue;
    }

    const snippet = mockPropSnippet(prop);
    if (snippet) {
      lines.push(`${indent}${snippet}`);
    }
  }

  return lines.join("\n");
}

// ─────────────────────────────────────────────────────────────────────────────
//  Story generation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Determine child content to place between component tags.
 * Returns null if the component likely doesn't need children.
 */
function defaultChildren(componentInfo) {
  const childrenProp = componentInfo.propTypes.find((p) => p.name === "children");
  if (!childrenProp) {
    return null;
  }
  if (childrenProp.type === "node" || childrenProp.type === "element") {
    return `${componentInfo.name} label`;
  }

  return null;
}

function makeImportStmt(name, importPath, isDefault) {
  return isDefault ? `import ${name} from "${importPath}";` : `import { ${name} } from "${importPath}";`;
}

function renderComponentTag(name, propsStr, children, selfClose = false) {
  if (selfClose || children === null) {
    return propsStr ? `<${name}\n${propsStr}\n/>` : `<${name} />`;
  }

  return propsStr ? `<${name}\n${propsStr}\n>\n  ${children}\n</${name}>` : `<${name}>${children}</${name}>`;
}

/** Build interactive Story block (with useState for controlled components). */
function buildDefaultStory(componentInfo, paths) {
  const { name, propTypes, isControlled } = componentInfo;
  const children = defaultChildren(componentInfo);

  if (isControlled) {
    const isCheckbox = propTypes.some((p) => p.name === "checked");
    const stateVar = isCheckbox ? "checked" : "value";
    const initVal = isCheckbox ? "false" : "\"initial value\"";

    const requiredProps = propTypes.
      filter((p) => p.required && !SKIP_PROPS.has(p.name)).
      map((p) => {
        // provided via state
        if (p.name === "checked" || p.name === "value") {
          return null;
        }
        // provided via handler
        if (p.name === "onChange") {
          return null;
        }
        const snippet = mockPropSnippet(p);

        return snippet ? `      ${snippet}` : null;
      }).
      filter(Boolean).
      join("\n");

    const setter = `set${capitalize(stateVar)}`;
    const cb = `\n      const { id, checked } = event.target;\n      ${setter}(checked);`;
    const val = `\n      ${setter}(event.target.value);`;
    const handler = `    const handleChange = useCallback((event) => {${isCheckbox ? cb : val}\n    }, []);`;

    const childContent = children ? `\n      ${children}\n    ` : "";
    const extraProps = requiredProps ? `\n${requiredProps}` : "";

    return `
<Story
  name="${name}"
  parameters={{
    layout: "centered",
    jest: ["${paths.jestPath}"],
  }}
>{() => {
    const [${stateVar}, set${capitalize(stateVar)}] = useState(${initVal});
${handler}
    return (
      <${name}
        ${stateVar}={${stateVar}}
        onChange={handleChange}${extraProps}
      >${childContent}</${name}>
    );
  }}
</Story>`.trim();
  }

  // Non-controlled component
  const propsStr = buildPropsString(propTypes, {}, "  ");
  const tag = renderComponentTag(name, propsStr, children);

  return `
<Story
  name="${name}"
  parameters={{
    layout: "centered",
    jest: ["${paths.jestPath}"],
  }}
>
  ${tag}
</Story>`.trim();
}

/** Detect noteworthy state prop groups from the prop list. */
function detectStates(propTypes) {
  const byName = Object.fromEntries(propTypes.map((p) => [p.name, p]));

  // All bool props not already covered by dedicated state blocks
  const generalBoolProps = propTypes.filter(
    (p) => p.type === "bool" && !KNOWN_STATE_BOOLS.has(p.name) && !SKIP_PROPS.has(p.name)
  );

  let themeKey = null;
  if (byName.theme) {
    themeKey = "theme";
  } else if (byName.variant) {
    themeKey = "variant";
  }

  return {
    hasLoading: !!(byName.loading?.type === "bool"),
    hasError: !!(byName.error?.type === "bool" || byName.loadingErrorMessage || byName.errorMessage),
    hasDisabled: !!(byName.disabled?.type === "bool"),
    sizeEnum: byName.size?.type === "oneOf" ? byName.size.values : null,
    themeEnum: (byName.theme || byName.variant)?.type === "oneOf" ? (byName.theme || byName.variant).values : null,
    themeKey,
    generalBoolProps,
  };
}

/** Convert a camelCase bool prop name to a readable example heading. */
function boolPropHeading(propName) {
  const withoutPrefix = propName.replace(/^(?:is|has|show|hide|no)([A-Z])/, (_, firstChar) => firstChar);
  const spaced = withoutPrefix.replace(/([A-Z])/g, " $1").trim();
  const label = spaced.charAt(0).toUpperCase() + spaced.slice(1);
  if (/^(no|hide)/.test(propName)) {
    return `Without ${label}`;
  }

  return label;
}

/** Render one simple Canvas example with a heading. */
function buildCanvasBlock(heading, innerContent) {
  return `### ${heading}\n\n<Canvas>\n${innerContent}\n</Canvas>`;
}

/** Build all Canvas example blocks (states + variant galleries). */
function buildExamples(componentInfo) {
  const { name, propTypes } = componentInfo;
  const states = detectStates(propTypes);
  const children = defaultChildren(componentInfo);

  // Required props for base examples (no optional)
  const requiredProps = propTypes.
    filter((p) => p.required && !SKIP_PROPS.has(p.name) && p.name !== "children").
    map((p) => mockPropSnippet(p)).
    filter(Boolean).
    map((s) => `    ${s}`).
    join("\n");

  // Array props with named mocks — included so examples render visible content
  const arrayMockLines = propTypes.
    filter((p) => p.type === "array" && NAMED_ARRAY_MOCKS[p.name]).
    map((p) => `    ${p.name}={${NAMED_ARRAY_MOCKS[p.name]}}`).
    join("\n");

  function baseTag(overrides = {}, label = null) {
    const childText = label || children;
    const overrideLines = Object.entries(overrides).
      map(([k, v]) => `    ${k}=${v.startsWith("\"") ? v : `{${v}}`}`).
      join("\n");

    const inner = [requiredProps, arrayMockLines, overrideLines].filter(Boolean).join("\n");

    if (!inner && !childText) {
      return `  <${name} />`;
    }
    if (!inner) {
      return `  <${name}>${childText}</${name}>`;
    }
    if (childText) {
      return `  <${name}\n${inner}\n  >\n    ${childText}\n  </${name}>`;
    }

    return `  <${name}\n${inner}\n  />`;
  }

  const blocks = [];

  // Always show "Default" first when the component has array mock data (otherwise the demo is empty)
  if (arrayMockLines) {
    blocks.push(buildCanvasBlock("Default", baseTag()));
  }

  if (states.hasLoading) {
    blocks.push(buildCanvasBlock("Loading state", baseTag({ loading: "true" })));
  }

  if (states.hasError) {
    let errorOverride = { errorMessage: "\"An error occurred.\"" };
    if (propTypes.find((p) => p.name === "error")) {
      errorOverride = { error: "true" };
    } else if (propTypes.find((p) => p.name === "loadingErrorMessage")) {
      errorOverride = { loadingErrorMessage: "\"Something went wrong. Please try again.\"" };
    }
    blocks.push(buildCanvasBlock("Error state", baseTag(errorOverride)));
  }

  if (states.hasDisabled) {
    blocks.push(buildCanvasBlock("Disabled state", baseTag({ disabled: "true" }, children)));
  }

  if (states.sizeEnum?.length) {
    const tags = states.sizeEnum.
      map((s) => baseTag({ size: `"${s}"` }, children ? `${children} (${s})` : null)).
      join("\n");
    const sizeStyle = "{{ display: \"flex\", gap: \"8px\", alignItems: \"center\" }}";
    blocks.push(buildCanvasBlock("Sizes", `  <div style=${sizeStyle}>\n${tags}\n  </div>`));
  }

  if (states.themeEnum?.length && states.themeKey) {
    const tags = states.themeEnum.
      map((t) => baseTag({ [states.themeKey]: `"${t}"` }, children ? `${capitalize(t)}` : null)).
      join("\n");
    const themeStyle = "{{ display: \"flex\", flexWrap: \"wrap\", gap: \"8px\" }}";
    const heading = `${capitalize(states.themeKey)} variants`;
    blocks.push(buildCanvasBlock(heading, `  <div style=${themeStyle}>\n${tags}\n  </div>`));
  }

  // Generate a Canvas block for each boolean prop not already covered above
  for (const prop of states.generalBoolProps) {
    blocks.push(buildCanvasBlock(boolPropHeading(prop.name), baseTag({ [prop.name]: "true" })));
  }

  if (!blocks.length) {
    // Fallback: show the component in its default state
    blocks.push(buildCanvasBlock("Default", baseTag({}, children)));
  }

  return blocks.join("\n\n");
}

/** Generate a plain description for the component based on its name and props. */
function generateDescription(componentInfo) {
  const { name, propTypes } = componentInfo;
  const states = detectStates(propTypes);

  let desc = `The \`${name}\` component`;

  const features = [];
  if (states.themeEnum?.length) {
    features.push(`supports multiple ${states.themeKey} variations`);
  }
  if (states.sizeEnum?.length) {
    features.push(`comes in ${states.sizeEnum.join(", ")} sizes`);
  }
  if (states.hasLoading) {
    features.push("handles loading state");
  }
  if (states.hasError) {
    features.push("displays error feedback");
  }
  if (states.hasDisabled) {
    features.push("can be disabled");
  }
  if (componentInfo.isControlled) {
    features.push("is a controlled component");
  }
  if (states.generalBoolProps.length) {
    const modeNames = states.generalBoolProps.map((p) => `\`${p.name}\``).join(", ");
    features.push(`supports ${modeNames} modes`);
  }

  if (features.length) {
    desc += ` — ${features.join(", ")}.`;
  } else {
    desc += ".";
  }

  return desc;
}

/** Build an import example code block. */
function buildImportExample(componentInfo, paths) {
  const { name, propTypes, isDefaultExport } = componentInfo;
  const hasChildren = propTypes.some((p) => p.name === "children");

  const requiredNonChildren = propTypes.
    filter((p) => p.required && p.name !== "children" && !SKIP_PROPS.has(p.name)).
    map((p) => `  ${mockPropSnippet(p) || `${p.name}={/* required */}`}`).
    join("\n");

  const inner = hasChildren ? "\n  Content\n" : "";

  let tag = `<${name} />`;
  if (requiredNonChildren) {
    tag = `<${name}\n${requiredNonChildren}\n>${inner}</${name}>`;
  } else if (inner) {
    tag = `<${name}>${inner}</${name}>`;
  }

  const importLine = makeImportStmt(name, paths.importPath, isDefaultExport);

  return `Can be imported from:

\`\`\`jsx
${importLine}

${tag}
\`\`\``;
}

/** Top-level story file generator. */
function generateStory(componentInfo, paths) {
  const { name, isControlled, isDefaultExport } = componentInfo;

  // Determine if we need React hook imports
  const needsHooks = isControlled;
  const hooksImport = needsHooks ? "import { useState, useCallback } from 'react';\n" : "";

  // Build import statement based on export style
  const importStatement = makeImportStmt(name, paths.importPath, isDefaultExport);

  const description = generateDescription(componentInfo);
  const defaultStory = buildDefaultStory(componentInfo, paths);
  const importExample = buildImportExample(componentInfo, paths);
  const examples = buildExamples(componentInfo);

  return `${hooksImport}import { Meta, Story, Canvas, ArgsTable } from '@storybook/addon-docs/blocks';
${importStatement}

<Meta
  title="${paths.title}"
  component={${name}}
  parameters={{
    viewMode: 'docs',
    previewTabs: {
      canvas: { hidden: true }
    },
  }}
/>

# ${name}
---

- [Overview](#overview)
- [Props](#props-table)
- [Examples](#examples)

## Overview

${description}

${defaultStory}

${importExample}

## Props Table
<ArgsTable of={${name}} />

## Examples

${examples}
`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Entry point
// ─────────────────────────────────────────────────────────────────────────────

function main() {
  const rawArgs = process.argv.slice(2);

  if (!rawArgs.length || rawArgs.includes("--help") || rawArgs.includes("-h")) {
    console.log(`
Storybook Documentation Generator

Usage:
  node scripts/generate-story.js [options] <component-path>

Options:
  --dry-run          Print generated story to stdout without writing a file
  --force            Overwrite an existing generated story file
  --title=<value>    Override the story title (default: derived from path)
  --output=<dir>     Write to a custom output directory
  --help             Show this help

Examples:
  node scripts/generate-story.js packages/ui/button/button/index.jsx
  node scripts/generate-story.js --dry-run packages/ui/input/checkbox/index.jsx
  node scripts/generate-story.js --title="UI/Overlay/Modal" packages/ui/overlay/index.jsx
`.trim());
    process.exit(0);
  }

  const dryRun = rawArgs.includes("--dry-run");
  const force = rawArgs.includes("--force");
  const outputOverride = rawArgs.find((a) => a.startsWith("--output="))?.slice("--output=".length);
  const titleOverride = rawArgs.find((a) => a.startsWith("--title="))?.slice("--title=".length);
  const componentArg = rawArgs.find((a) => !a.startsWith("--"));

  if (!componentArg) {
    console.error("Error: No component path provided. Run with --help for usage.");
    process.exit(1);
  }

  const absComponentPath = path.resolve(ROOT_DIR, componentArg);
  if (!fs.existsSync(absComponentPath)) {
    console.error(`Error: File not found — ${absComponentPath}`);
    process.exit(1);
  }

  console.log(`Analyzing: ${path.relative(ROOT_DIR, absComponentPath)}`);

  const componentInfo = parseComponent(absComponentPath);

  if (!componentInfo.name) {
    console.error(
      "Error: Could not determine component name from the file. " +
      "Ensure it exports a named class or function with propTypes defined."
    );
    process.exit(1);
  }

  if (!componentInfo.propTypes.length) {
    console.warn("Warning: No propTypes found. The generated story will have limited prop coverage.");
  }

  const paths = computePaths(absComponentPath, outputOverride, titleOverride);

  console.log(`Component : ${componentInfo.name}`);
  console.log(`Props     : ${componentInfo.propTypes.length} found`);
  console.log(`Controlled: ${componentInfo.isControlled}`);
  console.log(`Story title: ${paths.title}`);

  const storyContent = generateStory(componentInfo, paths);

  if (dryRun) {
    console.log(`\n${"─".repeat(72)}`);
    console.log(`Output path (not written): ${paths.outputPath}`);
    console.log(`${"─".repeat(72)}\n`);
    console.log(storyContent);

    return;
  }

  // Check if story already exists
  if (fs.existsSync(paths.outputPath) && !force) {
    console.warn(`Warning: Story already exists at ${paths.outputPath}`);
    console.warn("Use --force to overwrite, or --dry-run to preview.");
    process.exit(1);
  }

  fs.mkdirSync(path.dirname(paths.outputPath), { recursive: true });
  fs.writeFileSync(paths.outputPath, storyContent, "utf8");
  console.log(`\nGenerated: ${path.relative(ROOT_DIR, paths.outputPath)}`);
}

main();
