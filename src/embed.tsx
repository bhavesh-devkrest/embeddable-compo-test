
import { createRoot } from "react-dom/client";
import ChatWidget, { type ChatWidgetConfig } from "./widget";

// Global configuration interface
interface WidgetConfig extends ChatWidgetConfig {
  containerId?: string;
  autoMount?: boolean;
}

// Default configuration
const defaultConfig: WidgetConfig = {
  position: 'bottom-right',
  theme: 'light',
  title: 'Hi there! Need help?',
  buttonText: 'Start Chat',
  containerId: 'chat-widget-container',
  autoMount: true
};

// Function to mount widget
export function mountChatWidget(config: WidgetConfig = {}) {
  const finalConfig = { ...defaultConfig, ...config };
  const { containerId, autoMount, ...widgetConfig } = finalConfig;

  try {
    // Create container if it doesn't exist
    let container = document.getElementById(containerId!);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId!;
      container.className = 'chat-widget-container';
      document.body.appendChild(container);
    }

    // Clear existing content
    container.innerHTML = '';

    // Mount the widget
    const root = createRoot(container);
    root.render(<ChatWidget config={widgetConfig} />);

    console.log('Chat widget mounted successfully');
    return root;
  } catch (error) {
    console.error('Failed to mount chat widget:', error);
    throw error;
  }
}

// Function to unmount widget
export function unmountChatWidget(containerId: string = 'chat-widget-container') {
  try {
    const container = document.getElementById(containerId);
    if (container) {
      container.remove();
      console.log('Chat widget unmounted successfully');
    }
  } catch (error) {
    console.error('Failed to unmount chat widget:', error);
  }
}

// Auto-initialization when script loads
if (typeof window !== 'undefined') {
  // Expose functions globally
  (window as any).ChatWidget = {
    mount: mountChatWidget,
    unmount: unmountChatWidget,
    config: defaultConfig
  };

  // Auto-mount if configured
  if (defaultConfig.autoMount) {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        mountChatWidget();
      });
    } else {
      mountChatWidget();
    }
  }
}
