import { useEffect, useState } from 'react';

// Debug component to test widget loading
export const DebugWidget = () => {
  const [status, setStatus] = useState('Loading...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWidget = async () => {
      try {
        setStatus('Loading widget script...');
        
        // Check if script is already loaded
        const existingScript = document.querySelector('script[src*="my-widget.umd.cjs"]');
        if (existingScript) {
          setStatus('Script already loaded');
          return;
        }

        // Load the widget script
        const script = document.createElement('script');
        script.src = 'https://embeddable-compo-test.vercel.app/my-widget.umd.cjs';
        script.async = true;
        
        script.onload = () => {
          setStatus('Script loaded successfully');
          console.log('Script loaded, checking for ChatWidget...');
          console.log('window.ChatWidget:', window.ChatWidget);
          
          // Wait a bit for initialization
          setTimeout(() => {
            if (window.ChatWidget) {
              setStatus('Mounting widget...');
              console.log('ChatWidget found! Mounting...');
              
              try {
                window.ChatWidget.mount({
                  position: 'bottom-right',
                  theme: 'light',
                  title: 'Debug Widget',
                  buttonText: 'Test Chat',
                  onChatStart: () => {
                    console.log('Chat started from debug!');
                    setStatus('Chat started!');
                  }
                });
                setStatus('Widget mounted successfully');
              } catch (mountError) {
                console.error('Error mounting widget:', mountError);
                setError(`Mount error: ${mountError}`);
              }
            } else {
              console.error('ChatWidget not found on window object');
              setError('ChatWidget not found on window object');
            }
          }, 500);
        };

        script.onerror = () => {
          console.error('Failed to load chat widget script');
          setError('Failed to load widget script');
        };

        document.head.appendChild(script);
      } catch (error) {
        console.error('Error loading widget:', error);
        setError(`Loading error: ${error}`);
      }
    };

    loadWidget();
  }, []);

  return (
    <div className="fixed top-4 left-4 z-50 bg-white border rounded-lg p-4 shadow-lg max-w-sm">
      <h3 className="font-semibold mb-2">Widget Debug</h3>
      <p className="text-sm mb-2">Status: {status}</p>
      {error && (
        <p className="text-sm text-red-600 mb-2">Error: {error}</p>
      )}
      <div className="text-xs text-gray-600">
        <p>Check browser console for details</p>
        <p>URL: https://embeddable-compo-test.vercel.app/my-widget.umd.cjs</p>
      </div>
    </div>
  );
};

// Simple hook for widget
export const useWidgetDebug = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embeddable-compo-test.vercel.app/my-widget.umd.cjs';
    script.async = true;
    
    script.onload = () => {
      console.log('Widget script loaded');
      setIsLoaded(true);
    };

    script.onerror = () => {
      console.error('Failed to load widget script');
      setError('Script failed to load');
    };

    document.head.appendChild(script);
  }, []);

  const mountWidget = () => {
    if (window.ChatWidget) {
      try {
        window.ChatWidget.mount({
          position: 'bottom-right',
          theme: 'light',
          title: 'Test Widget',
          buttonText: 'Start Chat',
          onChatStart: () => {
            console.log('Chat started!');
          }
        });
        console.log('Widget mounted successfully');
      } catch (error) {
        console.error('Error mounting widget:', error);
        setError(`Mount error: ${error}`);
      }
    } else {
      console.error('ChatWidget not available');
      setError('ChatWidget not available');
    }
  };

  return { isLoaded, error, mountWidget };
}; 