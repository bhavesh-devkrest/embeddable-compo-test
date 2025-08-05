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

// Function to safely create React root
function createSafeRoot(container: HTMLElement) {
  try {
    // Check if React is available
    if (typeof window !== 'undefined' && window.React) {
      return createRoot(container);
    } else {
      throw new Error('React not available');
    }
  } catch (error) {
    console.error('Failed to create React root:', error);
    throw error;
  }
}

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

    // Mount the widget with error handling
    try {
      const root = createSafeRoot(container);
      root.render(<ChatWidget config={widgetConfig} />);

      console.log('Chat widget mounted successfully');
      return root;
    } catch (reactError) {
      console.error('React mounting error:', reactError);
      
      // Fallback: Create a simple widget without React
      container.innerHTML = `
        <div class="chat-widget ${widgetConfig.position || 'bottom-right'} ${widgetConfig.theme || 'light'} p-4" 
             style="position: fixed; z-index: 999999; max-width: 320px; width: 100%; border-radius: 12px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15); background: ${widgetConfig.theme === 'dark' ? '#1f2937' : '#ffffff'}; color: ${widgetConfig.theme === 'dark' ? '#f9fafb' : '#111827'}; border: 1px solid ${widgetConfig.theme === 'dark' ? '#374151' : '#e5e7eb'};">
          <p style="margin-bottom: 8px; font-weight: 500;">${widgetConfig.title || 'Hi there! Need help?'}</p>
          <button onclick="this.parentElement.remove()" 
                  style="width: 100%; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">
            ${widgetConfig.buttonText || 'Start Chat'}
          </button>
        </div>
      `;
      
      console.log('Chat widget mounted with fallback');
      return null;
    }
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
    // Wait for DOM to be ready and React to be available
    const waitForReact = () => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForReact);
        return;
      }
      
      // Wait a bit more for React to be fully loaded
      setTimeout(() => {
        try {
          mountChatWidget();
        } catch (error) {
          console.warn('Failed to auto-mount widget:', error);
          // Don't throw, just log the warning
        }
      }, 500); // Increased timeout for React to load
    };
    
    waitForReact();
  }
}

// Also expose for CommonJS environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    mount: mountChatWidget,
    unmount: unmountChatWidget,
    config: defaultConfig
  };
} 