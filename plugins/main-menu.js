const axios = require('axios');

if (!global['botStartTime']) {
    global['botStartTime'] = Date.now();
}

module.exports = {
    name: 'menu',
    description: 'Animated Loading & Hexagonal Styled WhatsApp Bot Menu',
    aliases: ['help', 'cmdlist', 'commands', 'list', 'allmenu'],
    
    async execute(m, conn) {
        // 1. Loading Animation (Edit Message Effect)
        let loadMsg = await conn.reply('LOADING [⬛⬜⬜⬜⬜⬜]');
        await new Promise(r => setTimeout(r, 200));
        await conn.edit('LOADING [⬛⬛⬛⬜⬜⬜]', loadMsg.key);
        await new Promise(r => setTimeout(r, 200));
        await conn.edit('LOADING [⬛⬛⬛⬛⬛⬜]', loadMsg.key);
        await new Promise(r => setTimeout(r, 200));
        await conn.edit('LOADING [⬛⬛⬛⬛⬛⬛]', loadMsg.key);

        // Banner Image
        const mainBanner = 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg';

        // Setup Variables
        const botPrefix = global['BOT_PREFIX'] || '.';
        const userName = m.pushName || 'User';
        
        // Uptime Calculation
        const uptimeSeconds = Math.floor((Date.now() - global['botStartTime']) / 1000);
        const hours = Math.floor(uptimeSeconds / 3600);
        const minutes = Math.floor((uptimeSeconds % 3600) / 60);
        const seconds = uptimeSeconds % 60;
        const uptimeString = `${hours}h ${minutes}m ${seconds}s`;

        // Screenshot-style Menu Layout
        const menuText = `
┏━━━━━━━━━━━━━━━━━━━━━━┓
┃  🤖 *ＲＡＨＵＬ - ＡＩ* 🤖
┗━━━━━━━━━━━━━━━━━━━━━━┛
👤 *User:* ${userName}
⏱️ *Uptime:* ${uptimeString}
⚙️ *Prefix:* [ ${botPrefix} ]

┗━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━⬢ *DOWNLOAD COMMAND LIST* ⬢━━━━━┓
┃
┃ ⬡ ${botPrefix}an1
┃ ⬡ ${botPrefix}dl-npm
┃ ⬡ ${botPrefix}play
┃ ⬡ ${botPrefix}video
┃ ⬡ ${botPrefix}drama
┃ ⬡ ${botPrefix}apk
┃ ⬡ ${botPrefix}fb
┃ ⬡ ${botPrefix}gitclone
┃ ⬡ ${botPrefix}gdrive
┃ ⬡ ${botPrefix}mediafire
┃ ⬡ ${botPrefix}tiktok
┃ ⬡ ${botPrefix}ytmp3
┃ ⬡ ${botPrefix}ytmp4
┃ ⬡ ${botPrefix}ig
┃ ⬡ ${botPrefix}spotify
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━⬢ *CORE & GENERAL LIST* ⬢━━━━━┓
┃
┃ ⬡ ${botPrefix}alive
┃ ⬡ ${botPrefix}ping
┃ ⬡ ${botPrefix}uptime
┃ ⬡ ${botPrefix}owner
┃ ⬡ ${botPrefix}botinfo
┃ ⬡ ${botPrefix}runtime
┃ ⬡ ${botPrefix}speed
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━⬢ *AI & TOOLS LIST* ⬢━━━━━┓
┃
┃ ⬡ ${botPrefix}sticker
┃ ⬡ ${botPrefix}take
┃ ⬡ ${botPrefix}toimg
┃ ⬡ ${botPrefix}ocr
┃ ⬡ ${botPrefix}tts
┃ ⬡ ${botPrefix}ai
┃ ⬡ ${botPrefix}gen
┃ ⬡ ${botPrefix}translate
┃ ⬡ ${botPrefix}calc
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━⬢ *GAMES & FUN LIST* ⬢━━━━━┓
┃
┃ ⬡ ${botPrefix}blue
┃ ⬡ ${botPrefix}flag
┃ ⬡ ${botPrefix}guessgender
┃ ⬡ ${botPrefix}style
┃ ⬡ ${botPrefix}dare
┃ ⬡ ${botPrefix}truth
┃ ⬡ ${botPrefix}roll
┃ ⬡ ${botPrefix}ship
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━⬢ *ADMIN COMMAND LIST* ⬢━━━━━┓
┃
┃ ⬡ ${botPrefix}tagall
┃ ⬡ ${botPrefix}tagme
┃ ⬡ ${botPrefix}group
┃ ⬡ ${botPrefix}kick
┃ ⬡ ${botPrefix}promote
┃ ⬡ ${botPrefix}demote
┃ ⬡ ${botPrefix}hidetag
┃ ⬡ ${botPrefix}antilink
┃ ⬡ ${botPrefix}save
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

> *POWERED BY RAHUL-AI*`.trim();

        // Send Final Menu Image
        try {
            const bannerRes = await axios.get(mainBanner, { responseType: 'arraybuffer' });
            await conn.reply(bannerRes.data, { caption: menuText });
        } catch (error) {
            await conn.reply(menuText);
        }
    }
};
