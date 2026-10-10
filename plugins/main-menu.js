const axios = require('axios');

if (!global['botStartTime']) {
    global['botStartTime'] = Date.now();
}

module.exports = {
    'name': 'menu',
    'description': 'Expanded circle-themed rich bot menu with loading animation and audio',
    'aliases': ['cmdlist', 'commands', 'help'],
    
    async execute(conn, m) {
        // 1. Initial reaction
        await m.react('⭕');
        
        // 2. Loading message
        await m.reply('⚡ *[ ＲＡＨＵＬ - ＡＩ ]* ⚡\n> *COMPETING RAHUL MENU ... 🔄*');
        
        // 3. Wait 1 second
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 4. Variables
        const prefix = global['BOT_PREFIX'] || '.';
        const userName = m.pushName || 'User';
        const imageUrl = 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg';
        const audioUrl = 'https://spider-avik.zone.id/file/jwfyt2.mpeg';
        
        // 5. Uptime calculation
        const uptimeSeconds = Math.floor((Date.now() - global['botStartTime']) / 1000);
        const hours = Math.floor(uptimeSeconds / 3600);
        const minutes = Math.floor((uptimeSeconds % 3600) / 60);
        const seconds = uptimeSeconds % 60;
        const uptimeString = `${hours}h ${minutes}m ${seconds}s`;
        
        // 6. Menu Text Design
        const menuText = `
⭕ ─── *𝗥𝗔𝗛𝗨𝗟-𝗔𝗜* ─── ⭕
│
│ 👤 User   : *${userName}*
│ ⏱️ Uptime : *${uptimeString}*
│ ⚙️ Prefix : *${prefix}*
│ 📡 Status : *Online & Active*
│
⭕──────────────────────────────⭕

🔵 *01. GENERAL COMMANDS*
🔴 ${prefix}alive
⚪ ${prefix}ping
⚪ ${prefix}uptime
⚪ ${prefix}owner
⚪ ${prefix}botinfo
⚪ ${prefix}runtime
⚪ ${prefix}speed

🔵 *02. DOWNLOAD COMMANDS*
🔴 ${prefix}tiktok
⚪ ${prefix}ytmp3
⚪ ${prefix}ytmp4
⚪ ${prefix}ig
⚪ ${prefix}facebook
⚪ ${prefix}spotify
⚪ ${prefix}pinterest
🔴 ${prefix}mp3

🔵 *03. TOOLS & AI ENGINE*
🔴 ${prefix}sticker
⚪ ${prefix}take
⚪ ${prefix}toimg
⚪ ${prefix}ocr
⚪ ${prefix}tts
⚪ ${prefix}ai
⚪ ${prefix}gen
⚪ ${prefix}translate
⚪ ${prefix}calc

🔵 *04. FUN & MISC*
⚪ ${prefix}blue
⚪ ${prefix}flag
⚪ ${prefix}guessgender
⚪ ${prefix}style
⚪ ${prefix}dare
⚪ ${prefix}truth
⚪ ${prefix}roll
⚪ ${prefix}ship

🔵 *05. SEARCH & ANIME*
⚪ ${prefix}weather
⚪ ${prefix}waifu
⚪ ${prefix}neko
⚪ ${prefix}husbando
⚪ ${prefix}google
⚪ ${prefix}pinterest
⚪ ${prefix}lyrics
⚪ ${prefix}github

🔵 *06. ADMIN & GROUP*
⚪ ${prefix}tagall
⚪ ${prefix}tagme
⚪ ${prefix}group
⚪ ${prefix}kick
⚪ ${prefix}promote
⚪ ${prefix}demote
⚪ ${prefix}hidetag
⚪ ${prefix}antilink 
⚪ ${prefix}save
🔴 🔴 🔴 🔵 🔵 🔵 🔴
⭕──────────────────────────────⭕
> *✨ RAHUL-AI MENU COMPLETED*`.trim();

        // 7. Send Audio Message
        try {
            if (conn && conn.sendMessage) {
                await conn.sendMessage(m.chat || m.from, { 
                    audio: { url: audioUrl }, 
                    mimetype: 'audio/ogg; codecs=opus', 
                    ptt: true 
                }, { quoted: m });
            } else {
                const audioBuffer = (await axios.get(audioUrl, { responseType: 'arraybuffer' })).data;
                await m.reply(audioBuffer, { mimetype: 'audio/ogg; codecs=opus', ptt: true });
            }
        } catch (audioError) {
            console.log('Audio error:', audioError);
        }

        // 8. Send Image Menu Message
        try {
            if (conn && conn.sendMessage) {
                await conn.sendMessage(m.chat || m.from, {
                    image: { url: imageUrl },
                    caption: menuText
                }, { quoted: m });
            } else {
                const imageBuffer = (await axios.get(imageUrl, { responseType: 'arraybuffer' })).data;
                await m.reply(imageBuffer, { caption: menuText });
            }
        } catch (error) {
            await m.reply(menuText);
        }
    }
};

