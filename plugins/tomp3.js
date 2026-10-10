const axios = require('axios');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const FormData = require('form-data');

module.exports = {
    name: 'tomp3',
    description: 'Convert video to MP3 using an API',
    aliases: ['toaudio', 'mp3'],
    command: /^.?(tomp3|toaudio|mp3)/i,

    async execute(sock, m, args) {
        await m.react('🔄');
        const chatId = m.key.remoteJid;

        let targetMsg = null;
        let isVideoFound = false;

        // Check karo ki video ko reply kiya hai ya direct video bheja hai
        const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        if (quoted && (quoted.videoMessage || quoted.documentMessage)) {
            const quotedContext = m.message.extendedTextMessage.contextInfo;
            targetMsg = {
                key: {
                    remoteJid: chatId,
                    id: quotedContext.stanzaId,
                    participant: quotedContext.participant,
                    fromMe: false
                },
                message: quoted
            };
            isVideoFound = true;
        } else if (m.message?.videoMessage || m.msg?.mimetype?.startsWith('video')) {
            targetMsg = m;
            isVideoFound = true;
        }

        if (!isVideoFound) {
            return m.reply("Kripya kisi video ko reply karke ya video ke sath `.tomp3` likhein!");
        }

        try {
            await sock.sendMessage(chatId, { react: { text: '⏳', key: m.key } });
            await m.reply("📥 Video download ho raha hai, thoda intezaar karein...");

            // Video buffer download karo WhatsApp se
            const buffer = await downloadMediaMessage(
                targetMsg,
                'buffer',
                {},
                { logger: console }
            );

            // API par video upload karke MP3 convert karne ka setup
            // Yaha hum FormData ka use karke video file ko API par bhejenge
            const form = new FormData();
            form.append('file', buffer, { filename: 'video.mp4', contentType: 'video/mp4' });

            // Example API endpoint (Aap apne hisab se koi bhi working video-to-audio convert API laga sakte ho)
            const apiRes = await axios.post('https://api.siputzx.my.id/api/convert/toaudio', form, {
                headers: {
                    ...form.getHeaders()
                }
            });

            const result = apiRes.data;
            const audioUrl = result?.data?.url || result?.url || result?.audio;

            if (!audioUrl) {
                return m.reply("Video ko MP3 me convert karne mein API fail ho gayi.");
            }

            // Convert hone ke baad audio file send kar do
            await sock.sendMessage(chatId, {
                audio: { url: audioUrl },
                mimetype: 'audio/mp4',
                ptt: false
            }, { quoted: m });

            await m.react('✅');

        } catch (err) {
            console.error('API Video to MP3 Error:', err);
            m.reply('Video convert karne mein error aa gaya.');
        }
    }
};

