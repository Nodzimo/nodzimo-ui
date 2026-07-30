## Field Component Adaptation Decision

### Scope

This record owns the non-obvious decisions made while adapting the shadcn Base UI Field family to Nodzimo UI. It exists
so later work can review the accepted contract without repeating the source, typing, selector, accessibility,
decomposition, import, and Storybook investigations.

The implementation lives under `src/client/components/field`. The selected upstream references are:

- [shadcn Base UI Field documentation](https://ui.shadcn.com/docs/components/base/field)
- [shadcn Base UI Field source](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/field.tsx)
- [shadcn responsive Field example](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/examples/field-responsive.tsx)

These links identify the selected component family and source line. They are not permission to copy later upstream
changes without running the normal staged adaptation workflow again.

### Field Is Not A Label Or A Form Controller

`Label`, `Field`, and `FieldSet` own different layers:

| Part       | Responsibility                                                                  | Does not do                                      |
|------------|---------------------------------------------------------------------------------|--------------------------------------------------|
| `Label`    | Names one form control through the native `htmlFor` and control `id` contract   | Layout descriptions, errors, or field state      |
| `Field`    | Composes one control with its label, description, error, orientation, and state | Store values, run validation, or submit a form   |
| `FieldSet` | Semantically groups related controls with a `FieldLegend`                       | Replace the wrapper around each individual field |

`Field` is therefore a presentational and semantic composition primitive, not a connection layer for React Hook Form,
TanStack Form, Formisch, or native form state. Those systems own values and validation. A consumer still associates a
visible label with its control through matching `htmlFor` and `id`, applies `aria-invalid` to the actual control, and
applies the native or primitive `disabled` prop to the actual control.

The family exists because a complete form field is usually more than a label and input. It gives labels, helper text,
errors, choice-card layouts, separators, related groups, and vertical, horizontal, or container-responsive arrangement
one shared composition vocabulary.

### Package And Module Shape

The Field family is exported from the client entrypoint. Its folder contains self-contained semantic modules:

- `field.tsx` owns `FieldSet`, `FieldLegend`, `FieldGroup`, the CVA orientation recipe, and `Field`
- `field-content.tsx` owns `FieldContent`, `FieldLabel`, `FieldTitle`, and `FieldDescription`
- `field-error.tsx` owns error normalization and rendering
- `field-separator.tsx` owns the separator composition
- `index.ts` is the complete local public surface

The split follows semantic responsibility, not a target file count. The implementation modules have no sibling
cross-imports and do not duplicate shared helpers or styles. `fieldVariants` stays beside `Field`: it is used only by
that component, and `FieldProps` must continue to derive its orientation contract through
`VariantProps<typeof fieldVariants>`. Extracting the recipe would add navigation without establishing a shared
responsibility.

### Import Boundaries

Runtime component implementations use focused cross-component paths:

```text
FieldContent   -> #core/components/label
FieldSeparator -> #client/components/separator
all modules    -> #lib
```

A client component may depend on an RSC-safe core component. The reverse dependency is not allowed. Focused runtime
paths make the dependency graph explicit and avoid routing implementation dependencies through a large aggregate barrel.

The colocated story has a different purpose:

```text
Field parts       -> .
supporting Input  -> #client
```

The local `.` import validates the Field folder's public surface. The supporting `Input` import deliberately validates
the aggregate client barrel, matching the Label and Dropdown Menu reference stories. Story files are excluded from the
published runtime entrypoint, so this integration import does not make the Field implementation depend on the aggregate
barrel.

### Public API Contract

Every renderable part exports its props type. Native wrappers preserve the matching React element contract, while owned
options extend that contract:

```text
FieldSetProps         = ComponentProps<'fieldset'>
FieldLegendProps      = ComponentProps<'legend'> + variant
FieldGroupProps       = ComponentProps<'div'>
FieldProps            = ComponentProps<'div'> + VariantProps<typeof fieldVariants> + documented state markers
FieldContentProps     = ComponentProps<'div'>
FieldLabelProps       = LabelProps
FieldTitleProps       = ComponentProps<'div'>
FieldDescriptionProps = ComponentProps<'p'>
FieldErrorProps       = ComponentProps<'div'> + errors
FieldSeparatorProps   = ComponentProps<'div'> + explicit upstream children shape
```

`FieldLabelProps` aliases the already public `LabelProps` contract instead of re-extracting
`ComponentProps<typeof Label>`. Both describe the same accepted props today; the named type makes the dependency on the
NUI Label API explicit and avoids treating the component value as the source of a second public contract.

The finite values are public runtime metadata as well as types:

```text
FIELD_LEGEND_VARIANTS = ['legend', 'label']
FIELD_ORIENTATIONS    = ['vertical', 'horizontal', 'responsive']
```

`FieldLegendVariant` and `FieldOrientation` are derived from those contracts. Storybook consumes the constants rather
than duplicating option arrays. `FieldProps` retains `VariantProps<typeof fieldVariants>` so the public orientation
contract cannot drift away from the actual CVA recipe.

### Field State Data Attributes

The accepted public state markers are:

```ts
type FieldProps = ComponentProps<'div'> &
    VariantProps<typeof fieldVariants> & {
    'data-disabled'?: boolean
    'data-invalid'?: boolean
}
```

This explicit addition closes a TypeScript contract gap. JSX permits hyphenated custom attributes, but
`ComponentProps<'div'>` does not enumerate every possible `data-*` name. A direct JSX use may therefore compile while a
consumer that extracts `FieldProps`, constructs story args, or passes a typed object cannot discover the supported
state.

Only the two markers intentionally consumed by Field styles are named. NUI does not add a catch-all
``[key: `data-${string}`]`` signature, because that would hide mistakes and falsely advertise every arbitrary data
attribute as a component state. It also does not invent `invalid` or `disabled` aliases: the selected shadcn contract
uses the data attributes directly.

The two selectors are value-based:

```text
data-[invalid=true]
group-data-[disabled=true]/field
```

They match the string value `true`; an emitted `false` value does not activate them. This is different from Dropdown
Menu's presence selector `data-inset`, which matches whenever the attribute exists and therefore requires
`data-inset={inset || undefined}` normalization. Field must not copy that workaround: its state additions are type-only,
and the props continue through `restProps` unchanged.

`data-invalid` changes the Field block's visual state but does not provide accessibility semantics to the control.
Consumers must also set `aria-invalid` on the input, select trigger, textarea, or other actual control.
`data-disabled` dims Field-owned label/title content but does not disable interaction. Consumers must also set the
control's real `disabled` prop. A story control that demonstrates either state must synchronize both layers.

### Orientation And Styling

The default orientation is `vertical`.

- `vertical` stacks every direct child and gives it the available width
- `horizontal` always arranges the content and control in a row
- `responsive` starts stacked and switches to the horizontal arrangement at the named FieldGroup container breakpoint

`@container/field-group` on `FieldGroup` establishes the named container. `@md/field-group:*` is a Tailwind container
query variant, not an unresolved shadcn registry marker or a viewport breakpoint. At a wide container, `horizontal` and
`responsive` are expected to look alike. Their difference appears when the container narrows: `horizontal` remains a
row, while `responsive` stacks.

The Storybook Input uses `w-auto` as focused demo geometry. NUI Input normally contributes `w-full`; the explicit
horizontal Field recipe does not reset direct-child width, so an unmodified full-width input can compress
`FieldContent`. The responsive recipe already controls child widths across its container breakpoint. `w-auto` makes the
same representative composition legible in all three modes without changing the production Field recipe.

Semantic colors and radii use NUI-prefixed tokens. Structural layout utilities remain structural Tailwind classes.
Inline-direction spacing and alignment use logical utilities such as `ms`, `pe`, `inset-e`, and `text-start` where the
source has directional meaning. RTL is an implementation property of the component; it is not repeated as a special
Field story control.

### Accessibility And Focused Suppressions

The upstream `Field` renders `role="group"`. shadcn documents this as the grouping role for one composed field, while
`FieldSet` is the native `fieldset` for a collection of related controls. Replacing every individual Field with a
`fieldset` would conflate those two semantic levels. The focused Biome suppression explains that deliberate contract:

```text
Field groups one control while FieldSet provides the semantic fieldset for related controls
```

This is not a blanket accessibility suppression. `FieldLabel` still needs a valid `htmlFor`/`id` association,
`FieldError` remains an alert, and related controls still belong in `FieldSet` with `FieldLegend`.

`FieldError` deduplicates the supplied snapshot by message before rendering. When multiple messages remain, the upstream
implementation uses the resulting array index as the list key. The focused suppression is accepted because the list has
no interactive item state, is recreated from the current validation snapshot, and is not reordered by user operations.
Introducing generated identities would add state the error contract does not possess.

`FieldError` retains the upstream `useMemo` around error normalization. It is a valid client-side runtime import from
React. React and React DOM intentionally remain both peer dependencies for consumers and development dependencies for
local builds; dependency-cruiser excludes peer dependencies semantically from the production-to-development rule instead
of forcing components to remove legitimate React APIs.

The upstream loose comparison `uniqueErrors?.length == 1` was changed to `=== 1`. `length`, when evaluated, is always a
number, so strict equality preserves the branch exactly. The optional chain was retained with the upstream expression;
it does not change the result for the locally constructed array.

### Retained Upstream Details

`FieldSeparator` retains the upstream
`group-data-[variant=outline]/field-group:-mb-2` selector even though the current public `FieldGroupProps` does not
declare a `variant` prop. This is an upstream compatibility selector, not a reason to invent a FieldGroup variant.
Promoting or deleting it requires separate evidence from an upstream composition or a deliberate NUI API decision.

`FieldSeparatorProps` retains the upstream explicit `children?: ReactNode` intersection even though the native div
contract already includes children. It does not narrow or change runtime behavior. It can be simplified only as a
dedicated cleanup; it is not evidence that the public API is missing children.

### Storybook Contract

Field uses one representative interactive `Default` story because its purpose is composition, not a collection of
independent visual variants. The story follows the official responsive Profile example while omitting extra controls,
buttons, textareas, and separators that would demonstrate other components rather than clarify Field.

The story exposes:

- the real root props `orientation`, `data-invalid`, and `data-disabled`
- the story-only `legendVariant`, because the rendered composition includes a public `FieldLegend` part
- a label, description, input, and conditional multi-message `FieldError`
- a fixed representative FieldSet width instead of an application-size wrapper

`legendVariant` is removed from `restArgs` before the root Field is rendered and is passed only to `FieldLegend`. The
state attributes remain under their real public names. The render reads them from `restArgs` only to synchronize the
supporting Input and conditional error:

```text
Field data-invalid  <-> Input aria-invalid <-> FieldError visibility
Field data-disabled <-> Input disabled
```

Do not add unrelated checkbox or notification fields merely to prove that Field can contain them. A story-wide state
control would then affect only one of several fields and make ownership unclear. Do not add LTR/RTL controls only for
Field; direction coverage belongs to the shared Storybook environment and component verification.

### Failure Modes To Avoid

The following reasoning failures caused unnecessary iteration and must not be repeated:

- Do not infer the public TypeScript contract from the fact that direct JSX accepts an arbitrary hyphenated attribute
- Do not apply a presence-selector boolean workaround until the actual Tailwind selector form has been inspected
- Do not replace `VariantProps<typeof fieldVariants>` with a handwritten orientation type
- Do not extract a named public type and then reconstruct the same shape privately in the first consumer
- Do not design a complex compound story before reading the selected upstream composition and the local reference
  stories
- Do not add secondary components, direction controls, wrappers, or descriptions unless they answer a Field-specific
  interface question
- Do not treat equal wide-screen output from `horizontal` and `responsive` as a bug; verify the narrow-container
  transition
- Do not move runtime implementation imports to aggregate barrels for path brevity
- Do not treat `data-invalid` as a replacement for `aria-invalid` or `data-disabled` as a replacement for `disabled`
- Do not change source behavior during decomposition or class formatting

### Verification Gate

Future Field changes should verify:

- Biome and TypeScript accept every public part and the story
- the local Field barrel and aggregate client barrel export the intended parts, types, and finite option constants
- implementation modules retain focused imports and no avoidable sibling cross-imports
- `vertical`, `horizontal`, and narrow/wide `responsive` layouts behave as documented
- `data-invalid=true` changes Field styling while the control carries `aria-invalid`
- `data-disabled=true` changes Field-owned styling while the actual control is disabled
- single and multiple errors render correctly without duplicate messages
- label/control associations, alert output, FieldSet/Legend semantics, and keyboard interaction remain valid
- NUI token, RTL, dependency-graph, declaration, and static Storybook checks pass at the level required by the change

This gate supplements the staged shadcn adaptation workflow. It does not justify collapsing source capture, token
adaptation, public API work, decomposition, Storybook, and verification into an unreadable single pass.
