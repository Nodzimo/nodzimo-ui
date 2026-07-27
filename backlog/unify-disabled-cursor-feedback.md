---
status: ready
---

# Make disabled cursor feedback consistent across interactive controls

## Context

NUI currently inherits inconsistent disabled cursor behavior from the selected shadcn sources:

- Checkbox, Textarea, and Select Trigger use `cursor-not-allowed` without disabling pointer targeting, so the cursor is
  visible.
- Input declares both `disabled:pointer-events-none` and `disabled:cursor-not-allowed`. The first rule removes the input
  from pointer hit testing, so the cursor declared on that same element cannot appear.
- Button declares `disabled:pointer-events-none disabled:opacity-50` and no prohibited cursor.
- The Dropdown Menu story composes the Trigger with NUI Button, so root-disabled and trigger-disabled previews inherit
  the Button behavior.

This is a CSS interaction, not evidence that the disabled prop failed. According to MDN, `pointer-events: none` makes
the element itself cease to be the pointer event target. MUI documents the same practical limitation: a disabled element
using `pointer-events: none` cannot display `cursor: not-allowed`.

The current shadcn Base UI Button and Input sources contain the same split. No authoritative shadcn rationale or merged
unifying fix was found. shadcn issue #1022 also records another consequence: hover-triggered overlays cannot target a
disabled Button while pointer events are removed.

## Outcome

- NUI has one documented disabled-cursor policy for public interactive controls.
- Hovering any visibly disabled form control or trigger shows the intended prohibited cursor.
- Disabled controls remain non-interactive through their native or Base UI behavior.
- Rest, hover, active, focus, light-theme, and dark-theme styles do not make a disabled control look enabled.
- Button composition is verified for its default native element and supported Base UI `render` cases.
- Dropdown Menu root-disabled and trigger-disabled compositions inherit the correct trigger feedback.

## Recommended solution

Prefer keeping disabled controls as pointer targets for cursor and explanatory hover feedback:

1. Remove `disabled:pointer-events-none` from Input; retain its existing prohibited cursor, opacity, and background.
2. Remove `disabled:pointer-events-none` from Button and add prohibited-cursor styling.
3. Guard Button hover and pressed transforms so disabled controls cannot acquire enabled feedback after pointer
   targeting is restored. Account for both native `:disabled` and Base UI's supported state/data contract where custom
   rendering requires it.
4. Let the Dropdown Menu trigger inherit the Button correction; do not add menu-specific trigger duplication.
5. Keep the already working Checkbox, Textarea, and Select Trigger rules.
6. Audit other public disabled items separately. Menu and Select items may intentionally suppress pointer targeting as
   list-navigation primitives and should not be changed merely to make every class string identical.

Do not replace Base UI controls with native wrappers and do not require every standalone control to be inside Field.

## Next step

Confirm the NUI policy above, inspect Base UI Button's disabled behavior for native and custom `render` output, then
apply the smallest Button/Input change and verify the Outcome matrix in Storybook.

## References

- [MDN `pointer-events`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/pointer-events)
- [MUI disabled Button cursor limitation](https://mui.com/material-ui/react-button/#cursor-not-allowed)
- [shadcn issue #1022: disabled Button blocks hover-triggered overlays](https://github.com/shadcn-ui/ui/issues/1022)
- [shadcn Base UI Button source](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/bases/base/ui/button.tsx)
- [shadcn Base UI Input source](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/bases/base/ui/input.tsx)
- `src/client/components/button/button-variants.ts`
- `src/client/components/input/input.tsx`
- `src/client/components/dropdown-menu/dropdown-menu.stories.tsx`
- `src/client/components/checkbox/checkbox.tsx`
- `src/core/components/textarea/textarea.tsx`
- `src/client/components/select/select-trigger.tsx`
