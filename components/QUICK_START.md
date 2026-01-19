# UI Component System - Quick Start Guide

**Date:** January 14, 2026

---

## 🚀 **GETTING STARTED**

Import and use components from `@/components`:

```tsx
import Button from "@/components/Button";
import Input from "@/components/Input";
import Card from "@/components/Card";
import FormField from "@/components/FormField";
```

---

## 📦 **QUICK EXAMPLES**

### Button

```tsx
// Primary action
<Button variant="primary" size="md">Get Started</Button>

// With icon
<Button variant="primary" icon={Play}>Play</Button>

// Loading state
<Button variant="primary" loading={isLoading}>Submit</Button>

// Danger action
<Button variant="danger">Delete</Button>
```

### Input

```tsx
// Basic input
<Input type="email" label="Email" placeholder="your@email.com" required />

// With validation
<Input
  type="password"
  label="Password"
  error="Must be at least 8 characters"
  showSuccessIcon
/>

// With helper text
<Input
  type="text"
  label="Username"
  helperText="Must be unique"
/>
```

### Card

```tsx
// Basic card
<Card variant="default" hover>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Body>
</Card>

// Clickable card with image
<Card as="link" href="/album/123" variant="default" hover>
  <Card.Image src="/album.jpg" alt="Album" size="md" />
  <Card.Body>
    <Card.Title>Album Name</Card.Title>
    <Card.Description>Artist Name</Card.Description>
  </Card.Body>
</Card>
```

### Form

```tsx
// Complete form with validation
<form onSubmit={handleSubmit}>
  <FormField label="Email" required error={emailError}>
    <Input type="email" placeholder="your@email.com" />
  </FormField>

  <FormField label="Password" required error={passwordError}>
    <Input type="password" />
  </FormField>

  <Button type="submit" variant="primary" loading={isSubmitting}>
    Sign Up
  </Button>
</form>
```

---

## 🎨 **DESIGN TOKENS**

Use Tailwind classes that reference design tokens:

```tsx
// Colors
className = "bg-spotify-green text-black";
className = "bg-spotify-dark-gray text-white";
className = "text-spotify-text-gray";

// Spacing (4px base unit)
className = "p-4"; // 16px padding
className = "gap-2"; // 8px gap
className = "mb-6"; // 24px margin-bottom

// Border radius
className = "rounded-lg"; // 8px (cards)
className = "rounded-full"; // pill (buttons)
```

---

## ✅ **BEST PRACTICES**

1. **Always use components** - Don't create raw `<button>` or `<input>` elements
2. **Provide labels** - Always use `label` prop on `Input` components
3. **Handle errors** - Use `error` prop for validation feedback
4. **Use semantic HTML** - Let components handle HTML structure
5. **Maintain accessibility** - Components handle ARIA attributes automatically

---

## 📚 **FULL DOCUMENTATION**

See `UI_COMPONENT_SYSTEM.md` for complete documentation.

---

**Need Help?** Check component `.tsx` files for inline JSDoc comments.
