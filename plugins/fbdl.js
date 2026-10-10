const axios = require('axios');
const fs = require('fs');

module.exports = {
    name: 'facebook',
    description: 'Download Facebook videos',
    aliases: ['fb', 'fbdl', 'facebookdl'],
    tags: ['downloader'],
    command: /^\.?(facebook|fb|fbdl|facebookdl)$/i,

    async execute(sock, m, args) {
        try {
            if (!args.length) {
                return await m.reply(`ᴜsᴀɢᴇ: .ꜰᴀᴄᴇʙᴏᴏᴋ <ᴜʀʟ>

ᴇxᴀᴍᴘʟᴇ: .ꜰᴀᴄᴇʙᴏᴏᴋ https://www.facebook.com/share/r/12Jhv1vQ85G/`);
            }

            const url = args[0];

            if (!url.includes('facebook.com') && !url.includes('fb.watch')) {
                return await m.reply('ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴠᴀʟɪᴅ ꜰᴀᴄᴇʙᴏᴏᴋ ᴜʀʟ');
            }

            await m.reply('ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ꜰᴀᴄᴇʙᴏᴏᴋ ᴠɪᴅᴇᴏ...');

            const apiUrl = `https://api-rebix.zone.id/api/facebook?url=${encodeURIComponent(url)}`;

            const response = await axios.get(apiUrl);

            if (!response.data.status || !response.data.result) {
                return await m.reply('ғᴀɪʟᴇᴅ ᴛᴏ ꜰᴇᴛᴄʜ ꜰᴀᴄᴇʙᴏᴏᴋ ᴠɪᴅᴇᴏ\nᴘʟᴇᴀsᴇ ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ');
            }

            const result = response.data.result;
            const media = result.media || [];

            const videoUrl = media.find(item => item && item.startsWith('http') && !item.includes('play.google.com'));

            if (!videoUrl) {
                return await m.reply('ɴᴏ ᴠɪᴅᴇᴏ ᴜʀʟ ꜰᴏᴜɴᴅ');
            }

            const videoResponse = await axios.get(videoUrl, {
                responseType: 'arraybuffer'
            });

            const videoBuffer = Buffer.from(videoResponse.data);
            const fileName = `facebook_${Date.now()}.mp4`;
            const filePath = `./temp/${fileName}`;

            if (!fs.existsSync('./temp')) {
                fs.mkdirSync('./temp', { recursive: true });
            }

            fs.writeFileSync(filePath, videoBuffer);

            const title = result.metadata?.title || 'ɴᴏ ᴛɪᴛʟᴇ';

            const caption = `*ꜰᴀᴄᴇʙᴏᴏᴋ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*

ᴛɪᴛʟᴇ: ${title}

ᴅᴏᴡɴʟᴏᴀᴅᴇᴅ ʙʏ 𝚁𝙰𝙷𝚄𝙻 𝙼𝙰𝚂𝚃𝙴𝚁`;

            await sock.sendMessage(m.from, {
                video: fs.readFileSync(filePath),
                caption: caption,
                mimetype: 'video/mp4'
            });

            fs.unlinkSync(filePath);

        } catch (err) {
            console.error('Facebook Error:', err);
            await m.reply(`ᴇʀʀᴏʀ: ${err.message}`);
        }
    }
};
