const axios = require('axios');

if (!global['botStartTime']) {
    global['botStartTime'] = Date.now();
}

module.exports = {
    'name': 'menu',
    'description': 'Animated Cyber-Theme Bot Menu with Reliable Loading Sequence',
    'aliases': ['cmdlist', 'commands', 'help'],
    
    async execute(_0x51c72f, _0x12a025) {
        // 1. Initial reaction with lighting effect
        await _0x12a025.react('⚡');
        
        const chatId = _0x12a025.chat || _0x12a025.from;

        // 2. Step 1: Loading 0%
        let loadingMsg;
        try {
            if (_0x51c72f && typeof _0x51c72f.sendMessage === 'function') {
                loadingMsg = await _0x51c72f.sendMessage(chatId, { text: '⚡ *[ ＲＡＨＵＬ - ＡＩ ]* ⚡\n> *[▒▒▒▒▒▒▒▒▒▒] 0%*' }, { quoted: _0x12a025 });
            } else {
                loadingMsg = await _0x12a025.reply('⚡ *[ ＲＡＨＵＬ - ＡＩ ]* ⚡\n> *[▒▒▒▒▒▒▒▒▒▒] 0%*');
            }
        } catch (e) {
            console.log("Loading error:", e);
        }

        // Short pause for animation effect
        await new Promise(resolve => setTimeout(resolve, 500));

        // 3. Step 2: Loading 50% (Deleting old and sending updated to avoid edit bugs)
        try {
            if (loadingMsg && _0x51c72f && typeof _0x51c72f.sendMessage === 'function') {
                await _0x51c72f.sendMessage(chatId, { delete: loadingMsg.key || loadingMsg }).catch(() => {});
            }
            if (_0x51c72f && typeof _0x51c72f.sendMessage === 'function') {
                loadingMsg = await _0x51c72f.sendMessage(chatId, { text: '⚡ *[ ＲＡＨＵＬ - ＡＩ ]* ⚡\n> *[█████▒▒▒▒▒] 50%*' }, { quoted: _0x12a025 });
            }
        } catch (e) {
            console.log("50% error:", e);
        }

        await new Promise(resolve => setTimeout(resolve, 500));

        // 4. Step 3: Loading 100%
        try {
            if (loadingMsg && _0x51c72f && typeof _0x51c72f.sendMessage === 'function') {
                await _0x51c72f.sendMessage(chatId, { delete: loadingMsg.key || loadingMsg }).catch(() => {});
            }
            if (_0x51c72f && typeof _0x51c72f.sendMessage === 'function') {
                loadingMsg = await _0x51c72f.sendMessage(chatId, { text: '⚡ *[ ＲＡＨＵＬ - ＡＩ ]* ⚡\n> *[██████████] 100%*' }, { quoted: _0x12a025 });
            }
        } catch (e) {
            console.log("100% error:", e);
        }

        await new Promise(resolve => setTimeout(resolve, 400));

        // Delete the final loading message before sending the main menu
        try {
            if (loadingMsg && _0x51c72f && typeof _0x51c72f.sendMessage === 'function') {
                await _0x51c72f.sendMessage(chatId, { delete: loadingMsg.key || loadingMsg }).catch(() => {});
            }
        } catch (e) {}

        // 5. Variables & URLs
        const prefix = global['BOT_PREFIX'] || '.';
        const userName = _0x12a025.pushName || 'User';
        const imageUrl = 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg';
        const audioUrl = 'https://spider-avik.zone.id/file/jwfyt2.mpeg';
        
        // 6. Uptime calculation
        const uptimeSeconds = Math.floor((Date.now() - global['botStartTime']) / 1000);
        const hours = Math.floor(uptimeSeconds / 3600);
        const minutes = Math.floor((uptimeSeconds % 3600) / 60);
        const seconds = uptimeSeconds % 60;
        const uptimeString = `${hours}h ${minutes}m ${seconds}s`;
        
        // 7. Animated Cyber Menu Style
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

        // 8. Send Audio Message
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

        // 9. Send Menu Image
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
