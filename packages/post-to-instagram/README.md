# Post to Instagram

[![npm](https://img.shields.io/npm/v/@techmobshow/post-to-instagram)](https://www.npmjs.com/package/@techmobshow/post-to-instagram) [![npm bundle size](https://img.shields.io/bundlephobia/min/@techmobshow/post-to-instagram)](https://www.npmjs.com/package/@techmobshow/post-to-instagram) [![GitHub](https://img.shields.io/npm/l/@techmobshow/post-to-instagram)](https://github.com/Techmob-Show/automation/tree/main/packages/post-to-instagram)

Post images to Instagram via a simple function. That's it.

> This package uses a headless chromium which means it can't run on the client.

## Install

```
npm install @techmobshow/post-to-instagram
yarn add @techmobshow/post-to-instagram
```

## About

The package is written in [Typescript](https://github.com/microsoft/TypeScript) and uses [Playwright](https://github.com/microsoft/playwright) under the hood. It automates actions to upload an image on Instagram by imitating a user. 

### Why?

We didn't get access to the Instagram API, they told us `build a quality product`. If this isn't a quality product what else would be one?

Moreover, we believe that such a simple package to automate Instagram via Node can be helpful for others.

### Who is techmobshow?

Checkout the [root README](https://github.com/Techmob-Show/automation).


## Example

```js
const { postToInstagram } = require('@techmobshow/post-to-instagram')

const title = 'New Techmob Show Episode'
const description = 'Have you ever thought about automating Instagram posts? Today we will tell you how you can achieve this with our awesome package'
const tags = '#techmobshow #inspiring'
const path = `${process.cwd()}/your-image.jpg` // process.cwd() returns the root of your package.json
const options = {email: 'my@email.com', password: 'SUPER_SECRET'}

postToInstagram(title, description, tags, path, options).then(() => console.log('success'))
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

- [ ] Find a good way to write tests for playwright. Idea: write tests to see if the instagram layout has changed