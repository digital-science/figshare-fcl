# Figshare Components Library (FCL)

[![][node]][node-url]
[![][storybook]][storybook-url]
[![][react]][react-url]
[![][ui]][ui-url]


## Contents
* [About](#about)
* [Usage](#usage)
  * [Installation](#installation)
  * [Importing and using components](#importing-and-using-components)
  * [Documentation](#documentation)


## About
`fcl` is an open source library for some of the React UI components used across the web interface of the Figshare research repository.


## Usage

### Installation

The package is provided through the GitHub packages registry; in order to be able to install it you will need to add the registry for the `@figshare` scope to your `.npmrc` file, for example:

```
@figshare:registry=https://npm.pkg.github.com/
```

You can now install the components package to your project's `node_modules`:
```
npm install --save @digital-science/figshare-fcl
```

The sources are provided as is, and the components need to be passed through your projects `build/transpilation pipeline` as a transpiled distribution is not provided.

If you're using Webpack, you can configure your Babel loader rules to `include node_modules/@figshare` in the transpilation process. Our components are provided as class components with `es6` class features such as `statics` and `class properties`, so you may need to allow these features in your `babelrc` file. See `@babel/proposal-class-properties`.

Stylesheets are imported using `css-modules` so you might have to configure your pipeline to support them. The library exposes rules and variables through the `index.css` file available in `@digital-science/figshare-fcl/styles/`. Import it in your project entry point:

```
import "@digital-science/figshare-fcl/styles/index.css"
```

We recommend setting a custom `css-module` name generation rule for class names defined for files inside `node_modules/@digital-science/figshare-fcl` to `fcl-[name]-[local]`:

```js
// webpack loader example:
{
    test: "**/@digital-science/figshare-fcl/**.css"
    use: [{
    loader: "css-loader",
    options: {
        importLoaders: 1,
        modules: {
            localIdentName: "fcl-[name]-[local]" 
        },
        sourceMap: true,
    },
    }]
```

This will allow you to easily reference and target FCL component `classnames` in your stylesheets and add custom style and layout rules as required, without having to provide `className` to exported components.


### Importing and using components
To use components simply import them from the package. You can find examples in the stories folder or on the documentation site (see below).

```jsx
import { Button, IconButton } "@digital-science/figshare-fcl/button"
import Calendar "@digital-science/figshare-fcl/icons/calendar";

// render
<Button onClick={...}>A Button</Button>
<IconButton icon={Calendar} onClick={...}>An Icon Button</IconButton>
```

### Documentation

Each component is documented and showcased using `storybook`. To build the documentation locally, you can follow these steps:
- clone or fork this repo
- install dev dependencies: `npm install`
- build stories in watch mode: `npm run storybook`

After the build is finished, the documentation will be available at [http://localhost:9001](http://localhost:9001).

You can also build a static version of the documentation and serve it later by running: `npm run storybook:build`


[node]: https://img.shields.io/badge/node-12.x.x-darkorange?logo=node.js "node"
[node-url]: https://nodejs.org/en/

[react]: https://img.shields.io/badge/react-16.x.x-darkorange?logo=react "react"
[react-url]: https://reactjs.org/

[storybook]: https://img.shields.io/badge/storybook-6.x.x-darkgreen?logo=storybook "storybook"
[storybook-url]: https://storybook.js.org/

[ui]: https://img.shields.io/badge/-%40figshare%2Ffcl-blue?logo=npm "@digital-science/figshare-fcl"
[ui-url]: https://github.com/digital-science/figshare-fcl/packages/1
