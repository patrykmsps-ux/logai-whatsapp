const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const http = require('http');

const PORT = process.env.PORT || 3000;

// servidor simples só para manter o serviço vivo/observável
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Log.Ai WhatsApp bot online');
}).listen(PORT, () => {
  console.log(`HTTP server listening on ${PORT}`);
});

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: '/data/.wwebjs_auth'
  }),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on('qr', qr => {
  console.log('Escaneie o QR Code abaixo:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ Log.Ai conectado no WhatsApp!');
});

client.on('message', async msg => {
  console.log('📩', msg.body);

  if (msg.body.toLowerCase().includes('status')) {
    msg.reply('🚚 Tudo rodando. Log.Ai online.');
  } else {
    msg.reply('🤖 Recebi sua mensagem!');
  }
});

client.initialize();
