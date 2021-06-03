# Automation

This project combines several modules which are powerful by their own but unleash unknown forces when combined, at least for some lazy developers who have a podcast.

## Who is techmobshow?

We are three friends hosting a german podcast - [Techmob Show](https://techmob.show) - where we talk about all the nerd stuff we find interesting. Sometimes talking isn't enough and for that we have to code. All the stuff which automates things for us or was an idea in the podcast will be published under the Techmob Show organization ([GitHub](https://github.com/orgs/Techmob-Show), [npm](https://www.npmjs.com/org/techmobshow), [Docker Hub](https://hub.docker.com/u/techmobshow)).

## Structure

### Packages

- [@techmobshow/generate-podcast-cover](https://github.com/Techmob-Show/automation/tree/main/packages/generate-podcast-cover)
- [@techmobshow/new-anchorfm-episode](https://github.com/Techmob-Show/automation/tree/main/packages/new-anchorfm-episode)
- [@techmobshow/post-to-instagram](https://github.com/Techmob-Show/automation/tree/main/packages/post-to-instagram)
- [@techmobshow/types](https://github.com/Techmob-Show/automation/tree/main/packages/types)
- [@techmobshow/update-website](https://github.com/Techmob-Show/automation/tree/main/packages/update-website)

### Tasks

- [@techmobshow/update-website-and-instagram](https://github.com/Techmob-Show/automation/tree/main/tasks/update-website-and-instagram)

## Development

### Local

**Root**

```bash
yarn build # run yarn build in all packages and tasks
yarn bootstrap # https://github.com/lerna/lerna/tree/main/commands/bootstrap
yarn lint # lint everything
yarn test # test everything
yarn run publish # "run" is required as it conflicts with yarn publish, but we won't lerna publish - https://github.com/lerna/lerna/tree/main/commands/publish
```

## Links that helped during the setup of this Monorepo

- [Why Monorepo?](https://www.drmaciver.com/2016/10/why-you-should-use-a-single-repository-for-all-your-companys-projects/)
- [Why and how yarn?](https://classic.yarnpkg.com/en/docs/workspaces)
- [Lerna](https://github.com/lerna/lerna)
- [Typescript Monorepo](https://medium.com/@NiGhTTraX/how-to-set-up-a-typescript-monorepo-with-lerna-c6acda7d4559)
- [More Typescript Monorepo Action](https://medium.com/@NiGhTTraX/making-typescript-monorepos-play-nice-with-other-tools-a8d197fdc680)
- [Types in Monorepos](https://www.reddit.com/r/typescript/comments/c4jfbp/best_way_to_use_common_types_across_monorepo/)
- [Publish Monorepo](https://macwright.com/2016/07/08/lerna-npm-organizations-new-wave-modularity.html)
- [npm registry set scope](https://docs.npmjs.com/configuring-your-npm-client-with-your-organization-settings)

## Todos

- [x] Extract supabase from modules -> supabase access in task
- [x] How to handle global types
- [x] How to handle global ts config
- [ ] Add options to packages, remove env access and sample files
- [ ] Consider using https://github.com/TypeStrong/ts-node