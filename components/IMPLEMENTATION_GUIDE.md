# UI Component System - Implementation Guide
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
**Date:** January 14, 2026  
**Status:** Production Ready ✅

---

## 🎯 **QUICK START**

### Import Components:
<<<<<<< HEAD

```tsx
import Button from "@/components/Button";
import Input from "@/components/Input";
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import FormField from "@/components/FormField";
```

### Basic Usage:

=======
```tsx
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';
import Modal from '@/components/Modal';
import FormField from '@/components/FormField';
```

### Basic Usage:
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
```tsx
// Button
<Button variant="primary" size="md">Click Me</Button>

// Input
<Input type="email" label="Email" placeholder="your@email.com" required />

// Card
<Card variant="default" hover>
  <Card.Body>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Body>
</Card>

// Modal
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
  <Modal.Body>Content</Modal.Body>
  <Modal.Footer>
    <Button variant="primary">Save</Button>
  </Modal.Footer>
</Modal>
```

---

## 📦 **COMPONENT REFERENCE**

### 1. **Button**
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
**File:** `components/Button.tsx`

**Variants:** `primary` | `secondary` | `tertiary` | `ghost` | `danger`  
**Sizes:** `sm` | `md` | `lg`

**Props:**
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- `variant?: ButtonVariant` - Visual style
- `size?: ButtonSize` - Button size
- `loading?: boolean` - Show loading spinner
- `icon?: ComponentType` - Left icon (lucide-react)
- `iconRight?: ComponentType` - Right icon
- `fullWidth?: boolean` - Full width button
- `disabled?: boolean` - Disabled state

**Example:**
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
```tsx
<Button variant="primary" icon={Play} loading={isLoading}>
  Play Now
</Button>
```

---

### 2. **Input**
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
**File:** `components/Input.tsx`

**Variants:** `default` | `ghost`  
**Sizes:** `sm` | `md` | `lg`

**Props:**
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- `type?: string` - Input type (text, email, password, etc.)
- `label?: string` - Label text
- `helperText?: string` - Helper text below input
- `error?: string` - Error message (shows error state)
- `success?: string` - Success message (shows success state)
- `iconLeft?: ComponentType` - Left icon
- `iconRight?: ComponentType` - Right icon
- `showSuccessIcon?: boolean` - Show checkmark when valid
- `required?: boolean` - Required field (adds asterisk)
- `disabled?: boolean` - Disabled state

**Example:**
<<<<<<< HEAD

```tsx
<Input
  type="email"
  label="Email"
=======
```tsx
<Input 
  type="email" 
  label="Email" 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  placeholder="your@email.com"
  error={emailError}
  required
/>
```

---

### 3. **FormField**
<<<<<<< HEAD

**File:** `components/FormField.tsx`

**Props:**

=======
**File:** `components/FormField.tsx`

**Props:**
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- `label?: string` - Label text
- `helperText?: string` - Helper text
- `error?: string` - Error message
- `success?: string` - Success message
- `required?: boolean` - Required field indicator
- `disabled?: boolean` - Disabled state
- `children: ReactNode` - Form input (usually Input component)

**Example:**
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
```tsx
<FormField label="Username" required error={usernameError}>
  <Input type="text" placeholder="Choose a username" />
</FormField>
```

---

### 4. **Card**
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
**File:** `components/Card.tsx`

**Variants:** `default` | `elevated` | `outline` | `gradient`  
**Sizes:** `sm` | `md` | `lg`  
**Render Types:** `div` | `link` | `button`

**Props:**
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- `variant?: CardVariant` - Visual style
- `size?: CardSize` - Card size (padding)
- `hover?: boolean` - Enable hover effect
- `as?: 'div' | 'link' | 'button'` - Render type
- `href?: string` - Link href (required when as="link")
- `onClick?: () => void` - Click handler
- `image?: string` - Image URL
- `imageAlt?: string` - Image alt text

**Subcomponents:**
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- `Card.Image` - Image with size/aspect ratio
- `Card.Header` - Header section
- `Card.Title` - Bold title text
- `Card.Description` - Subtitle/description
- `Card.Body` - Main content section
- `Card.Footer` - Footer section (with border)
- `Card.Actions` - Action buttons container

**Example:**
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
```tsx
<Card as="link" href="/album/123" variant="default" hover>
  <Card.Image src="/album.jpg" alt="Album" size="md" />
  <Card.Body>
    <Card.Title>Album Title</Card.Title>
    <Card.Description>Artist Name</Card.Description>
  </Card.Body>
