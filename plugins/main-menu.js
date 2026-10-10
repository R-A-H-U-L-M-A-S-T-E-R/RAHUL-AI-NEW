const axios = require('axios');

if (!global['botStartTime']) {
    global['botStartTime'] = Date.now();
}

module.exports = {
    'name': 'menu',
    'description': 'Animated Cyber-Theme Bot Menu with Progress Counting and Audio',
    'aliases': ['cmdlist', 'commands', 'help'],
    
    async execute(_0x51c72f, _0x12a025) {
        // 1. Initial reaction
        await _0x12a025.react('⚡');
        
        const chatId = _0x12a025.chat || _0x12a025.from;
        
        // 2. Initial Counting Message (0%)
        let sentMsg;
        try {
            if (_0x51c72f && typeof _0x51c72f.sendMessage === 'function') {
                sentMsg = await _0x51c72f.sendMessage(chatId, { text: '⚡ *[ 𝗥𝗔𝗛𝗨𝗟 - 𝗔𝗜 ]* ⚡\n> *[▒▒▒▒▒▒▒▒▒▒] 0%*' }, { quoted: _0x12a025 });
            } else {
                sentMsg = await _0x12a025.reply('⚡ *[ 𝗥𝗔𝗛𝗨𝗟 - 𝗔𝗜 ]* ⚡\n> *[▒▒▒▒▒▒▒▒▒▒] 0%*');
            }
        } catch (e) {
            console.log("Error 0%:", e);
        }

        // 3. Counting to 30%
        await new Promise(resolve => setTimeout(resolve, 500));
        try {
            if (_0x51c72f && typeof _0x51c72f.sendMessage === 'function' && sentMsg) {
                await _0x51c72f.sendMessage(chatId, { text: '⚡ *[ 𝗥𝗔𝗛𝗨𝗟 - 𝗔Ｉ ]* ⚡\n> *[███▒▒▒▒▒▒▒] 30%*', edit: sentMsg.key || sentMsg });
            }
        } catch (e) {
            console.log("Error 30%:", e);
        }

        // 4. Counting to 70%
        await new Promise(resolve => setTimeout(resolve, 500));
        try {
            if (_0x51c72f && typeof _0x51c72f.sendMessage === 'function' && sentMsg) {
                await _0x51c72f.sendMessage(chatId, { text: '⚡ *[ 𝗥𝗔𝗛𝗨𝗟 - 𝗔𝗜 ]* ⚡\n> *[███████▒▒▒] 70%*', edit: sentMsg.key || sentMsg });
            }
        } catch (e) {
            console.log("Error 70%:", e);
        }

        // 5. Counting to 100%
        await new Promise(resolve => setTimeout(resolve, 500));
        try {
            if (_0x51c72f && typeof _0x51c72f.sendMessage === 'function' && sentMsg) {
                await _0x51c72f.sendMessage(chatId, { text: '⚡ *[ 𝗥𝗔𝗛𝗨𝗟 - 𝗔𝗜 ]* ⚡\n> *[██████████] 100%*', edit: sentMsg.key || sentMsg });
            }
        } catch (e) {
            console.log("Error 100%:", e);
        }

        await new Promise(resolve => setTimeout(resolve, 400));

        // 6. Variables & URLs
        const prefix = global['BOT_PREFIX'] || '.';
        const userName = _0x12a025.pushName || 'User';
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

        // 9. Send Audio Message
        try {
            const audioBuffer = (await axios.get(audioUrl, { responseType: 'arraybuffer' })).data;
            if (_0x51c72f && typeof _0x51c72f.sendMessage === 'function') {
                await _0x51c72f.sendMessage(chatId, { 
                    audio: audioBuffer, 
                    mimetype: 'audio/mp4', 
                    ptt: true 
                }, { quoted: _0x12a025 });
            } else {
                await _0x12a025.reply(audioBuffer, { mimetype: 'audio/mp4', ptt: true });
            }
        } catch (audioErr) {
            console.log("Audio send error:", audioErr);
        }

        // 10. Send Menu Image
        try {
            const imageBuffer = (await axios.get(imageUrl, { responseType: 'arraybuffer' })).data;
            if (_0x51c72f && typeof _0x51c72f.sendMessage === 'function') {
                await _0x51c72f.sendMessage(chatId, {
                    image: imageBuffer,
                    caption: menuText
                }, { quoted: _0x12a025 });
            } else {
                await _0x12a025.reply(imageBuffer, { caption: menuText });
            }
        } catch (err) {
            await _0x12a025.reply(menuText);
        }
    }
};
