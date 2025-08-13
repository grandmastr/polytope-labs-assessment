[This](https://polytope-labs-assessment.vercel.app) is a reproduction of the background animation from [app.hyperbridge.network](https://app.hyperbridge.network), with
some optimizations on top of that. It was implemented in _two ways:_

1. **SVG Pattern/Use** - inline SVG (direct insertion into the DOM) with `<pattern>`/`<use>` tiling + native SVG animation with SMIL.
2. **Pure SVG + CSS Keyframes** - external SVG as a CSS `background-image`.

### Demos

* SVG Pattern
  Approach - [https://polytope-labs-assessment.vercel.app/pattern](https://polytope-labs-assessment.vercel.app/)
  and [https://polytope-labs-assessment.vercel.app/pattern](https://polytope-labs-assessment.vercel.app/pattern)
* Pure SVG + CSS Keyframes
  Approach - [https://polytope-labs-assessment.vercel.app/background](https://polytope-labs-assessment.vercel.app/background)

> They look identical visually,
> but the SVG Pattern Approach is more accessible and can be more performant especially when
> working with animations with more moving parts.

<p>
    <img src="/public/docs/demo.gif" alt="demo video for animation" />
</p>

### How the animation was built

1. The grid and beams were created with SVGs elements.
2. The beams were then animated by SMIL (Synchronized Multimedia Integration Language) <animateTransform> to
   beam groups, which are used to
   define the timing and layout of the animation.
   > CSS keyframes/[WAAPI](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) can be used as well. The reason for this choice is explained in the next section.

### Why SMIL over CSS keyframes?

- <b>Transform precision in SVG space</b> - SMIL allows for targeting groups more precisely.
- <b>Reduced motion support</b> - SMIL animations can be paused/resumed based on user preferences, which is crucial
  for accessibility.
  Achieving a similar effect with CSS keyframes would require an asset swap.
- Combining SMIL approach + inline SVG gives me reliable accessibility, and more control.


### SVG Pattern/Use Approach

The SVG Pattern Approach uses inline SVG with `<pattern>` and `<use>` elements to create a tiled animation.
This allows for direct manipulation of the SVG elements, ensuring that the animation is part of the DOM and can be
controlled more effectively.

#### Features

- <b>Accessibility</b> - It is purely decorative, which means it's hidden from assistive technologies by default.
- <b>Reduced motion</b> - `useAdaptiveMotion` hook checks the user's motion preferences and pauses the animation
  if reduced motion is preferred.
- <b>Scaling</b> - `useTiledAnimation` hook observes the container width, and updates tiles when the scale changes by >=
  1%, which ensures the pattern scales efficiently with the container size.
- <b>Compatibility</b> - Works across modern browsers, including mobile devices.

> Tested on Chrome, Firefox, Safari, Edge, Opera, and mobile browsers.

<div>
<img src="https://fatal-tomato-dolphin.myfilebase.com/ipfs/QmPtAUXq9W29ZPWMiD7MYNPR3QFzJE7ghuHN3LRV6QhGKL" alt="image showing performance profile">
A shot of the performance profile of the SVG Pattern Approach over 10s, 
showing that it runs at a stable 120 FPS keeping the time per frame to well under 8.33ms on a 120Hz display.</div>

<div>
<img src="/public/docs/reduced-motion.gif" alt="image showing performance profile">
A screen recording of simulating the prefers-motion-reduced option being toggled and the behaviour of the implemented animation.</div>

### Pure SVG + CSS Keyframes Approach

The Pure SVG + CSS Keyframes Approach uses an external SVG file as a background image. This method is simpler and leverages
CSS for positioning.
> This approach is less flexible and offers less control over the animation compared to the SVG Pattern.

### Project Structure

```plaintext
public/
├── grid-raster-keyframes.svg

src/
├── app/
│   ├── (backgrounds)/  <!-- Group for background-related components -->
│   │   ├── background/
│   │   │   └── page.tsx  <!-- Background route -->
│   │   ├── pattern/
│   │   │   └── page.tsx  <!-- Pattern route -->
│   │   └── README.md
│   ├── assets/
│   │   ├── grid-raster.svg
│   │   └── index.ts
│   ├── components/
│   │   ├── AnimatedText/  <!-- Animated Text component -->
│   │   │   ├── AnimatedText.css
│   │   │   ├── AnimatedText.tsx
│   │   │   └── index.ts
│   │   ├── TiledAnimation/  <!-- Tiled Animation component -->
│   │   │   ├── index.ts
│   │   │   └── TiledAnimation.tsx
│   │   ├── README.md 
│   ├── favicon.ico
│   ├── globals.css
│   ├── hooks/
│   │   ├── index.ts
│   │   └── README.md
│   ├── layout.tsx
│   └── page.tsx
````

### Getting started

1. Install the dependencies:

   ```bash
   pnpm install
   ```

2. Start the development server:

   ```bash
   pnpm dev
   ```

### Potential Improvements

- **Performance(Pure SVG + CSS Keyframes)**: Implement asset swap for reduced motion
