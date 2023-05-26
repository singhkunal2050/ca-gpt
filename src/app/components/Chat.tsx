import React, { useState, useEffect } from 'react';

function ChatComponent() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([{ sender: 'bot', content: "Hello! How can I assist you?" }]);
  }, []);

  const handleSendMessage = (e) => {
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
    chatContainer.scrollTop = chatContainer.scrollHeight;
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
              className={`bg-white rounded-lg px-4 py-2 ${
                message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              <p className={message.sender === 'user' ? 'text-right' : ''}>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex items-center p-4">
        <input
          type="text"
          name="message"
          placeholder="Type your message..."
          className="flex-grow border-gray-300 border-2 rounded-lg py-2 px-4 focus:outline-none"
          autoComplete="off"
          required
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatComponent;
