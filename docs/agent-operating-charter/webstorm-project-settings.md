## WebStorm Project Settings

### Shared Settings

- The project intentionally shares selected WebStorm settings under `.idea`: dictionaries, inspection profiles, and
  scopes. Keep `.idea` sharing narrow and do not commit workspace state, shelves, local run history, or user-specific
  IDE files.

### Inspection Scopes

- Use shared inspection scopes for repeatable WebStorm false positives in generated, tooling, or convention files.
  Prefer disabling a specific inspection for a narrow scope over adding `// noinspection` comments to source files or
  disabling an inspection globally.
- When extending WebStorm inspection exclusions, add the affected files to `.idea/scopes` and adjust the project profile
  in `.idea/inspectionProfiles`. Keep the scope name and profile entry descriptive enough that another developer can see
  which IDE warning is being silenced and where.
- Keep the `Library Stylesheet Contracts` scope for `src/styles.css`, `src/library.css`, and `.storybook/preview.css`
  with WebStorm's `CssUnusedSymbol` inspection disabled. Public stylesheet hooks such as `.dark`, `.nui-surface`,
  foundation classes, and Storybook-owned selectors such as `.docs-story` are external contracts and do not need local
  source references to be valid.

### Vendored Tailwind Extensions

- Keep the `Tailwind Extensions Stylesheet` scope restricted to `src/tailwind-extensions.css`. In the project inspection
  profile, disable `CssInvalidAtRule`, `CssInvalidFunction`, `CssInvalidPropertyValue`, `CssOverwrittenProperties`,
  `CssUnresolvedCustomProperty`, and `DuplicatedCode` only for that scope.
- Exclude the same file from the WebStorm Tailwind language server through `.idea/tailwindcss.xml`. This prevents its
  separate diagnostic stream from reporting the vendored CSS-first directives and selectors after IDE inspections are
  scoped correctly.
- These exclusions cover false positives caused by upstream Tailwind directives, nested functions, fallback
  declarations, custom properties, and intentionally repeated selector forms. Keep the inspections enabled elsewhere;
  validate this file by comparison with its pinned upstream source and by the Tailwind package and Storybook builds
  instead of adding source comments or weakening project-wide CSS analysis.

For provenance, update procedure, compiler behavior, and artifact verification, see
[Tailwind shadcn Extensions Decision](tailwind-shadcn-extensions-decision.md).
