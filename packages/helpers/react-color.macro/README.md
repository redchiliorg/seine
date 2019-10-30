# react-color.macro

A macro for [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros)
that helps to reduce bundle size caused by named components imports
from [react-color](https://github.com/casesandberg/react-color).

## Problem

[react-color](https://github.com/casesandberg/react-color) is a
collection of nice looking color picker components. But being bundled
as a commonjs only library it can't be fully optimized by tools like
[rollup](https://rollupjs.org/), which one, for an instance,
mainly optimized for bundling es6 modules.
As a result, importing of color pickers to es6 modules
causes an inclusion of all exported components code in final bundle.

## Installation

This module is distributed via [npm](https://www.npmjs.com)
which is bundled with [node](https://nodejs.org/)
and should be installed as one of your project's devDependencies

```bash
npm install --save-dev react-color.macro
```

## Usage

Instead of importing picker components from react-color

```js
import { SketchPicker } from 'react-color';

export default () => <SketchPicker />;
```

use this macro as import source

```js
import { SketchPicker } from 'react-color.macro';

export default () => <SketchPicker />;
```

## Other solutions

### Default imports

The same effect can be achieved by importing default component from
a module in `lib/*`:

```js
import SketchPicker from 'react-color/lib/Sketch';

export default () => <SketchPicker />;
```

increasing amount of import specifier declarations needed for each
imported identifier.

### Babel transform plugins

In case 
[babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros)
is not an option,
you can use babel plugins that helps to transform import specifiers in
common way:
[babel-plugin-transform-imports](https://bitbucket.org/amctheatres/babel-transform-imports),
[babel-plugin-imports](https://bitbucket.org/amctheatres/babel-transform-imports)
