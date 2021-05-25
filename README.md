# Automation

This project combines several modules which are powerful by their own but unleash unknown forces when combined, at least for some lazy developers who have a podcast.

## Structure

### Packages

- @techmobshow/generate-podcast-cover
- @techmobshow/new-anchorfm-episode
- @techmobshow/post-to-instagram
- @techmobshow/types
- @techmobshow/update-website

### Tasks

- @techmobshow/update-website-and-instagram

## Development

### Local

```
yarn build
yarn bootstrap
```

## Inspiration

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