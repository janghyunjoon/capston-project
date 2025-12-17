import React from 'react'
import "../style/components/ChatbotButton.scss";

function ChatbotButton() {
  return (
    <div className="chatbot">
      <a 
        href="https://sole-mighty-seriously.ngrok-free.app/webhook/82edfa8d-d7c2-4401-91c9-9f4b57d88529/chat" 
        target="_blank" 
        rel="noopener noreferrer" 
      >

        JUDGE AI 써 보기 ↗
      </a>
    </div>
  )
}

export default ChatbotButton;