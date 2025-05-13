# Assets Directory

This folder is for storing project assets such as images, fonts, and other static files that are imported into components.

## Suggested Structure

```
assets/
  images/    # For images like logos, backgrounds, etc.
  fonts/     # For custom fonts
  styles/    # For additional CSS or SCSS files
```

## Usage

### Importing an Image
Place your image in the `images/` folder and import it into your component:

```javascript
import logo from '../assets/images/logo.png';

<img src={logo} alt="Logo" />
```

### Adding Fonts
Place your font files in the `fonts/` folder and reference them in your CSS:

```css
@font-face {
  font-family: 'CustomFont';
  src: url('../assets/fonts/CustomFont.woff2') format('woff2');
}

body {
  font-family: 'CustomFont', sans-serif;
}
```