</Card>
```

---

### 5. **Modal**
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
**File:** `components/Modal.tsx`

**Sizes:** `sm` | `md` | `lg` | `xl` | `fullscreen`

**Props:**
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- `isOpen: boolean` - Whether modal is open
- `onClose: () => void` - Close handler
- `title?: string` - Modal title
- `size?: ModalSize` - Modal size
- `showCloseButton?: boolean` - Show close button (default: true)
- `closeOnOverlayClick?: boolean` - Close on overlay click (default: true)
- `closeOnEscape?: boolean` - Close on ESC key (default: true)
- `preventBodyScroll?: boolean` - Prevent body scroll (default: true)
- `header?: ReactNode` - Custom header content
- `footer?: ReactNode` - Custom footer content
- `children: ReactNode` - Modal content

**Subcomponents:**
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- `Modal.Header` - Custom header section
- `Modal.Body` - Body content section
- `Modal.Footer` - Footer with action buttons

**Example:**
<<<<<<< HEAD

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
=======
```tsx
<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)} 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  title="Edit Playlist"
  size="md"
>
  <Modal.Body>
    <Input label="Name" placeholder="Playlist name" />
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleSave}>
      Save
    </Button>
  </Modal.Footer>
</Modal>
```

---

## 🎨 **DESIGN TOKENS**

### Colors (Tailwind Classes):
<<<<<<< HEAD

```tsx
// Backgrounds
className = "bg-spotify-dark"; // #121212
className = "bg-spotify-dark-gray"; // #181818
className = "bg-spotify-light-gray"; // #282828
className = "bg-spotify-green"; // #1DB954

// Text
className = "text-white";
className = "text-spotify-text-gray"; // #B3B3B3
className = "text-black"; // For green buttons

// EmPulse Accents
className = "bg-empulse-red"; // #E63946
className = "bg-empulse-blue"; // #457B9D
className = "bg-empulse-purple"; // #7209B7
```

### Spacing (4px base unit):

```tsx
className = "p-1"; // 4px
className = "p-2"; // 8px
className = "p-3"; // 12px
className = "p-4"; // 16px
className = "p-6"; // 24px
className = "p-8"; // 32px
```

### Border Radius:

```tsx
className = "rounded-lg"; // 8px (cards)
className = "rounded-xl"; // 12px (modals)
className = "rounded-full"; // 9999px (buttons)
```

### Transitions:

```tsx
className = "transition-all duration-200 ease-in-out";
=======
```tsx
// Backgrounds
className="bg-spotify-dark" // #121212
className="bg-spotify-dark-gray" // #181818
className="bg-spotify-light-gray" // #282828
className="bg-spotify-green" // #1DB954

// Text
className="text-white"
className="text-spotify-text-gray" // #B3B3B3
className="text-black" // For green buttons

// EmPulse Accents
className="bg-empulse-red" // #E63946
className="bg-empulse-blue" // #457B9D
className="bg-empulse-purple" // #7209B7
```

### Spacing (4px base unit):
```tsx
className="p-1" // 4px
className="p-2" // 8px
className="p-3" // 12px
className="p-4" // 16px
className="p-6" // 24px
className="p-8" // 32px
```

### Border Radius:
```tsx
className="rounded-lg" // 8px (cards)
className="rounded-xl" // 12px (modals)
className="rounded-full" // 9999px (buttons)
```

### Transitions:
```tsx
className="transition-all duration-200 ease-in-out"
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
```

**Full Token Reference:** See `design-tokens.json`

---

## ✅ **BEST PRACTICES**

### 1. **Always Use Components**
<<<<<<< HEAD

❌ Don't:

=======
❌ Don't:
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
```tsx
<button className="bg-spotify-green text-black px-6 py-2 rounded-full">
  Click Me
</button>
```

✅ Do:
<<<<<<< HEAD

```tsx
<Button variant="primary" size="md">
  Click Me
</Button>
```

### 2. **Provide Labels for Inputs**

❌ Don't:

=======
```tsx
<Button variant="primary" size="md">Click Me</Button>
```

### 2. **Provide Labels for Inputs**
❌ Don't:
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
```tsx
<input type="email" placeholder="Email" />
```

✅ Do:
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
```tsx
<Input type="email" label="Email" placeholder="your@email.com" required />
```

### 3. **Handle Validation**
<<<<<<< HEAD

✅ Do:

```tsx
<Input
  type="password"
=======
✅ Do:
```tsx
<Input 
  type="password" 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  label="Password"
  error={passwordError}
  helperText="Must be at least 8 characters"
