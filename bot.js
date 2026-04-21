const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  authStrategy: new LocalAuth(),
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
