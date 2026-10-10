const axios = require('axios');

if (!global['botStartTime']) {
    global['botStartTime'] = Date.now();
}

module.exports = {
    name: 'menu',
    description: 'Royale VIP styled WhatsApp bot menu',
    aliases: ['help', 'cmdlist', 'commands', 'list'],
    
    async execute(m, conn) {
        // 1. Fast Diamond Progress Loading Animation
        await conn.react('👑');
        await conn.reply('◈◇◇◇ 25% ── [ ＲＡＨＵＬ - ＡＩ ]');
        
        await new Promise(r => setTimeout(r, 350));
        await conn.reply('◈◈◈◇ 75% ── [ ＲＡＨＵＬ - ＡＩ ]');
        
        await new Promise(r => setTimeout(r, 350));

        // 2. Variables Setup
        const botPrefix = global['BOT_PREFIX'] || '.';
        const userName = m.pushName || 'User';
        const imageUrl = 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg';
        
        // 3. Uptime Calculation
        const uptimeSeconds = Math.floor((Date.now() - global['botStartTime']) / 1000);
        const hours = Math.floor(uptimeSeconds / 3600);
        const minutes = Math.floor((uptimeSeconds % 3600) / 60);
        const seconds = uptimeSeconds % 60;
        const uptimeString = `${hours}h ${minutes}m ${seconds}s`;

        // 4. Royale VIP Menu Design
        const menuText = `
❖ ───── 🔶️ *ＲＡＨＵＬ-ＡＩ* 🔷️ ──────── ❖

 👑 *USER*   : ${userName} 
 
 ⏱️ *UPTIME* : ${uptimeString}
 
 ⚙️ *PREFIX* : [ ${botPrefix} ]
 
 🟢 *STATUS* : VIP Active
 

❖ ────────────────────────────────────── ❖

💎 ───『 *01. MAIN MENU* 』───
 🟠 ${botPrefix}alive
 ⚪️ ${botPrefix}ping
 🟢 ${botPrefix}uptime
 🟠 ${botPrefix}owner
 ⚪️ ${botPrefix}botinfo
 🟢 ${botPrefix}runtime
 🔴 ${botPrefix}speed

💎 ───『 *02. DOWNLOADER* 』───
 🟠 ${botPrefix}tiktok
 ⚪️ ${botPrefix}ytmp3
 🟢 ${botPrefix}ytmp4
 🔵 ${botPrefix}ig
 🟡 ${botPrefix}facebook
 🟣 ${botPrefix}spotify
 🔴 ${botPrefix}pinterest
 🟠 ${botPrefix}mp3

💎 ───『 *03. AI & CONVERTER* 』───
 🟢 ${botPrefix}sticker
 🟠 ${botPrefix}take
 ⚫️ ${botPrefix}toimg
 🟠 ${botPrefix}ocr
 ⚪️ ${botPrefix}tts
 🟢 ${botPrefix}ai
 🟣 ${botPrefix}gen
 🟢 ${botPrefix}translate
 ⚪️ ${botPrefix}calc

💎 ───『 *04. ENTERTAINMENT* 』───
 🔵 ${botPrefix}blue
 🔴 ${botPrefix}flag
 ⚪️ ${botPrefix}guessgender
 🟢 ${botPrefix}style
 🟠 ${botPrefix}dare
 🔵 ${botPrefix}truth
 🟢 ${botPrefix}roll
 🟠 ${botPrefix}ship

💎 ───『 *05. SEARCH & MEDIA* 』───
 🔴 ${botPrefix}weather
 🔴 ${botPrefix}waifu
 🟢 ${botPrefix}neko
 🟣 ${botPrefix}husbando
 🟣 ${botPrefix}google
 ⚪️ ${botPrefix}lyrics
 ⚪️ ${botPrefix}github

💎 ───『 *06. GROUP ADMIN* 』───
 🔷️ ${botPrefix}tagall
 🔷️ ${botPrefix}tagme
 🔺️ ${botPrefix}group
 🔻 ${botPrefix}kick
 🟧 ${botPrefix}promote
 ⬜️ ${botPrefix}demote
 🟩 ${botPrefix}hidetag
 🔴 ${botPrefix}antilink 
 🈸️ ${botPrefix}save

❖ ────────────────────────────────────── ❖
> *💎 RAHUL-AI OFFICIAL MENU*`.trim();

        // 5. Send Image with Caption
        try {
            const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const imageBuffer = imageResponse.data;
            await conn.reply(imageBuffer, { caption: menuText });
        } catch (error) {
            await conn.reply(menuText);
        }
    }
};
