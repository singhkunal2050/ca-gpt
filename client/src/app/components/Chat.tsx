import React, { useState, useEffect } from 'react';
type Message = {
    sender: string;
    content: string;
};

function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([{ sender: 'bot', content: "Hello! How can I assist you?" }]);
  }, []);

  const handleSendMessage = (e:any) => {
    e.preventDefault();
    const message = e.target.message.value;
    if (message.trim() !== '') {
      setMessages([...messages, { sender: 'user', content: message }]);
      e.target.reset();
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    const chatContainer = document.getElementById('chat-container');
    if(chatContainer){
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden">
      <div id="chat-container" className="flex flex-col h-[80vh] p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
          >
            <div
              className={`rounded-lg px-4 py-2 ${
                message.sender === 'user' ? 'bg-[#DD81FF] text-black' : 'bg-gray-200'
              }`}
            >
              <p className={message.sender === 'user' ? 'text-right' : ''}>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex items-center p-0 bg-white">
        <input
          type="text"
          name="message"
          placeholder="Type your message..."
          className="flex-growborder-0 rounded-lg py-2 px-4 focus:outline-none flex-1"
          autoComplete="off"
          required
        />
        <button
          type="submit"
          className="ml-2"
        >
         <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="48"><path d="M120-160v-640l760 320-760 320Zm60-93 544-227-544-230v168l242 62-242 60v167Zm0 0v-457 457Z"/></svg>
        </button>
      </form>
    </div>
  );
}

export default ChatComponent;
