const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const socket = new WebSocket("ws://192.168.1.6:3000/socket"); // URL do seu servidor WebSocket

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
    user: {
      ID: 123456789,
      ID_LOJA: 1515,
      NOME: "Web",
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
    uidClient = message.uid;
    return;
  }

  if (message.type === "online"&& uidClient !== message.uid) {
    addMessage(message.name + " Online", false);
    return;
  }
  if (message.type === "offline"&& uidClient !== message.uid) {
    addMessage(message.name + " Offline", false);
    return;
  }
  // Verifica o tipo da mensagem recebida
  if (message.type === "message" && uidClient !== message.uid) {
    addMessage(message.name + ":" + message.message, false); // Adiciona mensagem recebida
    return;
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
