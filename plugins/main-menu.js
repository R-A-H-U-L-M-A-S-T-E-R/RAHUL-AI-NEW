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

            // 1. React (Safely)
            try {
                if (typeof conn.sendMessage === 'function') {
                    await conn.sendMessage(chatId, { react: { text: '⚡', key: m.key } });
                } else if (typeof m.react === 'function') {
                    await m.react('⚡');
                }
            } catch (e) {
                console.log("React Error:", e.message);
            }

            // 2. Initial Loading Message
            let sentMsg = null;
            const step0 = '⚡ *[ 𝗥𝗔𝗛𝗨𝗟 - 𝗔𝗜 ]* ⚡\n> *[▒▒▒▒▒▒▒▒▒▒] 0%*';
            
            try {
                if (typeof conn.sendMessage === 'function') {
                    sentMsg = await conn.sendMessage(chatId, { text: step0 }, { quoted: m });
                } else if (typeof m.reply === 'function') {
                    sentMsg = await m.reply(step0);
                }
            } catch (e) {
                console.log("Initial Send Error:", e.message);
            }

            // 3. Edit Animation (Safely wrapped in try-catch)
            const animationSteps = [
                '⚡ *[ 𝗥𝗔𝗛𝗨𝗟 - 𝗔𝗜 ]* ⚡\n> *[███▒▒▒▒▒▒▒] 30%*',
                '⚡ *[ 𝗥𝗔𝗛𝗨𝗟 - 𝗔𝗜 ]* ⚡\n> *[███████▒▒▒] 70%*',
                '⚡ *[ 𝗥𝗔𝗛𝗨𝗟 - 𝗔𝗜 ]* ⚡\n> *[██████████] 100%*'
            ];

            for (const textStep of animationSteps) {
                await new Promise(res => setTimeout(res, 300));
                try {
                    if (sentMsg && sentMsg.key && typeof conn.sendMessage === 'function') {
                        await conn.sendMessage(chatId, { text: textStep, edit: sentMsg.key });
                    }
                } catch (e) {
                    // Ignore edit error if not supported by bot structure
                }
            }

            // 4. Config & Data
            const prefix = global['BOT_PREFIX'] || global.prefix || '.';
            const userName = m.pushName || m.name || 'User';
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

            // 5. Send Audio safely
            try {
                const audioRes = await axios.get(audioUrl, { responseType: 'arraybuffer', timeout: 5000 });
                const audioBuffer = Buffer.from(audioRes.data);
                
                if (typeof conn.sendMessage === 'function') {
                    await conn.sendMessage(chatId, { audio: audioBuffer, mimetype: 'audio/mp4', ptt: true }, { quoted: m });
                }
            } catch (aErr) {
                console.log("Audio Send Failed:", aErr.message);
            }

            // 6. Send Image Menu safely
            try {
                const imgRes = await axios.get(imageUrl, { responseType: 'arraybuffer', timeout: 5000 });
                const imageBuffer = Buffer.from(imgRes.data);

                if (typeof conn.sendMessage === 'function') {
                    await conn.sendMessage(chatId, { image: imageBuffer, caption: menuText }, { quoted: m });
                } else if (typeof m.reply === 'function') {
                    await m.reply(imageBuffer, { caption: menuText });
                }
            } catch (iErr) {
                console.log("Image Send Failed, Fallback to Text:", iErr.message);
                // Image fail झाली तरी Plain Text Menu नक्की पाठवला जाईल
                if (typeof conn.sendMessage === 'function') {
                    await conn.sendMessage(chatId, { text: menuText }, { quoted: m });
                } else if (typeof m.reply === 'function') {
                    await m.reply(menuText);
                }
            }

        } catch (mainErr) {
            console.error("Main Command Error:", mainErr);
            // अत्यंत गंभीर एरर आल्यास बेसिक टेक्स्ट मेसेज पाठवला जाईल
            try {
                await conn.sendMessage(m.chat || m.from, { text: "⚠️ Menu loading failed. Please try again." }, { quoted: m });
            } catch (e) {}
        }
    }
};
