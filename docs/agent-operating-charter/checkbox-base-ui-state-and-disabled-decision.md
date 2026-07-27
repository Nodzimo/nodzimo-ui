## Base UI Checkbox State And Disabled Decision

### Scope

This record owns the non-obvious decisions discovered while completing the NUI Checkbox. It exists to prevent a future
port or review from repeating the same Base UI, shadcn, styling, and Storybook investigation.

The implementation lives in:

- `src/client/components/checkbox/checkbox.tsx`
- `src/client/components/checkbox/checkbox.stories.tsx`
- `src/core/components/label/label.tsx`
- `assets/icons/lucide/minus-icon.svg` and its generated icon output

### Indeterminate Is A Real Checkbox State

`indeterminate` is part of the public Base UI Checkbox contract. Base UI defines it as the mixed state in which the
checkbox is neither fully checked nor unchecked. The normal use case is a parent checkbox whose children are only
partially selected.

NUI exposes this upstream state unchanged. It is not a story-only invention and must not be rebuilt as a second checked
value.

The accepted visual language is:

```text
unchecked     = empty control
checked       = primary-filled control + check
indeterminate = primary-filled control + minus
```

Checked and indeterminate both communicate active selection, so both use the selected primary surface and foreground.
The symbol distinguishes complete selection from partial selection. Keeping the mixed state unfilled, as in the reviewed
ShadCN Studio tree variant, is a valid custom visual style but weakens NUI's selected-state consistency and was not
adopted. Invalid checked and invalid indeterminate controls retain the primary selected border while the destructive
ring communicates validation; the mixed state should not fall back to unchecked styling.

The minus comes from the project-owned Lucide SVG generation pipeline. The component consumes `MinusIcon`; it does not
draw a one-off SVG. The source SVG is decorative and uses `aria-hidden="true"` consistently with the icon inventory.

### Indicator Rendering

The Indicator implementation follows the official Base UI Checkbox Group example:

```text
render={(props, state) => (
    <span {...props}>
        {state.indeterminate ? <MinusIcon /> : <CheckIcon />}
    </span>
)}
```

This is Base UI's render callback contract, not custom state plumbing. The first argument contains the merged Indicator
props and must be spread onto the returned element. The second contains `Checkbox.Indicator.State`, including
`indeterminate`. A `span` preserves the Indicator's documented default element while allowing its child icon to depend
on state.

Do not replace this with component-owned React state. A CSS-only pair of permanently mounted icons using
`data-checked`/`data-indeterminate` selectors can also work, but it duplicates hidden elements and is less direct than
the official state callback for this two-icon decision.

### Disabled Styling Incident

The copied shadcn Base UI Checkbox used native `disabled:` variants. Base UI's default Checkbox Root, however, renders a
`span` beside a hidden input and exposes its disabled state on the Root as `data-disabled`. A `span` cannot match the
CSS `:disabled` pseudo-class, so interaction was correctly blocked while the visible opacity and cursor styles did not
activate.

The NUI fix deliberately supports both contracts:

```text
Checkbox Root: disabled:* + data-disabled:*
Label peer:    peer-disabled:* + peer-data-disabled:*
```

`data-disabled:*` handles the default Base UI Root. Native `disabled:*` remains useful for compatible native/custom
rendering. The Label needs the matching peer data variant because `peer-disabled:*` has the same native pseudo-class
limitation. Checkbox must remain usable without a Field, so Field-only opacity is not an acceptable substitute.

This matches the technical diagnosis and proposed fix in shadcn issue
[#9726](https://github.com/shadcn-ui/ui/issues/9726) and pull request
[#9497](https://github.com/shadcn-ui/ui/pull/9497), including the follow-up Label change. PR #9497 was closed without
merge; it is evidence for the approach, not proof of an accepted upstream release. As of July 27, 2026, issue #9726 and
follow-up pull requests [#9729](https://github.com/shadcn-ui/ui/pull/9729) and
[#9893](https://github.com/shadcn-ui/ui/pull/9893) remain open. NUI keeps the fix because Base UI's documented
`data-disabled` contract independently confirms it.

### Read-Only Is Not Disabled

`readOnly` is also a real Base UI Checkbox prop and produces `data-readonly`. It prevents the user from changing the
value while keeping the control as available information. `disabled` communicates that the control is unavailable.

NUI intentionally does not apply disabled opacity or a prohibited cursor to read-only checkboxes. A product may explain
why a value is immutable through nearby copy or context, but the base component should not make read-only and disabled
visually or semantically identical.

### Storybook Decisions

- `Shows the mixed selection state` is the accepted short description for `indeterminate`; it matches Base UI's mixed
  state terminology.
- A boolean value present in `meta.args` already produces the correct boolean control. Do not repeat
  `control: 'boolean'` in `argTypes` unless inference actually fails.
- Keep Checkbox uncontrolled in the default Canvas. A live `checked` control would freeze ordinary interaction unless
  the story also synchronized Storybook args.
- Use `onCheckedChange: fn()` as the primary interaction spy. It exposes the callback in Controls and records real user
  changes in Actions without owning component state.

The same primary-callback rule applies to the existing interactive stories: Button `onClick`, Input and Textarea
`onChange`, Select `onValueChange`, and Dropdown Menu `onOpenChange`. Document the component's main interaction
boundary; do not add every secondary callback.

### Regression Checks

When Checkbox behavior or styling changes, verify this focused matrix:

- unchecked, checked, and indeterminate; indeterminate must use the primary fill and Minus icon
- invalid combined with checked and indeterminate
- disabled combined with each selection state; the Root and wrapping Label must dim and show the prohibited cursor
- read-only combined with checked and indeterminate; interaction must be blocked without disabled styling
- uncontrolled clicking and the `onCheckedChange` Storybook Action
- keyboard focus and light/dark theme appearance

Run `bun run build:ts` and `bun run check:lint` after implementation changes. Use the rendered Storybook matrix for
visual and interaction claims that static checks cannot prove.

### References

- [Base UI Checkbox](https://base-ui.com/react/components/checkbox): `indeterminate`, `readOnly`, state data attributes,
  Root/Indicator element contracts, and Indicator state
- [Base UI Checkbox Group](https://base-ui.com/react/components/checkbox-group): official parent-checkbox example using
  the Indicator render callback with a horizontal rule or check
- [Base UI `useRender`](https://base-ui.com/react/utils/use-render): merged props and internal state passed to render
  callbacks
- [shadcn Base UI Checkbox](https://ui.shadcn.com/docs/components/base/checkbox): the selected upstream component family
  and its Field-oriented disabled example
- [ShadCN Studio Checkbox collection](https://shadcnstudio.com/docs/components/checkbox): reviewed alternative
  indeterminate styling; useful as a custom example, not the NUI source of truth
