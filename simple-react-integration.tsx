import { useEffect } from 'react';

// Type declarations for the widget
declare global {
  interface Window {
    ChatWidget: {
      mount: (config: any) => void;
      unmount: () => void;
    };
  }
}

// Simple hook for widget integration
export const useChatWidget = (config: {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'light' | 'dark';
  title?: string;
  buttonText?: string;
  onChatStart?: () => void;
}) => {
  useEffect(() => {
    // Load the widget script
    const script = document.createElement('script');
    script.src = 'https://embeddable-compo-test.vercel.app/my-widget.umd.cjs';
    script.async = true;
    script.crossOrigin = 'anonymous';
    
    script.onload = () => {
      console.log('Widget script loaded');
      if (window.ChatWidget) {
        window.ChatWidget.mount(config);
      }
    };

    script.onerror = () => {
      console.error('Failed to load widget script');
    };

    document.head.appendChild(script);

    // Cleanup
    return () => {
      if (window.ChatWidget) {
        window.ChatWidget.unmount();
      }
    };
  }, [config]);

  return {
    mount: () => {
      if (window.ChatWidget) {
        window.ChatWidget.mount(config);
      }
    },
    unmount: () => {
      if (window.ChatWidget) {
        window.ChatWidget.unmount();
      }
    }
  };
};

// Example usage in your App component
export const ChatWidgetExample = () => {
  const { mount, unmount } = useChatWidget({
    position: 'bottom-right',
    theme: 'light',
    title: 'Need help?',
    buttonText: 'Start Chat',
    onChatStart: () => {
      console.log('Chat started from React!');
    }
  });

  return (
    <div>
      {/* Your component content */}
      {/* The widget will be mounted automatically */}
    </div>
  );
}; 