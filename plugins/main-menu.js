const axios = require('axios');

if (!global['botStartTime']) {
    global['botStartTime'] = Date.now();
}

module.exports = {
    name: 'menu',
    description: 'Crystal Refraction styled WhatsApp Bot Menu with Image Loading',
    aliases: ['help', 'cmdlist', 'commands', 'list'],
    
    async execute(m, conn) {
        await conn.react('💎');

        // Image URLs
        const loadingImg = 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg';
        const mainBanner = 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg';

        // Helper function for sending Image with Loading Text
        const showCrystalStage = async (captionText) => {
            try {
                const imgRes = await axios.get(loadingImg, { responseType: 'arraybuffer' });
                await conn.reply(imgRes.data, { caption: captionText });
            } catch (err) {
                await conn.reply(captionText);
            }
        };

        // 1. Crystal Refraction Image-Loading Sequence
        await showCrystalStage('```[ 💎 STAGE 01 : HARVESTING CRYSTALS ]```\n`✨ 🔮 ░░░░░░░░░ 25%`\n> *Focusing Light Rays...* 💎');
        await new Promise(r => setTimeout(r, 250));

        await showCrystalStage('```[ 🔮 STAGE 02 : PRISM REFRACTION ]```\n`💎 ✨ █████░░░░ 75%`\n> *Polishing Diamond Facets...* 🌟');
        await new Promise(r => setTimeout(r, 250));

        await showCrystalStage('```[ 🌟 STAGE 03 : CRYSTAL VAULT READY ]```\n`💎 ⚜️ ██████████ 100%`\n> *Rahul-AI Crystal Suite Unlocked!* ✨');
        await new Promise(r => setTimeout(r, 200));

        // 2. Variables Setup
        const botPrefix = global['BOT_PREFIX'] || '.';
        const userName = m.pushName || 'User';
        
        // 3. Uptime Calculation
        const uptimeSeconds = Math.floor((Date.now() - global['botStartTime']) / 1000);
        const hours = Math.floor(uptimeSeconds / 3600);
        const minutes = Math.floor((uptimeSeconds % 3600) / 60);
        const seconds = uptimeSeconds % 60;
        const uptimeString = `${hours}h ${minutes}m ${seconds}s`;

        // 4. Main Menu Text Design
        const menuText = `
💎 ━━━━━━━⟨ *ＲＡＨＵＬ - ＡＩ* ❯━━━━━━━ 💎

 👑 *VIP User* : ${userName}
 ⏱️ *Uptime*   : ${uptimeString}
 ⚙️ *Prefix*   : [ ${botPrefix} ]
 🔮 *Clarity*  : Pure Diamond [100%]

💎 ━━━━━━━━━━━━━━━━━━━━━━━━━ 💎

✨ ───❮ *FACET 01 : CRYSTAL CORE* ❯───
 💎 ${botPrefix}alive
 💎 ${botPrefix}ping
 💎 ${botPrefix}uptime
 💎 ${botPrefix}owner
 💎 ${botPrefix}botinfo
 💎 ${botPrefix}runtime
 💎 ${botPrefix}speed

✨ ───❮ *FACET 02 : VAULT DOWNLOADS* ❯───
 💎 ${botPrefix}tiktok
 💎 ${botPrefix}ytmp3
 💎 ${botPrefix}ytmp4
 💎 ${botPrefix}ig
 💎 ${botPrefix}facebook
 💎 ${botPrefix}spotify
 💎 ${botPrefix}pinterest
 💎 ${botPrefix}mp3

✨ ───❮ *FACET 03 : PRISM AI TOOLS* ❯───
 💎 ${botPrefix}sticker
 💎 ${botPrefix}take
 💎 ${botPrefix}toimg
 💎 ${botPrefix}ocr
 💎 ${botPrefix}tts
 💎 ${botPrefix}ai
 💎 ${botPrefix}gen
 💎 ${botPrefix}translate
 💎 ${botPrefix}calc

✨ ───❮ *FACET 04 : LOUNGE GAMES* ❯───
 💎 ${botPrefix}blue
 💎 ${botPrefix}flag
 💎 ${botPrefix}guessgender
 💎 ${botPrefix}style
 💎 ${botPrefix}dare
 💎 ${botPrefix}truth
 💎 ${botPrefix}roll
 💎 ${botPrefix}ship

✨ ───❮ *FACET 05 : SPECTRUM SEARCH* ❯───
 💎 ${botPrefix}weather
 💎 ${botPrefix}waifu
 💎 ${botPrefix}neko
 💎 ${botPrefix}husbando
 💎 ${botPrefix}google
 💎 ${botPrefix}lyrics
 💎 ${botPrefix}github

✨ ───❮ *FACET 06 : DIAMOND ADMIN* ❯───
 💎 ${botPrefix}tagall
 💎 ${botPrefix}tagme
 💎 ${botPrefix}group
 💎 ${botPrefix}kick
 💎 ${botPrefix}promote
 💎 ${botPrefix}demote
 💎 ${botPrefix}hidetag
 💎 ${botPrefix}antilink
 💎 ${botPrefix}save

💎 ━━━━━━━━━━━━━━━━━━━━━━━━━ 💎
> *✨ Powered by Rahul-AI Crystal Engine*`.trim();

        // 5. Final Menu Send
        try {
            const bannerRes = await axios.get(mainBanner, { responseType: 'arraybuffer' });
            await conn.reply(bannerRes.data, { caption: menuText });
        } catch (error) {
            await conn.reply(menuText);
        }
    }
};
