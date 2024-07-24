# NextJS 14

# Install picocss

- `pnpm add @picocss/pico`

- In `layout.tsx`

```ts
import "@picocss/pico";
import "@picocss/pico/css/pico.colors.min.css";
```

# Issue

- Found a strange behavior where if I were to update without changing text, the input is reset. However, if I updated the text, the input is not reset. I expect the input not to reset because there is no page refresh.
