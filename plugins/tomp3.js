const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

// Local MP3 Conversion Helper Function
const convertToMp3 = (inputBuffer) => {
    return new Promise((resolve, reject) => {
        const tempInput = path.join('uploads', `input_${Date.now()}.tmp`);
        const tempOutput = path.join('uploads', `output_${Date.now()}.mp3`);

        // Ensure uploads folder exists
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads', { recursive: true });
        }

        fs.writeFileSync(tempInput, inputBuffer);

        ffmpeg(tempInput)
            .toFormat('mp3')
            .audioBitrate('128k')
            .on('end', () => {
                const mp3Buffer = fs.readFileSync(tempOutput);
                // Cleanup temp files
                if (fs.existsSync(tempInput)) fs.unlinkSync(tempInput);
                if (fs.existsSync(tempOutput)) fs.unlinkSync(tempOutput);
                resolve(mp3Buffer);
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
    fromMe: isPublic,
    category: "converters",
    desc: "Converts video/audio to MP3. Powered by RAHUL-AI"
}, async ({ m, args }) => {
    if (!m.quoted || !(m.quoted.message.audioMessage || m.quoted.message.videoMessage || (m.quoted.message.documentMessage && m.quoted.message.documentMessage.mimetype === 'video/mp4'))) {
        return await m.reply("Please reply to an audio or video to convert it into MP3! - RAHUL-AI");
    }
    
    await m.react('⏫');

    try {
        const mediaBuffer = await m.quoted.download();
        const mp3Buffer = await convertToMp3(mediaBuffer);

        await m.sendMsg(m.jid, mp3Buffer, { mimetype: "audio/mpeg", quoted: m }, 'audio');
        return await m.react('✅');
    } catch (error) {
        console.error("MP3 Conversion Error:", error);
        await m.reply("Conversion failed! FFmpeg check kara server var install ahe ka. - RAHUL-AI");
        return await m.react('❌');
    }
});
