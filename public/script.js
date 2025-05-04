// Conecta com o servidor via Socket.IO (garanta que <script src="/socket.io/socket.io.js"></script> esteja incluído no HTML antes deste script!)
const socket = io();

// Elementos DOM
const form = document.getElementById("form");
const input = document.getElementById("input");
const messagesList = document.getElementById("messages");
const minimizeBtn = document.getElementById("minimize-btn");
const chatContainer = document.getElementById("chat-container");
let isMinimized = false;

// Envio de mensagens
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const mensagem = input.value.trim();
  if (mensagem !== '') {
    socket.emit('chat message', mensagem);
    input.value = '';
  }
});

// Recebimento de mensagens
socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg;
  messagesList.appendChild(item);
  messagesList.scrollTop = messagesList.scrollHeight;
});

// Minimizar/maximizar chat
minimizeBtn.addEventListener('click', () => {
  isMinimized = !isMinimized;
  chatContainer.style.height = isMinimized ? '40px' : '250px';
  messagesList.style.display = isMinimized ? 'none' : 'block';
  form.style.display = isMinimized ? 'none' : 'flex';
  minimizeBtn.textContent = isMinimized ? '➕' : '➖';
});

// Carrossel lateral automático
const carrossel = document.getElementById('carrossel');
let slideIndex = 0;
const total = document.querySelectorAll('#carrossel .slide').length;

setInterval(() => {
  slideIndex = (slideIndex + 1) % total;
  carrossel.style.transform = `translateX(-${slideIndex * 100}%)`;
}, 4000);

// Bot interativo (respostas simuladas)
function responderBot(tipo) {
  const respostas = {
    jogo: "🗓️ FURIA vs Team Liquid - 30/04 às 20h (ESL Pro League)",
    ranking: "📊 FURIA está em #4 no ranking mundial 🌍",
    resultado: "✅ Última partida: vitória 2x1 contra BIG.",
    destaque: "🔥 Destaque: KSCERATO — 28 kills e clutch decisivo!"
  };

  const botBox = document.getElementById('bot-messages');
  const novaMsg = document.createElement('p');
  novaMsg.textContent = respostas[tipo] || "❓ Informação não disponível.";
  novaMsg.style.margin = '4px 0';
  botBox.appendChild(novaMsg);
  botBox.scrollTop = botBox.scrollHeight;
}







