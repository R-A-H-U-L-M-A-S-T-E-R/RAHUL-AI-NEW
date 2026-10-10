const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

// Temp directory setup
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// FFmpeg Conversion Promise
const convertToMp3 = (inputBuffer) => {
    return new Promise((resolve, reject) => {
        const tempInput = path.join(uploadsDir, `input_${Date.now()}.tmp`);
        const tempOutput = path.join(uploadsDir, `output_${Date.now()}.mp3`);

        fs.writeFileSync(tempInput, inputBuffer);

        ffmpeg(tempInput)
            .toFormat('mp3')
            .audioBitrate('128k')
            .on('end', () => {
                try {
                    const mp3Buffer = fs.readFileSync(tempOutput);
                    if (fs.existsSync(tempInput)) fs.unlinkSync(tempInput);
                    if (fs.existsSync(tempOutput)) fs.unlinkSync(tempOutput);
                    resolve(mp3Buffer);
                } catch (e) {
                    reject(e);
                }
            })
            .on('error', (err) => {
                if (fs.existsSync(tempInput)) fs.unlinkSync(tempInput);
                if (fs.existsSync(tempOutput)) fs.unlinkSync(tempOutput);
                reject(err);
            })
            .save(tempOutput);
    });
};

Sparky({
    name: "mp3",
    fromMe: false, // self and public dohi messages detect hotiil
    category: "converters",
    desc: "Converts video/audio to MP3. Powered by RAHUL-AI"
}, async ({ m, conn }) => {
    try {
        // Quoted message check
        if (!m.quoted) {
            return await m.reply("Krupaya audio kiwa video message la reply karun `.mp3` liha! - RAHUL-AI");
        }

        // Broad media check (covers all audio/video formats)
        const mime = m.quoted.mimetype || m.quoted.mediaType || "";
        const isMedia = /audio|video/.test(mime) || m.quoted.message?.audioMessage || m.quoted.message?.videoMessage;

        if (!isMedia) {
            return await m.reply("Reply keleli file audio kiwa video nahiye! - RAHUL-AI");
        }

        // Reaction for processing
        if (typeof m.react === 'function') await m.react('⏳');

        // Download media safely
        let mediaBuffer;
        if (typeof m.quoted.download === 'function') {
            mediaBuffer = await m.quoted.download();
        } else if (typeof m.download === 'function') {
            mediaBuffer = await m.download(m.quoted);
        }

        if (!mediaBuffer) {
            return await m.reply("Media download kartana problem ala! - RAHUL-AI");
        }

        // Convert process
        const mp3Buffer = await convertToMp3(mediaBuffer);

        // Send converted MP3 file
        if (typeof m.sendMsg === 'function') {
            await m.sendMsg(m.jid, mp3Buffer, { mimetype: "audio/mpeg", quoted: m }, 'audio');
        } else if (conn && typeof conn.sendMessage === 'function') {
            await conn.sendMessage(m.jid, { audio: mp3Buffer, mimetype: 'audio/mpeg' }, { quoted: m });
        }

        if (typeof m.react === 'function') await m.react('✅');

    } catch (error) {
        console.error("MP3 Conversion Error Details:", error);
        if (typeof m.react === 'function') await m.react('❌');
        await m.reply("Conversion error! Terminal / Console log check kara. - RAHUL-AI");
    }
});
