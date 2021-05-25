# Post to Instagram

Post images to Instagram via a simple function. That's it.

> This package uses a headless chromium which means it can't run on the client.

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

We are three friends hosting a german podcast - [Techmob Show](https://techmob.show) - where we talk about all the nerd stuff we find interesting. Sometimes talking isn't enough and for that we have to code. All the stuff which automates things for us or was an idea in the podcast will be published under the Techmob Show organization ([GitHub](https://github.com/orgs/Techmob-Show), [npm](https://www.npmjs.com/org/techmobshow), [Docker Hub](https://hub.docker.com/u/techmobshow)).

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

- [ ] Write tests