import { useEffect, useRef } from 'react';

// Type declarations for the widget
declare global {
  interface Window {
    ChatWidget: {
      mount: (config: {
        position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
        theme?: 'light' | 'dark';
        title?: string;
        buttonText?: string;
        onChatStart?: () => void;
      }) => void;
      unmount: () => void;
    };
  }
}

// Custom hook for widget management
export const useChatWidget = (config: {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'light' | 'dark';
  title?: string;
  buttonText?: string;
  onChatStart?: () => void;
}) => {
  const widgetLoaded = useRef(false);

  useEffect(() => {
    // Load the widget script
    const loadWidget = async () => {
      if (widgetLoaded.current) return;

      try {
        // Check if script is already loaded
        const existingScript = document.querySelector('script[src*="my-widget.umd.cjs"]');
        if (existingScript) {
          widgetLoaded.current = true;
          return;
        }

        // Load the widget script
        const script = document.createElement('script');
        script.src = 'https://embeddable-compo-test.vercel.app/my-widget.umd.cjs';
        script.async = true;
        script.crossOrigin = 'anonymous';
        
        script.onload = () => {
          widgetLoaded.current = true;
          if (window.ChatWidget) {
            window.ChatWidget.mount(config);
          }
        };

        script.onerror = () => {
          console.error('Failed to load chat widget');
        };

        document.head.appendChild(script);
      } catch (error) {
        console.error('Error loading chat widget:', error);
      }
    };

    loadWidget();

    // Cleanup function
    return () => {
      if (window.ChatWidget) {
        window.ChatWidget.unmount();
      }
    };
  }, [config]);

  // Return functions to control the widget
  return {
    mount: (newConfig?: typeof config) => {
      if (window.ChatWidget) {
        window.ChatWidget.mount(newConfig || config);
      }
    },
    unmount: () => {
      if (window.ChatWidget) {
        window.ChatWidget.unmount();
      }
    }
  };
};

// React component for the chat widget
export const ChatWidgetComponent = ({ 
  position = 'bottom-right',
  theme = 'light',
  title = 'Need help?',
  buttonText = 'Start Chat',
  onChatStart
}: {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'light' | 'dark';
  title?: string;
  buttonText?: string;
  onChatStart?: () => void;
}) => {
  const { mount, unmount } = useChatWidget({
    position,
    theme,
    title,
    buttonText,
    onChatStart
  });

  // Optional: Add controls to your component
  const handleToggleWidget = () => {
    // You can add logic to show/hide the widget
    console.log('Toggle widget');
  };

  return (
    <div>
      {/* Your component content */}
      {/* The widget will be mounted automatically */}
    </div>
  );
};

// Example usage in your main App component
export const App = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">Your React App</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Welcome to your app</h2>
            <p className="text-muted-foreground">
              This is your React + Vite + shadcn app with an embedded chat widget.
              The widget should appear in the bottom-right corner.
            </p>
          </div>
        </div>
      </main>

      {/* The chat widget will be mounted automatically */}
      <ChatWidgetComponent 
        position="bottom-right"
        theme="light"
        title="Need help?"
        buttonText="Start Chat"
        onChatStart={() => {
          console.log('Chat started from React!');
          // Add your custom logic here
        }}
      />
    </div>
  );
}; 