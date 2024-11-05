const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const socket = new WebSocket("ws://192.168.1.6:3000"); // URL do seu servidor WebSocket

let uidClient = "";

// Função para adicionar uma mensagem
function addMessage(text, isSent) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", isSent ? "sent" : "received");
  messageElement.innerText = text;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Rolagem automática
}

// Evento de conexão do WebSocket
socket.addEventListener("open", () => {
  console.log("Conectado ao servidor WebSocket");

  // Envia a mensagem de registro ao servidor
  const registerMessage = {
    type: "register",
    data: {
      ID: 123456789,
      ID_LOJA: 1515,
      NOME: "Miranda Vidoto",
      PASS: "1223",
      FUNCAO: "Dev",
      STATUS: true,
    },
  };
  socket.send(JSON.stringify(registerMessage));
});

// Evento de recebimento de mensagens do servidor
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
    console.log(message);
    
  if (message.type === "register") {
    uidClient = message.UID
  }

  // Verifica o tipo da mensagem recebida
  if (message.type === "message" && uidClient !==message.data.UID) {
    addMessage(message.data.NAME + ":" + message.messege, false); // Adiciona mensagem recebida
  }
});

// Evento de clique no botão "Enviar"
sendButton.addEventListener("click", () => {
  const messageText = messageInput.value;
  if (messageText) {
    addMessage(messageText, true); // Mensagem enviada
    socket.send(
      JSON.stringify({
        type: "message",
        message: messageText,
      })
    ); // Envia a mensagem ao servidor
    messageInput.value = ""; // Limpar o campo de entrada
  }
});

// Evento de pressionar a tecla "Enter"
messageInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendButton.click();
  }
});
