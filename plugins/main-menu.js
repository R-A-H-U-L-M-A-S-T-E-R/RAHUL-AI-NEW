const axios = require('axios');

if (!global['botStartTime']) {
    global['botStartTime'] = Date.now();
}

module.exports = {
    name: 'menu',
    description: 'Animated Cyber-Theme Bot Menu with Reliable Image, Audio, and Progress Counting',
    aliases: ['cmdlist', 'commands', 'help'],

    async execute(conn, m) {
        try {
            const chatId = m.chat || m.from || m.key.remoteJid;

            // 1. Initial reaction
            try {
                if (typeof m.react === 'function') {
                    await m.react('⚡');
                }
            } catch (e) {}

            // 2. Initial Counting Message (0%)
            let sentMsg = null;
            try {
                if (typeof conn.sendMessage === 'function') {
                    sentMsg = await conn.sendMessage(chatId, { text: '⚡ *[ 𝗥𝗔𝗛𝗨𝗟 - 𝗔𝗜 ]* ⚡\n> *[▒▒▒▒▒▒▒▒▒▒] 0%*' }, { quoted: m });
                } else if (typeof m.reply === 'function') {
                    sentMsg = await m.reply('⚡ *[ 𝗥𝗔Ｈ𝗨𝗟 - 𝗔𝗜 ]* ⚡\n> *[▒▒▒▒▒▒▒▒▒▒] 0%*');
                }
            } catch (e) {}

            // 3. Counting to 30%
            await new Promise(resolve => setTimeout(resolve, 400));
            try {
                if (sentMsg && sentMsg.key && typeof conn.sendMessage === 'function') {
                    await conn.sendMessage(chatId, { text: '⚡ *[ 𝗥𝗔Ｈ𝗨𝗟 - ＡＩ ]* ⚡\n> *[███▒▒▒▒▒▒▒] 30%*', edit: sentMsg.key });
                }
            } catch (e) {}

            // 4. Counting to 70%
            await new Promise(resolve => setTimeout(resolve, 400));
            try {
                if (sentMsg && sentMsg.key && typeof conn.sendMessage === 'function') {
                    await conn.sendMessage(chatId, { text: '⚡ *[ 𝗥𝗔Ｈ𝗨𝗟 - ＡＩ ]* ⚡\n> *[███████▒▒▒] 70%*', edit: sentMsg.key });
                }
            } catch (e) {}

            // 5. Counting to 100%
            await new Promise(resolve => setTimeout(resolve, 400));
            try {
                if (sentMsg && sentMsg.key && typeof conn.sendMessage === 'function') {
                    await conn.sendMessage(chatId, { text: '⚡ *[ 𝗥𝗔ＨＵ𝗟 - ＡＩ ]* ⚡\n> *[██████████] 100%*', edit: sentMsg.key });
                }
            } catch (e) {}

            await new Promise(resolve => setTimeout(resolve, 300));

            // 6. Variables & URLs
            const prefix = global['BOT_PREFIX'] || global.prefix || '.';
            const userName = m.pushName || 'User';
            const imageUrl = 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg';
            const audioUrl = 'https://spider-avik.zone.id/file/jwfyt2.mpeg';

            // 7. Uptime calculation
            const uptimeSeconds = Math.floor((Date.now() - global['botStartTime']) / 1000);
            const hours = Math.floor(uptimeSeconds / 3600);
            const minutes = Math.floor((uptimeSeconds % 3600) / 60);
            const seconds = uptimeSeconds % 60;
            const uptimeString = `${hours}h ${minutes}m ${seconds}s`;

            // 8. Animated Cyber Menu Style
            const menuText = `
╭━━━❮ 💠 *ＲＡＨＵＬ - ＡＩ* 🔺️ ❯━━━╮
┃
┃ ╭━━━❮ 👤 *USER DASHBOARD* ❯
┃ ┃ ⚡ User   : *${userName}*
┃ ┃ ⏱️ Uptime : *${uptimeString}*
┃ ┃ ⚙️ Prefix : *${prefix}*
┃ ┃ 📡 Status : *Online & Active*
┃ ╰━━━━━━━━━━━━━━━━━━━━━
┃
┃ ╭━━━❮ 🔵 *01. GENERAL* ❯
┃ ┃ 🔴 ${prefix}alive
┃ ┃ 🟣 ${prefix}ping
┃ ┃ 🟠 ${prefix}uptime
┃ ┃ 🟢 ${prefix}owner
┃ ┃ 🟡 ${prefix}botinfo
┃ ┃ 🔴 ${prefix}runtime
┃ ┃ 🔵 ${prefix}speed
┃ ╰━━━━━━━━━━━━━━━━━━━━━
┃
┃ ╭━━━❮ 🔵 *02. DOWNLOADS* ❯
┃ ┃ 🔴 ${prefix}tiktok
┃ ┃ 🟠 ${prefix}ytmp3
┃ ┃ 🟢 ${prefix}ytmp4
┃ ┃ 🔴 ${prefix}ig
┃ ┃ 🔵 ${prefix}facebook
┃ ┃ 🔵 ${prefix}spotify
┃ ┃ 🟣 ${prefix}pinterest
┃ ┃ 🔴 ${prefix}mp3
┃ ╰━━━━━━━━━━━━━━━━━━━━━
┃
┃ ╭━━━❮ 🔵 *03. TOOLS & AI* ❯
┃ ┃ 🔴 ${prefix}sticker
┃ ┃ 🔴 ${prefix}take
┃ ┃ 🔵 ${prefix}toimg
┃ ┃ 🔵 ${prefix}ocr
┃ ┃ 🟠 ${prefix}tts
┃ ┃ 🟠 ${prefix}ai
┃ ┃ 🔴 ${prefix}gen
┃ ┃ 🟡 ${prefix}translate
┃ ┃ ⚪ ${prefix}calc
┃ ╰━━━━━━━━━━━━━━━━━━━━━
┃
┃ ╭━━━❮ 🔵 *04. FUN & MISC* ❯
┃ ┃ 🟠 ${prefix}blue
┃ ┃ ⚪ ${prefix}flag
┃ ┃ 🟢 ${prefix}guessgender
┃ ┃ 🟠 ${prefix}style
┃ ┃ ⚪ ${prefix}dare
┃ ┃ 🟢 ${prefix}truth
┃ ┃ 🔵 ${prefix}roll
┃ ┃ 🔴 ${prefix}ship
┃ ╰━━━━━━━━━━━━━━━━━━━━━
┃
┃ ╭━━━❮ 🔵 *05. SEARCH & ANIME* ❯
┃ ┃ 🔵 ${prefix}weather
┃ ┃ 🔴 ${prefix}waifu
┃ ┃ 🟣 ${prefix}neko
┃ ┃ 🔵 ${prefix}husbando
┃ ┃ ⚫️ ${prefix}google
┃ ┃ 🟢 ${prefix}pinterest
┃ ┃ 🟡 ${prefix}lyrics
┃ ┃ ⚪ ${prefix}github
┃ ╰━━━━━━━━━━━━━━━━━━━━━
┃
┃ ╭━━━❮ 🔵 *06. ADMIN & GROUP* ❯
┃ ┃ 🟠 ${prefix}tagall
┃ ┃ ⚪ ${prefix}tagme
┃ ┃ 🟢 ${prefix}group
┃ ┃ 🟧 ${prefix}kick
┃ ┃ ⬜️ ${prefix}promote
┃ ┃ 🟩 ${prefix}demote
┃ ┃ 🔴 ${prefix}hidetag
┃ ┃ 🟢 ${prefix}antilink
┃ ┃ 🔵 ${prefix}save
┃ ╰━━━━━━━━━━━━━━━━━━━━━
╰━━━━━━━━━━━━━━━━━━━━━━━━━╯
> ✨ *POWERED BY RAHUL-AI* ✨`.trim();

            // 9. Send Audio Message (Buffer Method)
            try {
                const audioRes = await axios.get(audioUrl, { responseType: 'arraybuffer', timeout: 5000 });
                const audioBuffer = Buffer.from(audioRes.data);

                if (typeof conn.sendMessage === 'function') {
                    await conn.sendMessage(chatId, { audio: audioBuffer, mimetype: 'audio/mp4', ptt: true }, { quoted: m });
                }
            } catch (audioErr) {
                console.log("Audio send error:", audioErr.message);
            }

            // 10. Send Image Menu (Buffer Method with Fallback)
            try {
                const imgRes = await axios.get(imageUrl, { responseType: 'arraybuffer', timeout: 5000 });
                const imageBuffer = Buffer.from(imgRes.data);

                if (typeof conn.sendMessage === 'function') {
                    await conn.sendMessage(chatId, { image: imageBuffer, caption: menuText }, { quoted: m });
                } else if (typeof m.reply === 'function') {
                    await m.reply(imageBuffer, { caption: menuText });
                }
            } catch (err) {
                console.log("Image send error, falling back to text:", err.message);
                if (typeof conn.sendMessage === 'function') {
                    await conn.sendMessage(chatId, { text: menuText }, { quoted: m });
                } else if (typeof m.reply === 'function') {
                    await m.reply(menuText);
                }
            }

        } catch (mainErr) {
            console.error("Menu Execution Error:", mainErr);
        }
    }
};
