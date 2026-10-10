const pix = require('pixcore');
const os = require('os');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

// Helper function to convert any audio buffer to WhatsApp PTT (OGG/Opus) format
async function convertToPtt(buffer) {
    return new Promise((resolve, reject) => {
        const tmpDir = os.tmpdir();
        const inputPath = path.join(tmpDir, `input_${Date.now()}.mp3`);
        const outputPath = path.join(tmpDir, `output_${Date.now()}.ogg`);

        fs.writeFileSync(inputPath, buffer);

        ffmpeg(inputPath)
            .audioCodec('libopus')
            .format('ogg')
            .audioChannels(1)
            .audioFrequency(48000)
            .on('error', (err) => {
                try { fs.unlinkSync(inputPath); } catch {}
                try { fs.unlinkSync(outputPath); } catch {}
                reject(err);
            })
            .on('end', () => {
                try {
                    const outputBuffer = fs.readFileSync(outputPath);
                    fs.unlinkSync(inputPath);
                    fs.unlinkSync(outputPath);
                    resolve(outputBuffer);
                } catch (e) {
                    reject(e);
                }
            })
            .save(outputPath);
    });
}

module.exports = {
    name: 'alive',
    description: 'Check bot status with voice note and dynamic info',
    aliases: ['status', 'runtime'],
    tags: ['main'],
    command: /^(alive|status|runtime)$/i,

    async execute(sock, m) {
        try {
            await m.react('⚡');

            // Dynamic Uptime Calculation
            const uptimeSeconds = process.uptime();
            const days = Math.floor(uptimeSeconds / (3600 * 24));
            const hours = Math.floor((uptimeSeconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((uptimeSeconds % 3600) / 60);
            const seconds = Math.floor(uptimeSeconds % 60);
            const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

            // System Memory RAM
            const totalMem = (os.totalmem() / 1024 / 1024).toFixed(0);
            const freeMem = (os.freemem() / 1024 / 1024).toFixed(0);
            const usedMem = totalMem - freeMem;

            // Current Time & Date (Asia/Kolkata)
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
            const dateString = now.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });

            // Image Thumbnail Generation
            const imageResponse = await fetch('https://spider-avik.zone.id/file/5b2kfp.jpeg');
            const imageBuffer = await imageResponse.arrayBuffer();
            const img = await pix.read(Buffer.from(imageBuffer));
            const resized = await img.resize(300, 300, { fit: 'cover' });
            const thumb = await resized.toBuffer({ format: 'jpeg', quality: 50 });

            // Unique Layout Caption
            const aliveCaption = `╭━━━〔 *SYSTEM STATUS* 〕━━━⬣
┃ 🟢 *Bot:* Online & Active
┃ ⏱️ *Uptime:* ${uptimeString}
┃ 💾 *RAM:* ${usedMem}MB / ${totalMem}MB
┃ 📅 *Date:* ${dateString}
┃ ⏰ *Time:* ${timeString}
╰━━━━━━━━━━━━━━━━━━━━━━⬣\n_⚡ Powered by Custom Core_`;

            // Audio Fetch & Conversion
            const audioUrl = 'https://spider-avik.zone.id/file/jwfyt2.mpeg';
            const audioResponse = await fetch(audioUrl);
            if (!audioResponse.ok) throw new Error('Failed to fetch audio url');
            const rawAudioBuffer = await audioResponse.arrayBuffer();

            // Convert raw audio buffer to real WhatsApp PTT format using FFmpeg
            const pttBuffer = await convertToPtt(Buffer.from(rawAudioBuffer));

            const fakeQuoted = {
                key: {
                    remoteJid: m.from,
                    fromMe: false,
                    participant: m.sender,
                    id: 'ALIVE_STATUS_' + Date.now()
                },
                message: {
                    imageMessage: {
                        mimetype: 'image/jpeg',
                        jpegThumbnail: thumb,
                        caption: aliveCaption
                    }
                }
            };

            await sock.sendMessage(m.from, {
                audio: pttBuffer,
                mimetype: 'audio/ogg; codecs=opus',
                ptt: true
            }, { quoted: fakeQuoted });

        } catch (err) {
            console.error('❌ Alive Error:', err);
            await m.reply('⚠️ Error executing alive command.');
        }
    },
};
