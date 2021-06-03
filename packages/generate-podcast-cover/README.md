# Generate podcast cover

[![npm](https://img.shields.io/npm/v/@techmobshow/generate-podcast-cover)](https://www.npmjs.com/package/@techmobshow/generate-podcast-cover) [![npm bundle size](https://img.shields.io/bundlephobia/min/@techmobshow/generate-podcast-cover)](https://www.npmjs.com/package/@techmobshow/generate-podcast-cover) [![GitHub](https://img.shields.io/npm/l/@techmobshow/generate-podcast-cover)](https://github.com/Techmob-Show/automation/tree/main/packages/post-to-instagram)

Generate images based on information from a podcast episode. In the future it will be possible to customize the appearance even more.

## Install

```bash
npm install @techmobshow/generate-podcast-cover
yarn add @techmobshow/generate-podcast-cover
```

## About

The package is written in [Typescript](https://github.com/microsoft/TypeScript) and uses [node-canvas](https://github.com/Automattic/node-canvas) under the hood. It generates a jpeg base on a template image.

### Why?

We need auto generated podcast covers for Instagram! 

Moreover, we believe that such a simple package to generate podcast covers via Node can be helpful for others.

### Who is techmobshow?

Checkout the [root README](https://github.com/Techmob-Show/automation).


## Example

```js
TBD
```

See real world example in [update-website-and-instagram](https://github.com/Techmob-Show/automation/blob/main/tasks/update-website-and-instagram/src/index.ts)

## Parameters

- title*: string
    - will be converted to uppercase
- description*: string
    - the main description of the post
- tags*: string
    - only exists to separate them
- path: string
    - this has to be a .jpg/.jpeg file otherwise it can't be uploaded to Instagram
- options: { email: string; password: string; }
    - user credentials are needed to login

*these are combined to one string

## Todos
