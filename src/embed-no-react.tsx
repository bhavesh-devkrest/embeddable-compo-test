// Pure HTML/CSS/JS widget - no React dependencies
interface WidgetConfig {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'light' | 'dark';
  title?: string;
  buttonText?: string;
  onChatStart?: () => void;
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

// CSS styles for the widget
const widgetStyles = `
  .chat-widget-container {
    all: initial;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    box-sizing: border-box;
  }
  
  .chat-widget {
    position: fixed;
    z-index: 999999;
    max-width: 320px;
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    transition: all 0.2s ease;
    font-family: inherit;
    padding: 16px;
  }
  
  .chat-widget:hover {
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
  
  .chat-widget.bottom-right {
    bottom: 16px;
    right: 16px;
  }
  
  .chat-widget.bottom-left {
    bottom: 16px;
    left: 16px;
  }
  
  .chat-widget.top-right {
    top: 16px;
    right: 16px;
  }
  
  .chat-widget.top-left {
    top: 16px;
    left: 16px;
  }
  
  .chat-widget.theme-light {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    color: #111827;
  }
  
  .chat-widget.theme-dark {
    background: #1f2937;
    border: 1px solid #374151;
    color: #f9fafb;
  }
  
  .chat-widget-title {
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.4;
  }
  
  .chat-widget-button {
    width: 100%;
    padding: 8px 16px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.2s ease;
  }
  
  .chat-widget-button:hover {
    background: #2563eb;
  }
  
  .chat-widget-button:active {
    background: #1d4ed8;
  }
  
  @media (max-width: 480px) {
    .chat-widget {
      max-width: calc(100vw - 32px);
      margin: 0 16px;
    }
  }
`;

// Function to inject CSS styles
function injectStyles() {
  if (!document.getElementById('chat-widget-styles')) {
    const style = document.createElement('style');
    style.id = 'chat-widget-styles';
    style.textContent = widgetStyles;
    document.head.appendChild(style);
  }
}

// Function to create widget HTML
function createWidgetHTML(config: WidgetConfig): string {
  const { position = 'bottom-right', theme = 'light', title = 'Hi there! Need help?', buttonText = 'Start Chat' } = config;
  
  return `
    <div class="chat-widget ${position} ${theme}">
      <div class="chat-widget-title">${title}</div>
      <button class="chat-widget-button" onclick="window.chatWidgetHandleClick && window.chatWidgetHandleClick()">
        ${buttonText}
      </button>
    </div>
  `;
}

// Function to mount widget
export function mountChatWidget(config: WidgetConfig = {}) {
  const finalConfig = { ...defaultConfig, ...config };
  const { containerId, autoMount, onChatStart, ...widgetConfig } = finalConfig;

  try {
    // Inject styles
    injectStyles();

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

    // Create widget HTML
    const widgetHTML = createWidgetHTML(widgetConfig);
    container.innerHTML = widgetHTML;

    // Set up click handler
    if (onChatStart) {
      window.chatWidgetHandleClick = onChatStart;
    } else {
      window.chatWidgetHandleClick = () => {
        console.log('Chat started!');
      };
    }

    console.log('Chat widget mounted successfully');
    return container;
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
    const waitForDOM = () => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForDOM);
        return;
      }
      
      setTimeout(() => {
        try {
          mountChatWidget();
        } catch (error) {
          console.warn('Failed to auto-mount widget:', error);
        }
      }, 100);
    };
    
    waitForDOM();
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