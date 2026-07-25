---
status: ready
---

# Design static flag asset delivery

## Context

Flag SVGs are source inputs under `assets/flags`; the package currently exposes generated React components and the
deployed Storybook does not promise an HTTP `/flags` asset route. An experimental Storybook static-directory change was
reverted so that an incidental deployment URL did not become an unsupported public contract.

Runtime language selectors must continue to use package-local components and must not depend on Storybook, a CDN, or
network availability. Static delivery remains potentially useful for downloads or non-React consumers, but its owner,
path stability, versioning, caching, and deployment guarantees have not been designed.

## Outcome

- The project explicitly accepts or rejects a public static flag-asset contract.
- If accepted, the chosen package or deployment surface exposes stable documented paths without changing the
  component-first runtime contract.
- Package contents, Storybook deployment behavior, caching/versioning, and production URL checks agree with the
  decision.

## Next step

Compare Storybook `staticDirs`, packaged/exported raw assets, and a dedicated asset host as delivery surfaces. Choose
the contract owner before restoring any static-directory configuration.

## References

- [Icon generation and current static-delivery boundary](../docs/agent-operating-charter/icon-generation.md)
- [Storybook deployment](../docs/agent-operating-charter/storybook-deployment.md)
- [Public package shape](../docs/agent-operating-charter/public-package-shape.md)
