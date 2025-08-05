# 🚀 Deployment Guide: Embeddable Chat Widget

This guide will walk you through deploying your chat widget to Vercel and using it in other projects.

## 📋 Prerequisites

- [Vercel Account](https://vercel.com/signup)
- [GitHub Account](https://github.com)
- [Node.js](https://nodejs.org/) (v16 or higher)

## 🎯 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Embeddable chat widget"
   git branch -M main
   git remote add origin https://github.com/your-username/embeddable-compo-test.git
   git push -u origin main
   ```

2. **Verify your project structure:**
   ```
   embeddable-compo-test/
   ├── src/
   │   ├── widget.tsx
   │   ├── widget.css
   │   ├── embed.tsx
   │   └── App.tsx
   ├── public/
   │   ├── index.html
   │   ├── demo.html
   │   └── test-widget.html
   ├── vercel.json
   ├── package.json
   └── vite.config.ts
   ```

### Step 2: Deploy to Vercel

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

2. **Click "New Project"**

3. **Import your GitHub repository:**
   - Select your `embeddable-compo-test` repository
   - Vercel will auto-detect it's a Vite project

4. **Configure build settings:**
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build:widget`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

5. **Click "Deploy"**

6. **Wait for deployment to complete** (usually 1-2 minutes)

### Step 3: Get Your Deployment URL

After deployment, Vercel will give you a URL like:
```
https://embeddable-compo-test-abc123.vercel.app
```

**Save this URL!** You'll need it to embed the widget in other projects.

## 🔗 Using the Widget in Other Projects

### Method 1: Basic Embed (Auto-mount)

Add this to any HTML page:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <h1>Welcome to my website!</h1>
    
    <!-- Embed the chat widget -->
    <script src="https://your-vercel-domain.vercel.app/my-widget.umd.cjs"></script>
</body>
</html>
```

### Method 2: Custom Configuration

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <h1>Welcome to my website!</h1>
    
    <!-- Load the widget -->
    <script src="https://your-vercel-domain.vercel.app/my-widget.umd.cjs"></script>
    
    <!-- Configure and mount -->
    <script>
        ChatWidget.mount({
            position: 'bottom-left',
            theme: 'dark',
            title: 'Need help?',
            buttonText: 'Contact Support',
            onChatStart: () => {
                console.log('User started chat');
                // Add your custom logic here
            }
        });
    </script>
</body>
</html>
```

### Method 3: React/Next.js Project

```jsx
// In your React component
import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // Load the widget script
    const script = document.createElement('script');
    script.src = 'https://your-vercel-domain.vercel.app/my-widget.umd.cjs';
    script.onload = () => {
      // Widget is loaded, now configure it
      if (window.ChatWidget) {
        window.ChatWidget.mount({
          position: 'bottom-right',
          theme: 'light',
          title: 'React Widget',
          onChatStart: () => {
            console.log('Chat started from React!');
          }
        });
      }
    };
    document.head.appendChild(script);

    // Cleanup
    return () => {
      if (window.ChatWidget) {
        window.ChatWidget.unmount();
      }
    };
  }, []);

  return (
    <div>
      <h1>My React App</h1>
      {/* Your app content */}
    </div>
  );
}
```

### Method 4: WordPress Site

Add this to your WordPress theme's `footer.php`:

```php
<!-- Chat Widget -->
<script src="https://your-vercel-domain.vercel.app/my-widget.umd.cjs"></script>
<script>
ChatWidget.mount({
    position: 'bottom-right',
    title: 'WordPress Support',
    buttonText: 'Get Help'
});
</script>
```

## 🧪 Testing Your Deployment

1. **Visit your Vercel URL** to see the landing page
2. **Test the demo:** `https://your-vercel-domain.vercel.app/demo.html`
3. **Test the widget:** `https://your-vercel-domain.vercel.app/test-widget.html`

## 🔧 Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Widget position |
| `theme` | `'light' \| 'dark'` | `'light'` | Widget theme |
| `title` | `string` | `'Hi there! Need help?'` | Widget title |
| `buttonText` | `string` | `'Start Chat'` | Button text |
| `containerId` | `string` | `'chat-widget-container'` | Container ID |
| `onChatStart` | `() => void` | `undefined` | Callback function |

## 🚨 Troubleshooting

### Widget Not Loading
- Check browser console for errors
- Verify the Vercel URL is correct
- Ensure the script is loaded after DOM is ready

### CORS Issues
- The widget includes CORS headers in `vercel.json`
- If you still have issues, contact Vercel support

### Build Failures
- Check that all dependencies are in `package.json`
- Verify the build command: `npm run build:widget`
- Check Vercel build logs for errors

## 📈 Analytics & Monitoring

Add analytics to track widget usage:

```javascript
ChatWidget.mount({
    onChatStart: () => {
        // Google Analytics
        gtag('event', 'chat_widget_started', {
            event_category: 'engagement',
            event_label: 'chat_widget'
        });
        
        // Custom tracking
        console.log('Chat widget used');
    }
});
```

## 🔄 Updates & Maintenance

1. **Update your code locally**
2. **Push to GitHub**
3. **Vercel automatically redeploys**
4. **All embedded widgets get the update automatically**

## 💡 Pro Tips

1. **Use a custom domain** for better branding
2. **Set up environment variables** for different environments
3. **Monitor performance** with Vercel Analytics
4. **Version your widget** for breaking changes

## 🎉 Success!

Your embeddable chat widget is now live and ready to be used in any project! 

**Next steps:**
- Test it on different websites
- Add more features (chat interface, API integration)
- Monitor usage and performance
- Gather user feedback

---

**Need help?** Check the [Vercel documentation](https://vercel.com/docs) or create an issue in your GitHub repository. 