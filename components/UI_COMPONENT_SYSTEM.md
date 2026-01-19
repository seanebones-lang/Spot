# UI Component System - Complete Reference

**Date:** January 14, 2026  
**Version:** 1.0.0  
**Status:** Production Ready

---

## 📋 **OVERVIEW**

This document provides a complete reference for the standardized UI component system for EmPulse Music. All components follow Spotify design patterns, are WCAG 2.2 AA compliant, and include full TypeScript support.

---

## 🎨 **DESIGN PRINCIPLES**

### Core Principles:

1. **Pixel-Perfect Spotify Replication** - Exact visual matching (<1% difference)
2. **Accessibility First** - WCAG 2.2 AA compliance minimum
3. **Consistent Design Tokens** - Single source of truth for all styles
4. **TypeScript Support** - Full type safety and IntelliSense
5. **Performance Optimized** - Minimal re-renders, efficient styling

### Design Tokens:

- **Colors:** Spotify palette (#1DB954 green, #121212 dark) + EmPulse accents
- **Typography:** Circular font family (Spotify's font)
- **Spacing:** 4px base unit (4px, 8px, 12px, 16px, 24px, 32px)
- **Border Radius:** 4px (inputs), 8px (cards), 9999px (buttons - pill)
- **Transitions:** 200ms ease-in-out standard

---

## 🧩 **COMPONENT LIBRARY**

### 1. **Button Component**

**File:** `components/Button.tsx`

#### Variants:

- `primary` - Spotify Green background, black text (default)
- `secondary` - Transparent background, green border and text
- `tertiary` - Dark gray background, white text
- `ghost` - Transparent background, white text
- `danger` - EmPulse Red background, white text

#### Sizes:

- `sm` - 32px height, 14px text, medium weight
- `md` - 40px height, 14px text, bold (default)
- `lg` - 48px height, 16px text, bold

#### Features:

- ✅ Loading state with spinner
- ✅ Left/right icon support (lucide-react)
- ✅ Full-width option
- ✅ Disabled state
- ✅ All interactive states (hover, active, focus)
- ✅ WCAG 2.2 AA compliant

#### Usage:

```tsx
import Button from '@/components/Button';
import { Play } from 'lucide-react';

// Primary button
<Button variant="primary" size="md">Get Started</Button>

// With icon and loading
<Button variant="primary" icon={Play} loading={isLoading}>
  Play Now
</Button>

// Secondary button
<Button variant="secondary">Cancel</Button>

// Danger button
<Button variant="danger">Delete</Button>
```

#### Accessibility:

- **Contrast Ratios:** All variants exceed 4.5:1 (WCAG AA)
- **Focus Indicators:** 2px ring with 4px offset
- **Keyboard Support:** Native button element (Enter/Space)
- **ARIA:** `aria-busy`, `aria-disabled` support

---

### 2. **Input Component**

**File:** `components/Input.tsx`

#### Variants:

- `default` - Dark gray background (#181818)
- `ghost` - Transparent background

#### Sizes:

- `sm` - 36px height
- `md` - 40px height (default)
- `lg` - 48px height

#### Features:

- ✅ Built-in label support
- ✅ Helper text display
- ✅ Error state (red border + icon + message)
- ✅ Success state (green border + icon + message)
- ✅ Left/right icon support
- ✅ All input types (text, email, password, etc.)
- ✅ Required field indicator (asterisk)
- ✅ WCAG 2.2 AA compliant

#### Usage:

```tsx
import Input from '@/components/Input';
import { Mail, Lock } from 'lucide-react';

// Basic input
<Input
  type="email"
  label="Email"
  placeholder="your@email.com"
  required
/>

// With validation
<Input
  type="password"
  label="Password"
  iconLeft={Lock}
  error="Password must be at least 8 characters"
/>

// With success state
<Input
  type="email"
  label="Email"
  helperText="We'll never share your email"
  showSuccessIcon
/>
```

#### Accessibility:

- **Label Association:** Automatic `htmlFor`/`id` linking
- **Error Messages:** `aria-invalid` + `aria-describedby`
- **Focus Indicators:** 2px green ring with 20% opacity
- **Contrast:** White text on dark background (16:1 ratio)

---

### 3. **FormField Component**

**File:** `components/FormField.tsx`

#### Features:

- ✅ Wrapper for consistent form layout
- ✅ Label, input, helper text, and error message coordination
- ✅ Proper ID association for accessibility

#### Usage:

```tsx
import FormField from "@/components/FormField";
import Input from "@/components/Input";

<FormField
  label="Username"
  required
  helperText="Must be unique"
  error={usernameError}
>
  <Input type="text" placeholder="Choose a username" />
</FormField>;
```

---

### 4. **Card Component**

**File:** `components/Card.tsx`

#### Variants:

- `default` - Light gray background (#282828)
- `elevated` - Dark gray background (#181818)
- `outline` - Transparent with border
- `gradient` - EmPulse Purple/Blue gradient

#### Sizes:

- `sm` - 12px padding
- `md` - 16px padding (default)
- `lg` - 24px padding

#### Render Types:

- `div` - Static card (default)
- `link` - Next.js Link (requires `href`)
- `button` - Button element (requires `onClick`)

#### Features:

- ✅ Hover effects (background color change)
- ✅ Image support (Card.Image component)
- ✅ Subcomponents: Header, Title, Description, Body, Footer, Actions
- ✅ Clickable cards (onClick or Link)
- ✅ Active state (scale down on click)

#### Usage:

```tsx
import Card from '@/components/Card';

// Basic card
<Card variant="default" size="md" hover>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Card description</Card.Description>
  </Card.Body>
</Card>

// Album/Track card with image
<Card as="link" href="/album/123" variant="default" hover>
  <Card.Image src="/album.jpg" alt="Album" size="md" aspectRatio="square" />
  <Card.Body>
    <Card.Title>Album Title</Card.Title>
    <Card.Description>Artist Name</Card.Description>
  </Card.Body>
</Card>

// Gradient card (Mood Check-in)
<Card variant="gradient" size="lg">
  <Card.Header>
    <Card.Title>Daily Mood Check-in</Card.Title>
  </Card.Header>
  <Card.Body>
    <p className="text-white/80">Track your mood</p>
  </Card.Body>
  <Card.Actions>
    <Button variant="secondary">Check In</Button>
  </Card.Actions>
</Card>
```

#### Subcomponents:

- `Card.Image` - Image with size/aspect ratio options
- `Card.Header` - Header section
- `Card.Title` - Bold title text
- `Card.Description` - Subtitle/description text
- `Card.Body` - Main content section
- `Card.Footer` - Footer section (with border)
- `Card.Actions` - Action buttons container

---

## 🎯 **DESIGN TOKENS**

**File:** `design-tokens.json`

### Available Token Categories:

1. **Colors** - Spotify + EmPulse palette
2. **Typography** - Font family, sizes, weights
3. **Spacing** - 4px base unit scale
4. **Border Radius** - 4px (inputs), 8px (cards), 9999px (buttons)
5. **Buttons** - Variants, sizes, states
6. **Inputs** - Variants, sizes, validation states
7. **Cards** - Variants, sizes, images
8. **Transitions** - Duration (200ms), easing (ease-in-out)

### Usage:

```tsx
// Colors from Tailwind config
className = "bg-spotify-green text-black";
className = "bg-spotify-dark-gray text-white";
className = "text-spotify-text-gray";

// Spacing from Tailwind
className = "p-4"; // 16px padding
className = "gap-2"; // 8px gap
className = "mb-6"; // 24px margin-bottom
```

---

## 📚 **BEST PRACTICES**

### 1. **Component Selection**

- **Primary Actions:** Use `Button variant="primary"`
- **Secondary Actions:** Use `Button variant="secondary"`
- **Destructive Actions:** Use `Button variant="danger"`
- **Form Inputs:** Always use `Input` component (not raw `<input>`)
- **Content Containers:** Use `Card` for grouped content

### 2. **Accessibility**

- Always provide `label` prop for `Input` components
- Use `required` prop to show required field indicator
- Provide `error` messages for validation feedback
- Use semantic HTML (`Card` subcomponents use proper heading levels)

### 3. **Styling**

- Prefer component props over custom `className` when possible
- Use design tokens from `design-tokens.json` via Tailwind
- Maintain consistent spacing (4px base unit)
- Use transitions for interactive elements (200ms standard)

### 4. **TypeScript**

- All components are fully typed
- Use TypeScript props for type safety
- Import types when extending components:
  ```tsx
  import type { ButtonProps } from "@/components/Button";
  ```

---

## 🔍 **ACCESSIBILITY CHECKLIST**

All components meet WCAG 2.2 AA standards:

- ✅ **Color Contrast:** All text exceeds 4.5:1 ratio
- ✅ **Focus Indicators:** Visible on all interactive elements
- ✅ **Keyboard Navigation:** Full keyboard support
- ✅ **Screen Reader Support:** Proper ARIA attributes
- ✅ **Semantic HTML:** Correct HTML elements used
- ✅ **Label Association:** Form inputs properly labeled

---

## 🚀 **MIGRATION GUIDE**

### Migrating Existing Buttons:

```tsx
// Before
<button className="bg-spotify-green text-black px-6 py-2 rounded-full">
  Click Me
</button>

// After
<Button variant="primary" size="md">Click Me</Button>
```

### Migrating Existing Inputs:

```tsx
// Before
<label className="block mb-2">Email</label>
<input
  type="email"
  className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white"
/>

// After
<Input
  type="email"
  label="Email"
  placeholder="your@email.com"
/>
```

### Migrating Existing Cards:

```tsx
// Before
<div className="bg-spotify-light-gray rounded-lg p-4 hover:bg-spotify-light-gray/80">
  <h3>Card Title</h3>
  <p>Card description</p>
</div>

// After
<Card variant="default" size="md" hover>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Card description</Card.Description>
  </Card.Body>
</Card>
```

---

## 📖 **DOCUMENTATION FILES**

- **Button Component:** `components/Button.tsx` + `components/Button.examples.tsx`
- **Input Component:** `components/Input.tsx`
- **FormField Component:** `components/FormField.tsx`
- **Card Component:** `components/Card.tsx`
- **Design Tokens:** `design-tokens.json`
- **Accessibility Report:** `components/BUTTON_ACCESSIBILITY.md`

---

## 🎓 **LEARNING RESOURCES**

### Component Examples:

- Button examples: `components/Button.examples.tsx`
- All examples are fully functional and can be imported directly

### Design System:

- Spotify Design Guidelines (Reference)
- WCAG 2.2 Guidelines: https://www.w3.org/WAI/WCAG22/quickref/

---

## 📝 **CHANGELOG**

### Version 1.0.0 (January 14, 2026)

- ✅ Created Button component with 5 variants, 3 sizes
- ✅ Created Input component with 2 variants, 3 sizes, validation
- ✅ Created FormField wrapper component
- ✅ Created Card component with 4 variants, 3 sizes, subcomponents
- ✅ Updated design-tokens.json with verified values
- ✅ Added accessibility documentation
- ✅ WCAG 2.2 AA compliance verified

---

## 🐛 **SUPPORT & CONTRIBUTING**

### Reporting Issues:

- Component bugs: Check component files for inline comments
- Design token issues: Verify values in `design-tokens.json`
- Accessibility issues: Review `BUTTON_ACCESSIBILITY.md` for patterns

### Contributing:

- Follow existing component patterns
- Maintain WCAG 2.2 AA compliance
- Update design tokens when adding new values
- Add examples to component `.examples.tsx` files

---

**Last Updated:** January 14, 2026  
**Maintained By:** UI Specialist Agent (MIT Professor-Level)
