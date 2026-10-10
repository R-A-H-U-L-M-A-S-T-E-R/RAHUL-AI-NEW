const axios = require('axios');

if (!global['botStartTime']) {
    global['botStartTime'] = Date.now();
}

module.exports = {
    'name': 'menu',
    'description': 'Animated Cyber-Theme Bot Menu with Working Loading Animation and Audio',
    'aliases': ['cmdlist', 'commands', 'help'],
    
    async execute(_0x51c72f, _0x12a025) {
        // 1. Initial reaction with lighting effect
        await _0x12a025.react('🎉');
        
        const chatId = _0x12a025.chat || _0x12a025.from;
        
        // 2. Initial Loading Message (0%)
        let sentMsg;
        try {
            if (_0x51c72f && typeof _0x51c72f.sendMessage === 'function') {
                sentMsg = await _0x51c72f.sendMessage(chatId, { text: '⚡ *[ ＲＡＨＵＬ - ＡＩ ]* ⚡\n> *[▒▒▒▒▒▒▒▒▒▒] 0%*' }, { quoted: _0x12a025 });
            } else {
                sentMsg = await _0x12a025.reply('⚡ *[ ＲＡＨＵＬ - ＡＩ ]* ⚡\n> *[▒▒▒▒▒▒▒▒▒▒] 0%*');
            }
        } catch (e) {
            console.log("Loading start error:", e);
        }

        // 3. Update to 50% Animation Step
        await new Promise(resolve => setTimeout(resolve, 600));
        try {
            if (_0x51c72f && typeof _0x51c72f.sendMessage === 'function' && sentMsg) {
                await _0x51c72f.sendMessage(chatId, { text: '⚡ *[ ＲＡＨＵＬ - ＡＩ ]* ⚡\n> *[█████▒▒▒▒▒] 50%*', edit: sentMsg.key || sentMsg });
            } else if (sentMsg && typeof sentMsg.edit === 'function') {
                await sentMsg.edit('⚡ *[ ＲＡＨＵＬ - ＡＩ ]* ⚡\n> *[█████▒▒▒▒▒] 50%*');
            }
        } catch (e) {
            console.log("Animation 50% error:", e);
        }

        // 4. Update to 100% Animation Step
        await new Promise(resolve => setTimeout(resolve, 600));
        try {
            if (_0x51c72f && typeof _0x51c72f.sendMessage === 'function' && sentMsg) {
                await _0x51c72f.sendMessage(chatId, { text: '⚡ *[ ＲＡＨＵＬ - ＡＩ ]* ⚡\n> *[██████████] 100%*', edit: sentMsg.key || sentMsg });
            } else if (sentMsg && typeof sentMsg.edit === 'function') {
                await sentMsg.edit('⚡ *[ ＲＡＨＵＬ - ＡＩ ]* ⚡\n> *[██████████] 100%*');
            }
        } catch (e) {
            console.log("Animation 100% error:", e);
        }

        await new Promise(resolve => setTimeout(resolve, 400));

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

        // 8. Audio Response Send
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

        // 9. Menu Image Send
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
