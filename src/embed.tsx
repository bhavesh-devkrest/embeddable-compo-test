
import { createRoot } from "react-dom/client";
import ChatWidget from "./widget";

// Function to mount widget
export function mountChatWidget(containerId: string) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const root = createRoot(container);
  root.render(<ChatWidget />);
}

// Expose globally
(window as any).mountChatWidget = mountChatWidget;