/>
```

### 4. **Use Semantic HTML**
<<<<<<< HEAD

✅ Components handle semantic HTML automatically:

=======
✅ Components handle semantic HTML automatically:
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- Button uses `<button>` element
- Input uses `<input>` with proper `<label>`
- Card can render as `<div>`, `<Link>`, or `<button>`
- Modal uses `role="dialog"` and ARIA attributes

### 5. **Accessibility First**
<<<<<<< HEAD

✅ All components include:

=======
✅ All components include:
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- Proper ARIA attributes
- Keyboard navigation support
- Focus indicators
- Screen reader support
- WCAG 2.2 AA compliant contrast ratios

---

## 🔄 **MIGRATION CHECKLIST**

### Before Migration:
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- [ ] Review existing components to identify patterns
- [ ] Identify all button implementations
- [ ] Identify all input/form implementations
- [ ] Identify all card/list item implementations
- [ ] Identify all modal/dialog implementations

### Migration Steps:
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
1. **Replace Buttons:**
   - Find all `<button>` elements with custom classes
   - Replace with `<Button>` component
   - Update variants/sizes as needed

2. **Replace Inputs:**
   - Find all `<input>` elements
   - Replace with `<Input>` component
   - Add `label` prop if missing
   - Add validation with `error` prop

3. **Replace Cards:**
   - Find all card-like divs (`bg-spotify-light-gray rounded-lg`)
   - Replace with `<Card>` component
   - Use subcomponents for structure

4. **Replace Modals:**
   - Find all modal/dialog implementations
   - Replace with `<Modal>` component
   - Use subcomponents for structure

### After Migration:
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- [ ] Test all interactive elements
- [ ] Verify keyboard navigation
- [ ] Test screen reader compatibility
- [ ] Check focus indicators
- [ ] Verify color contrast
- [ ] Test responsive behavior

---

## 📚 **DOCUMENTATION FILES**

### Component Documentation:
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- **Complete Reference:** `components/UI_COMPONENT_SYSTEM.md`
- **Quick Start:** `components/QUICK_START.md`
- **Accessibility Report:** `components/BUTTON_ACCESSIBILITY.md`
- **This Guide:** `components/IMPLEMENTATION_GUIDE.md`

### Design Tokens:
<<<<<<< HEAD

- **Token Definitions:** `design-tokens.json`

### Examples:

=======
- **Token Definitions:** `design-tokens.json`

### Examples:
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- **Button Examples:** `components/Button.examples.tsx`

---

## 🎓 **LEARNING RESOURCES**

### Component Examples:
<<<<<<< HEAD

All components include JSDoc comments with examples. Check component files:

=======
All components include JSDoc comments with examples. Check component files:
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- `components/Button.tsx` - Button component with examples
- `components/Input.tsx` - Input component with examples
- `components/Card.tsx` - Card component with examples
- `components/Modal.tsx` - Modal component with examples

### Design System References:
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- **Spotify Design:** Reference for design patterns
- **WCAG 2.2 Guidelines:** https://www.w3.org/WAI/WCAG22/quickref/
- **Tailwind CSS:** https://tailwindcss.com/docs

---

## 🐛 **TROUBLESHOOTING**

### Common Issues:

**1. Import Errors:**
<<<<<<< HEAD

```tsx
// ✅ Correct
import Button from "@/components/Button";

// ❌ Incorrect
import { Button } from "@/components/Button";
=======
```tsx
// ✅ Correct
import Button from '@/components/Button';

// ❌ Incorrect
import { Button } from '@/components/Button';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
```

**2. Type Errors:**
All components are fully typed. Check prop types in component files.

**3. Styling Issues:**
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- Use component props instead of custom `className` when possible
- Check `design-tokens.json` for available values
- Use Tailwind classes for custom styling

**4. Accessibility Issues:**
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- Always provide `label` prop for Input components
- Use semantic HTML elements (components handle this automatically)
- Check focus indicators are visible

---

## 🚀 **NEXT STEPS**

### Recommended Actions:
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
1. **Start Migration:** Begin replacing existing components with new system
2. **Test Thoroughly:** Test all interactive elements and accessibility
3. **Document Patterns:** Document common patterns in your codebase
4. **Share Knowledge:** Share this guide with your team

### Future Enhancements:
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- Create additional components (Select, Checkbox, Radio, Badge)
- Build component showcase page
- Add Storybook for visual testing
- Create component playground

---

## 📞 **SUPPORT**

### Need Help?
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
1. Check component files for inline JSDoc comments
2. Review `UI_COMPONENT_SYSTEM.md` for complete reference
3. Check `design-tokens.json` for design values
4. Review examples in `Button.examples.tsx`

### Reporting Issues:
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- Component bugs: Check component implementation
- Design inconsistencies: Verify `design-tokens.json` values
- Accessibility issues: Review `BUTTON_ACCESSIBILITY.md` patterns

---

**Last Updated:** January 14, 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
