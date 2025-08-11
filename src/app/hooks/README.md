## Hooks

### 1. `useTiledAnimation`

This hook manages the scaling of an SVG pattern animation, ensuring it scales correctly with the container/document
size. It is optimized for responsiveness and performance by using a `ResizeObserver` to detect changes in the container
size and updating the pattern's scale accordingly.

#### Features:

- Dynamically adjusts the scale of the SVG pattern based on the container's width.
- Prevents excessive updates for minor size changes to improve performance.

#### Usage:

It's being used in `TileAnimation` component to ensure that the SVG pattern animation scales correctly.

### 2. `useAdaptiveMotion`

This hook allows SVG animations to adapt to the user's motion preferences. It respects the `prefers-reduced-motion`
media query and pauses or resumes animations accordingly.

#### Features:

- Detects user motion preferences using the `prefers-reduced-motion` media query.
- Pauses animations when reduced motion is preferred.
- Automatically resumes animations when reduced motion is not enabled.

#### Usage:

This is used for ensuring accessibility by adapting animations to user preferences, particularly for users who may
experience discomfort with motion effects.
