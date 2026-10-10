const axios = require('axios');

if (!global['botStartTime']) {
    global['botStartTime'] = Date.now();
}

module.exports = {
    name: 'menu',
    description: 'Animated Cyber-Theme Bot Menu',
    aliases: ['cmdlist', 'commands', 'help'],

    async execute(conn, m) {
        try {
            const chatId = m.chat || m.from || m.key.remoteJid;

            // 1. Send React
            try {
                if (typeof conn.sendMessage === 'function') {
                    await conn.sendMessage(chatId, { react: { text: '⚡', key: m.key } });
                }
            } catch (e) {}

            // 2. Variables & Configuration
            const prefix = global['BOT_PREFIX'] || global.prefix || '.';
            const userName = m.pushName || 'User';
            const imageUrl = 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg';
            const audioUrl = 'https://spider-avik.zone.id/file/jwfyt2.mpeg';

            // Uptime Calculation
            const uptimeSeconds = Math.floor((Date.now() - global['botStartTime']) / 1000);
            const hours = Math.floor(uptimeSeconds / 3600);
            const minutes = Math.floor((uptimeSeconds % 3600) / 60);
            const seconds = uptimeSeconds % 60;
            const uptimeString = `${hours}h ${minutes}m ${seconds}s`;

            // Menu Text Structure
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

            // 3. Send Audio Message safely
            try {
                const audioRes = await axios.get(audioUrl, { responseType: 'arraybuffer', timeout: 7000 });
                const audioBuffer = Buffer.from(audioRes.data);
                
                if (typeof conn.sendMessage === 'function') {
                    await conn.sendMessage(chatId, { audio: audioBuffer, mimetype: 'audio/mp4', ptt: true }, { quoted: m });
                }
            } catch (aErr) {
                console.log("Audio Send Warning:", aErr.message);
            }

            // 4. Send Image Menu with Caption
            try {
                const imgRes = await axios.get(imageUrl, { responseType: 'arraybuffer', timeout: 7000 });
                const imageBuffer = Buffer.from(imgRes.data);

                if (typeof conn.sendMessage === 'function') {
                    await conn.sendMessage(chatId, { image: imageBuffer, caption: menuText }, { quoted: m });
                } else if (typeof m.reply === 'function') {
                    await m.reply(imageBuffer, { caption: menuText });
                }
            } catch (iErr) {
                console.log("Image Send Failed, sending text fallback:", iErr.message);
                if (typeof conn.sendMessage === 'function') {
                    await conn.sendMessage(chatId, { text: menuText }, { quoted: m });
                } else if (typeof m.reply === 'function') {
                    await m.reply(menuText);
                }
            }

        } catch (mainErr) {
            console.error("Critical Menu Error:", mainErr);
            try {
                await m.reply("❌ Error executing menu command.");
            } catch (e) {}
        }
    }
};
