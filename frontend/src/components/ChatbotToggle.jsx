import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Optional: any icon library

function ChatbotToggle() {
  const [visible, setVisible] = useState(true);
  const [chatbotLoaded, setChatbotLoaded] = useState(false);

  const toggleChatbot = () => {
    const iframe = document.querySelector("iframe[src*='chatbase']");
    if (iframe && iframe.parentElement) {
      iframe.parentElement.style.display = visible ? "none" : "block";
      setVisible(!visible);
    }
  };

  useEffect(() => {
    const checkChatbot = setInterval(() => {
      const iframe = document.querySelector("iframe[src*='chatbase']");
      if (iframe && iframe.parentElement) {
        iframe.parentElement.style.zIndex = "9999";
        setChatbotLoaded(true);
        clearInterval(checkChatbot);
      }
    }, 500);

    return () => clearInterval(checkChatbot);
  }, []);

  if (!chatbotLoaded) return null;

  return (
    <button
      onClick={toggleChatbot}
      className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg z-[10000] flex items-center justify-center"
    >
      {visible ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
    </button>
  );
}

export default ChatbotToggle;
