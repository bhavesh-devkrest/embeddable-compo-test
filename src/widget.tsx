
import { Button } from "@/components/ui/button";
import { useState } from "react";
import "./widget.css";

export interface ChatWidgetConfig {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'light' | 'dark';
  title?: string;
  buttonText?: string;
  onChatStart?: () => void;
}

interface ChatWidgetProps {
  config?: ChatWidgetConfig;
}

const ChatWidget = ({ config = {} }: ChatWidgetProps) => {
  const {
    position = 'bottom-right',
    theme = 'light',
    title = 'Hi there! Need help?',
    buttonText = 'Start Chat',
    onChatStart
  } = config;

  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    'bottom-right': 'bottom-right',
    'bottom-left': 'bottom-left',
    'top-right': 'top-right',
    'top-left': 'top-left'
  };

  const themeClasses = {
    light: 'theme-light',
    dark: 'theme-dark'
  };

  const handleChatStart = () => {
    setIsOpen(true);
    onChatStart?.();
  };

  return (
    <div className={`chat-widget ${positionClasses[position]} ${themeClasses[theme]} p-4`}>
      <p className="mb-2 font-medium">{title}</p>
      <Button 
        variant="default" 
        onClick={handleChatStart}
        className="w-full"
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default ChatWidget;
