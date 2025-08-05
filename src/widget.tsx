
import { Button } from "@/components/ui/button";

const ChatWidget = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border p-4 rounded-xl shadow-lg max-w-xs w-full">
      <p className="mb-2 font-medium">Hi there! Need help?</p>
      <Button variant="default">Start Chat</Button>
    </div>
  );
};

export default ChatWidget;
