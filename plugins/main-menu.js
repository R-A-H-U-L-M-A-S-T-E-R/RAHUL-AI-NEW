const axios = require('axios');

if (!global['botStartTime']) {
    global['botStartTime'] = Date.now();
}

module.exports = {
    name: 'menu',
    description: 'Animated Cyber-Theme Bot Menu with Reliable Image, Audio, and Progress Counting',
    aliases: ['cmdlist', 'commands', 'help'],

    async execute(conn, m) {
        // Chat and Message normalization
        const bot = conn || m;
        const chatId = m.chat || m.from;

        // 1. Initial reaction
        try {
            if (typeof m.react === 'function') {
                await m.react('⚡');
            }
        } catch (e) {}

        // 2. Progress Animation (Loading Bar)
        let sentMsg = null;
        const loadingSteps = [
            '⚡ *[ 𝗥𝗔𝗛𝗨𝗟 - 𝗔𝗜 ]* ⚡\n> *[▒▒▒▒▒▒▒▒▒▒] 0%*',
            '⚡ *[ 𝗥𝗔𝗛𝗨𝗟 - 𝗔𝗜 ]* ⚡\n> *[███▒▒▒▒▒▒▒] 30%*',
            '⚡ *[ 𝗥𝗔𝗛𝗨𝗟 - 𝗔𝗜 ]* ⚡\n> *[███████▒▒▒] 70%*',
            '⚡ *[ 𝗥𝗔𝗛𝗨𝗟 - 𝗔𝗜 ]* ⚡\n> *[██████████] 100%*'
        ];

        try {
            // First Message Send
            if (typeof bot.sendMessage === 'function') {
                sentMsg = await bot.sendMessage(chatId, { text: loadingSteps[0] }, { quoted: m });
            } else if (typeof m.reply === 'function') {
                sentMsg = await m.reply(loadingSteps[0]);
            }

            // Edit animation step-by-step
            for (let i = 1; i < loadingSteps.length; i++) {
                await new Promise(res => setTimeout(res, 400));
                
                if (sentMsg && sentMsg.key && typeof bot.sendMessage === 'function') {
                    await bot.sendMessage(chatId, { 
                        text: loadingSteps[i], 
                        edit: sentMsg.key 
                    });
                }
            }
        } catch (e) {
            console.log("Loading animation error:", e);
        }

        await new Promise(res => setTimeout(res, 300));

        // 3. Variables & Configuration
        const prefix = global['BOT_PREFIX'] || global.prefix || '.';
        const userName = m.pushName || m.name || 'User';
        const imageUrl = 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg';
        const audioUrl = 'https://spider-avik.zone.id/file/jwfyt2.mpeg';

        // 4. Uptime calculation
        const uptimeSeconds = Math.floor((Date.now() - global['botStartTime']) / 1000);
        const hours = Math.floor(uptimeSeconds / 3600);
        const minutes = Math.floor((uptimeSeconds % 3600) / 60);
        const seconds = uptimeSeconds % 60;
        const uptimeString = `${hours}h ${minutes}m ${seconds}s`;

        // 5. Menu Text
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

        // 6. Send Audio Message (Buffer Method)
        try {
            const audioRes = await axios.get(audioUrl, { responseType: 'arraybuffer' });
            const audioBuffer = Buffer.from(audioRes.data);

            if (typeof bot.sendMessage === 'function') {
                await bot.sendMessage(chatId, {
                    audio: audioBuffer,
                    mimetype: 'audio/mp4',
                    ptt: true
                }, { quoted: m });
            } else if (typeof m.reply === 'function') {
                await m.reply(audioBuffer, { mimetype: 'audio/mp4', ptt: true });
            }
        } catch (audioErr) {
            console.log("Audio send failed:", audioErr.message);
        }

        // 7. Send Image Menu Message (Buffer Method)
        try {
            const imgRes = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const imageBuffer = Buffer.from(imgRes.data);

            if (typeof bot.sendMessage === 'function') {
                await bot.sendMessage(chatId, {
                    image: imageBuffer,
                    caption: menuText
                }, { quoted: m });
            } else if (typeof m.reply === 'function') {
                await m.reply(imageBuffer, { caption: menuText });
            }
        } catch (imgErr) {
            console.log("Image send failed, falling back to text:", imgErr.message);
            // Fallback: Send plain text menu if image fails
            if (typeof bot.sendMessage === 'function') {
                await bot.sendMessage(chatId, { text: menuText }, { quoted: m });
            } else {
                await m.reply(menuText);
            }
        }
    }
};
