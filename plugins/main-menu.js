const axios = require('axios');

// Set bot start time if not already set
if (!global['botStartTime']) {
    global['botStartTime'] = Date.now();
}

module.exports = {
    'name': 'menu',
    'description': 'Expanded circle-themed rich bot menu with loading animation and audio',
    'aliases': ['cmdlist', 'commands', 'help'],
    
    async execute(_0x51c72f, _0x12a025) {
        const currentDate = new Date();
        
        // 1. Send initial reaction
        await _0x12a025.react('⭕');
        
        // 2. Send loading message
        const loadingMsg = await _0x12a025.reply('⚡ *[ ＲＡＨＵＬ - ＡＩ ]* ⚡\n> *COMPETING RAHUL MENU ... 🔄*');
        
        // 3. Wait for 1 second (Loading animation effect)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 4. Get Bot Prefix, User Name, Header Image URL, and Audio URL
        const prefix = global['BOT_PREFIX'] || '.';
        const userName = _0x12a025.pushName || 'User';
        const imageUrl = 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg';
        const audioUrl = 'https://sam-cdn.zone.id/files/3QG5SVPjtO.ogv';
        
        // 5. Calculate Uptime (How long the bot has been running)
        const uptimeSeconds = Math.floor((Date.now() - global['botStartTime']) / 1000);
        const hours = Math.floor(uptimeSeconds / 3600);
        const minutes = Math.floor((uptimeSeconds % 3600) / 60);
        const seconds = uptimeSeconds % 60;
        const uptimeString = `${hours}h ${minutes}m ${seconds}s`;
        
        // 6. Main Menu Text Design
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

        // 7. Send audio first as a voice note
        try {
            const audioBuffer = (await axios.get(audioUrl, { 'responseType': 'arraybuffer' })).data;
            await _0x12a025.reply(audioBuffer, { mimetype: 'audio/mp4', ptt: true });
        } catch (audioError) {
            console.log('Failed to send audio:', audioError);
        }

        // 8. Send menu with image caption, fallback to text if image fetch fails
        try {
            const imageBuffer = (await axios.get(imageUrl, { 'responseType': 'arraybuffer' })).data;
            await _0x12a025.reply(imageBuffer, { 'caption': menuText });
        } catch (error) {
            await _0x12a025.reply(menuText);
        }
    }
};

