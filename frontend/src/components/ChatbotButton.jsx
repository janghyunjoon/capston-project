import React, { useEffect } from "react";
import "../style/components/ChatbotButton.scss";

const N8N_CHAT_URL =
  "https://37fb393bdd9c.ngrok-free.app/webhook/82edfa8d-d7c2-4401-91c9-9f4b57d88529/chat";

const WIDGET_CONFIG = {
  n8nChatUrl: N8N_CHAT_URL,
  metadata: {},
  theme: {
    button: {
      iconColor: "#373434",
      backgroundColor: "#ffc8b8",
      // 필요하면 위치/크기 조절 가능 (문서 예시에도 있음) :contentReference[oaicite:1]{index=1}
      right: 20,
      bottom: 20,
      size: 52,
      borderRadius: "rounded",
    },
    chatWindow: {
      borderRadiusStyle: "rounded",
      avatarBorderRadius: 25,
      messageBorderRadius: 6,
      showTitle: true,
      title: "N8N Chat UI Bot",
      titleAvatarSrc: "https://www.svgrepo.com/show/339963/chat-bot.svg",
      avatarSize: 40,
      welcomeMessage: "Hello! This is the default welcome message",
      errorMessage: "Please connect me to n8n first",
      backgroundColor: "#ffffff",
      height: 600,
      width: 400,
      fontSize: 16,
      starterPrompts: ["Who are you?", "What do you do?"],
      starterPromptFontSize: 15,
      renderHTML: false,
      clearChatOnReload: false,
      showScrollbar: false,
      botMessage: {
        backgroundColor: "#f36539",
        textColor: "#fafafa",
        showAvatar: true,
        avatarSrc: "https://www.svgrepo.com/show/334455/bot.svg",
        showCopyToClipboardIcon: false,
      },
      userMessage: {
        backgroundColor: "#fff6f3",
        textColor: "#050505",
        showAvatar: true,
        avatarSrc: "https://www.svgrepo.com/show/532363/user-alt-1.svg",
      },
      textInput: {
        placeholder: "Type your query",
        backgroundColor: "#ffffff",
        textColor: "#1e1e1f",
        sendButtonColor: "#f36539",
        maxChars: 50,
        maxCharsWarningMessage:
          "You exceeded the characters limit. Please input less than 50 characters.",
        autoFocus: false,
        borderRadius: 6,
        sendButtonBorderRadius: 50,
      },
      uploadsConfig: {
        enabled: true,
        acceptFileTypes: ["jpeg", "jpg", "png", "pdf"],
        maxFiles: 5,
        maxSizeInMB: 10,
      },
      voiceInputConfig: {
        enabled: true,
        maxRecordingTime: 15,
        recordingNotSupportedMessage:
          "To record audio, use modern browsers like Chrome or Firefox that support audio recording",
      },
    },
  },
};

function ChatbotButton() {
  useEffect(() => {
    // ✅ 중복 로드 방지
    if (window.__N8NCHATUI_INITED__) return;
    window.__N8NCHATUI_INITED__ = true;

    // ✅ 번들러(Vite/CRA)에서 원격 ESM import가 꼬이는 걸 피하려고
    //    "module script"를 DOM에 주입해서 로드함.
    const script = document.createElement("script");
    script.type = "module";
    script.defer = true;

    script.textContent = `
      import Chatbot from "https://cdn.n8nchatui.com/v1/embed.js";
      Chatbot.init(${JSON.stringify(WIDGET_CONFIG)});
      // 문서의 window.Chatbot API(open/close/sendMessage) 쓰기 위해 전역 접근 보장 :contentReference[oaicite:2]{index=2}
      window.Chatbot = window.Chatbot || Chatbot;
    `;

    document.body.appendChild(script);

    return () => {
      // 라우트 이동으로 언마운트돼도 위젯은 유지하고 싶으면 제거 안 하는게 보통 편함.
      // 완전 제거가 필요하면 아래 주석 해제
      // script.remove();
    };
  }, []);

  const handleClick = (e) => {
    // 위젯이 준비되면 링크 대신 팝업을 열고,
    // 아직 준비 전이면 그냥 href로 새 탭 이동(폴백)
    if (window.Chatbot?.open) {
      e.preventDefault();
      window.Chatbot.open();
    }
  };

  return (
    <div className="chatbot">
      {/* ✅ 기존 SCSS가 a 태그에 걸려있을 확률이 높아서 a 유지 */}
      <a
        className="chatbot-link"
        href={N8N_CHAT_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        JUDGE AI 써 보기 ↗
      </a>
    </div>
  );
}

export default ChatbotButton;
