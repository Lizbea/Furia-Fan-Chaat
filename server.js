const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'landing.html'));
});

// Rota para o chat
app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Conexão WebSocket
io.on('connection', (socket) => {
  console.log('✅ Usuário conectado');

  socket.on('chat message', (msg) => {
    console.log('📨 Mensagem recebida:', msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('❌ Usuário desconectado');
  });
});

// Simulador de torcida com mensagens automáticas
const fakeNames = [
  "Gabriel Archimedes", "Doly", "Serjão Berranteiro", "Albertin", "Luanzin",
  "Dede", "Liz", "Anth Capivara", "Momo", "Beea", "Bruuu", "Imola",
  "Araucariano", "Primeira Dama"
];

const fakeMessages = [
  "GOOOO FURIAAAAA 🔥🔥🔥",
  "VAI COM TUDO, ART! 💣",
  "VAMOS VIRAR ESSE JOGO! 💪",
  "CADÊ O ACE DO KSCERATO? 😤",
  "QUE SPRAY FOI ESSEEEE?! 🚀",
  "FURIAAAA NA VEIAAAA 💜",
  "Beaaaa, arrasa mona, essa vaga é sua 💅🔥"
];

setInterval(() => {
  const randomName = fakeNames[Math.floor(Math.random() * fakeNames.length)];
  const randomMessage = fakeMessages[Math.floor(Math.random() * fakeMessages.length)];
  io.emit('chat message', `🎉 [${randomName}] ${randomMessage}`);
}, 5000);

// Inicia o servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

