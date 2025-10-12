# Menu Component - Features & Usage

## 🎨 Features

### 1. **Modern Responsive Design**
- Desktop: Horizontal navigation with icons
- Mobile: Hamburger menu with full-screen overlay
- Sticky header with backdrop blur effect
- Smooth transitions and animations

### 2. **Theme Toggle (Light/Dark Mode)**
- Sun/Moon icon toggle button
- Persists preference in localStorage
- Respects system preference
- No flash of unstyled content (FOUC)
- Smooth color transitions

### 3. **Built-in Icons**
The menu automatically displays icons based on menu item names:
- **Home**: House icon
- **Posts**: Document/blog icon
- **Tags**: Tag icon
- **About**: Info circle icon
- **Default**: Generic document icon

### 4. **Active States**
- Current page: Blue background highlight
- Ancestor pages: Subtle blue tint
- Hover effects: Smooth color transitions

### 5. **Dropdown Support**
- Nested menu items supported
- Hover-activated dropdowns on desktop
- Expanded list on mobile

## 📖 Usage

### Basic Menu Configuration

In your `hugo.toml`:

```toml
[[menus.main]]
  name = "Home"
  url = "/"
  weight = 1

[[menus.main]]
  name = "Posts"
  url = "/posts/"
  weight = 2

[[menus.main]]
  name = "Tags"
  url = "/tags/"
  weight = 3

[[menus.main]]
  name = "About"
  url = "/about/"
  weight = 4
```

### Include in Header

In `layouts/_partials/header.html`:

```html
{{ partial "menu.html" (dict "menuID" "main" "page" .) }}
```

### Nested Menus

```toml
[[menus.main]]
  name = "Products"
  url = "/products/"
  weight = 2

[[menus.main]]
  name = "Product A"
  parent = "Products"
  url = "/products/product-a/"
  weight = 1

[[menus.main]]
  name = "Product B"
  parent = "Products"
  url = "/products/product-b/"
  weight = 2
```

## 🎯 Customization

### Change Logo

Edit the SVG in `menu.html` (line ~24):

```html
<svg class="w-8 h-8 text-blue-600 dark:text-blue-400">
  <!-- Your custom icon -->
</svg>
```

### Add Custom Icons

To add icons for custom menu items, edit the icon logic in `menu.html`:

```html
{{- if eq .Name "Custom" }}
  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="YOUR_PATH_DATA"></path>
  </svg>
{{- end }}
```

### Color Scheme

Colors are managed via Tailwind CSS classes:
- Primary: `blue-600` / `blue-500`
- Hover: `blue-400` / `blue-300`
- Background: `gray-50` / `gray-900`

To change colors, replace color classes in `menu.html`.

## 🔧 Technical Details

### Files Structure

```
layouts/
├── _partials/
│   └── menu.html              # Main menu component
├── baseof.html                # Updated with theme support
assets/
├── js/
│   ├── theme-toggle.js        # Theme switching logic
│   └── main.js                # Additional enhancements
```

### Theme Toggle Implementation

The theme toggle works in 3 parts:

1. **Inline script in baseof.html**: Prevents FOUC by loading theme before render
2. **theme-toggle.js**: Handles theme switching and persistence
3. **CSS classes**: Tailwind's `dark:` variants for styling

### Mobile Menu

Mobile menu is controlled via JavaScript:
- Toggle button shows/hides menu
- Icon switches between hamburger and close
- Smooth height transitions

## 🚀 Performance

- **Lazy loaded**: JavaScript only executes after DOM ready
- **No dependencies**: Pure vanilla JavaScript
- **Minimal CSS**: Tailwind utility classes only
- **Optimized**: Minified in production builds

## 🌐 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Dark mode requires CSS custom properties support
- localStorage for theme persistence

## 📝 License

Part of Hugo Theme Huxulm - MIT License
