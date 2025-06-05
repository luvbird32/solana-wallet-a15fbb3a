
# Design System Documentation

## Color System

Our design system uses semantic color tokens that ensure consistency across the application and provide better maintainability for the open source community.

### Color Token Structure

All colors follow the HSL format and are defined as CSS custom properties. This allows for:
- Easy theme switching
- Consistent color usage
- Better accessibility
- Simplified maintenance

### Semantic Color Categories

#### 1. Base Colors
- `--background`: Main background color
- `--foreground`: Primary text color
- `--surface`: Secondary background for cards/containers
- `--surface-alt`: Alternative surface color

#### 2. Brand Colors
- `--primary`: Main brand color (blue)
- `--primary-foreground`: Text on primary backgrounds
- `--primary-hover`: Hover state for primary elements
- `--primary-active`: Active/pressed state

#### 3. Semantic Status Colors
- `--success`: Success states and positive actions
- `--warning`: Warning states and caution
- `--error`: Error states and destructive actions
- `--info`: Informational content

Each semantic color includes:
- Base color
- Foreground color (for text on colored backgrounds)
- Hover state
- Light variant (for backgrounds)

#### 4. Neutral Grays
Scale from `--neutral-50` (lightest) to `--neutral-900` (darkest).
Use these for:
- Text hierarchy
- Borders
- Disabled states
- Subtle backgrounds

### Component-Specific Tokens

#### Wallet Components
- `--wallet-gradient-from/to`: Gradient colors for wallet elements
- `--wallet-balance-text`: Balance display text
- `--wallet-card-bg/border/hover`: Wallet card styling

#### Token Components
- `--token-card-bg/border/hover`: Token list card styling
- `--token-positive/negative`: Price change indicators

### Usage Guidelines

#### ✅ Do:
```css
/* Use semantic tokens */
.button-primary {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.success-message {
  background-color: hsl(var(--success-light));
  color: hsl(var(--success));
}
```

#### ❌ Don't:
```css
/* Avoid hardcoded colors */
.button {
  background-color: #3b82f6; /* Use --primary instead */
}

.text {
  color: rgb(15, 23, 42); /* Use --foreground instead */
}
```

### Dark Mode Support

The design system includes full dark mode support through the `.dark` class. All semantic tokens have dark mode variants that maintain the same semantic meaning while adapting to dark themes.

### Tailwind Integration

All design tokens are integrated with Tailwind CSS through the config file. Use them like:

```jsx
<div className="bg-primary text-primary-foreground">
  Primary button
</div>

<div className="bg-success text-success-foreground">
  Success state
</div>
```

### Contributing

When adding new colors:

1. **Use semantic names**: Describe the purpose, not the appearance
2. **Provide all variants**: base, foreground, hover, light
3. **Include dark mode**: Ensure good contrast in both themes
4. **Document usage**: Add examples and guidelines
5. **Test accessibility**: Ensure WCAG compliance

### Accessibility

All color combinations are tested for WCAG AA compliance:
- Normal text: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio
- Interactive elements: Clear focus indicators

### Migration Guide

To migrate from hardcoded colors to semantic tokens:

1. Identify the color's purpose (primary action, error state, etc.)
2. Find the appropriate semantic token
3. Replace hardcoded values with `hsl(var(--token-name))`
4. Test in both light and dark modes
