# Embeddable Chat Widget

A lightweight, customizable chat widget that can be easily embedded into any website.

## Features

- ✅ **Easy Integration**: Single script tag to embed
- ✅ **Customizable**: Position, theme, text, and styling options
- ✅ **Responsive**: Works on all device sizes
- ✅ **Isolated Styles**: CSS isolation prevents conflicts with host page
- ✅ **TypeScript**: Full type safety and IntelliSense support
- ✅ **Modern Build**: Built with Vite and React 19

## Quick Start

### 1. Build the Widget

```bash
npm install
npm run build:widget
```

This creates `dist/my-widget.umd.js` - your embeddable widget file.

### 2. Embed in Your Website

Add this script tag to your HTML:

```html
<script src="path/to/my-widget.umd.js"></script>
```

The widget will automatically appear in the bottom-right corner.

## Usage Examples

### Basic Embed (Auto-mount)

```html
<script src="my-widget.umd.js"></script>
```

### Custom Configuration

```javascript
// Mount with custom settings
ChatWidget.mount({
  position: 'bottom-left',
  theme: 'dark',
  title: 'Need help?',
  buttonText: 'Start Chat',
  onChatStart: () => {
    console.log('Chat started!');
  }
});
```

### Multiple Widgets

```javascript
// Mount in specific container
ChatWidget.mount({
  containerId: 'my-container',
  position: 'top-right',
  title: 'Support Widget'
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Widget position on screen |
| `theme` | `'light' \| 'dark'` | `'light'` | Widget theme |
| `title` | `string` | `'Hi there! Need help?'` | Widget title text |
| `buttonText` | `string` | `'Start Chat'` | Button text |
| `containerId` | `string` | `'chat-widget-container'` | HTML element ID to mount in |
| `autoMount` | `boolean` | `true` | Auto-mount on script load |
| `onChatStart` | `() => void` | `undefined` | Callback when chat starts |

## API Reference

### `ChatWidget.mount(config?)`

Mounts the widget with optional configuration.

```javascript
ChatWidget.mount({
  position: 'bottom-left',
  theme: 'dark',
  title: 'Custom Title',
  buttonText: 'Get Help'
});
```

### `ChatWidget.unmount(containerId?)`

Unmounts the widget from the specified container (defaults to `'chat-widget-container'`).

```javascript
ChatWidget.unmount(); // Remove from default container
ChatWidget.unmount('my-container'); // Remove from specific container
```

### `ChatWidget.config`

Access to default configuration object.

```javascript
console.log(ChatWidget.config);
```

## Development

### Local Development

```bash
npm run dev
```

Visit `http://localhost:5173` to see the widget in action.

### Build for Production

```bash
# Build the main app
npm run build

# Build the embeddable widget
npm run build:widget
```

### Testing the Widget

1. Build the widget: `npm run build:widget`
2. Open `demo.html` in your browser
3. Test different mounting options

## Project Structure

```
src/
├── widget.tsx          # Main widget component
├── widget.css          # Isolated widget styles
├── embed.tsx           # Embed script and API
├── components/ui/      # UI components
└── App.tsx            # Development app
```

## Customization

### Styling

Edit `src/widget.css` to customize the widget appearance. The styles are isolated to prevent conflicts with the host page.

### Adding Features

1. Extend the `ChatWidgetConfig` interface in `widget.tsx`
2. Add new props to the component
3. Update the embed script to handle new options

### Building for Different Environments

The build configuration in `vite.config.ts` supports different build modes:

- **Development**: `npm run dev` - Full React app for development
- **Widget Build**: `npm run build:widget` - UMD bundle for embedding

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - feel free to use in your projects!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Troubleshooting

### Widget Not Appearing

1. Check browser console for errors
2. Ensure the script is loaded after the DOM is ready
3. Verify the container element exists

### Style Conflicts

The widget uses CSS isolation to prevent conflicts. If you still see issues:

1. Check for CSS specificity conflicts
2. Ensure the widget CSS is loaded
3. Consider using a CSS reset in the widget

### Build Issues

1. Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
2. Check TypeScript errors: `npm run lint`
3. Verify all dependencies are installed
