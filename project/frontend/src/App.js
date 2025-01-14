import React, { useState } from "react";
import "./Dark.css";

function formato_presentacion(data) {
  let html = `<h1>${data.titulo}</h1>`;

  delete data.titulo;

  for (const key in data) {
    html += `<h2>${key}</h2>: <p>${data[key]}</p>`;
  }
  return html;
  
}

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      // Agregar el mensaje del usuario a la lista de mensajes
      const userMessage = { user: "User", message: input };
      setMessages([...messages, userMessage]);

      // Enviar el mensaje al backend de Django
      fetch("/api/recibir_mensaje/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mensaje: input }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Agregar la respuesta del backend a la lista de mensajes
          const botMessage = { user: "Bot", message: formato_presentacion(data)};
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        })
        .catch((error) => console.error("Error:", error));
    
      setInput("");
      if (Object.keys(messages).length === 0) {
        document.querySelector(".chat-messages").setAttribute("style", "display: flex;");
      }
      document.querySelector(".chat-messages").scrollTop = document.querySelector(".chat-messages").scrollHeight;
    }
  };

  return (
      <div className="chat-container">
        <div className="chat-header">
          <h1>Bienvenido a BotRamsey</h1>
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message-block-${message.user === "User" ? "user" : "bot"}`}>
              <span className={`message-${message.user === "User" ? "user" : "bot"}`}>
                {message.user}: 
              </span>
              {message.user === "User" ? <p>{message.message}</p> : <span dangerouslySetInnerHTML={{ __html: message.message}} />}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="¿Que vamos a cocinar hoy?"
          />
          <button onClick={sendMessage}>Enviar</button>
        </div>
      </div>
  );
}

export default ChatBot;
