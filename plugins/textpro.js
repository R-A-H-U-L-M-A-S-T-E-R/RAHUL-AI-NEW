const axios = require('axios');

module.exports = {
    name: 'textpro',
    description: 'Generate text effects with various styles (neon, glitter, fire, shadow, gradient, dropwater, cloud, pixel, underwater, summer,thunder,pencil,leaves)',
    aliases: ['txtpro', 'texteffect', 'te'],
    tags: ['maker'],
    command: /^\.?(textpro|txtpro|texteffect|te)$/i,

    async execute(sock, m, args) {
        try {
            let style = 'neon';
            let text = args.join(' ');
            
            if (text.includes('|')) {
                const parts = text.split('|');
                style = parts[0].trim().toLowerCase();
                text = parts.slice(1).join('|').trim();
            }
            
            const validStyles = ['neon', 'glitter', 'fire', 'shadow', 'gradient', 'dropwater', 'cloud', 'pixel', 'underwater','summer','thunder','pencil','leaves'];
            const firstWord = args[0]?.toLowerCase();
            if (validStyles.includes(firstWord) && args.length > 1) {
                style = firstWord;
                text = args.slice(1).join(' ');
            }
            
            if (!text) {
                const stylesList = `✦ *AVAILABLE STYLES* ✦
╭──────────────────◆
│  ✦ neon       » Neon Light
│  ✦ glitter    » Glitter Text  
│  ✦ fire       » Fire Text
│  ✦ shadow     » 3D Shadow
│  ✦ gradient   » Gradient
│  ✦ dropwater  » Dropwater
│  ✦ cloud      » Cloud Sky
│  ✦ pixel      » 3D Pixel
│  ✦ underwater » Underwater
│  ✦ summer     » summer
│  ✦ thunder    » thunder
│  ✦ pencil     » pencil
│  ✦ leaves     » leaves
╰──────────────────◆

📝 *Usage Examples:*
• .textpro MOVIEX
• .textpro neon | ABZTECH
• .textpro cloud HELLO WORLD
• .textpro pixel | GAMER

 𝙿𝙾𝚆𝙴𝚁𝙰𝙳 𝙱𝚈 𝚁𝙰𝙷𝚄𝙻 𝙼𝙰𝚂𝚃𝙴𝚁`;
                return await m.reply(stylesList);
            }

            await m.reply('⏳ `ɢᴇɴᴇʀᴀᴛɪɴɢ ᴛᴇxᴛ ᴇꜰꜰᴇᴄᴛ...`');

            const apiUrl = `https://api-abztech.zone.id/tools/textpro?text=${encodeURIComponent(text)}&style=${style}`;
            
            const imageBuffer = await axios.get(apiUrl, {
                responseType: 'arraybuffer'
            }).then(res => res.data);

            const caption = `┌─ム *${style.toUpperCase()} TEXT EFFECT*
│
│ ᪣ ᴛᴇxᴛ: ${text}
│ ᪣ ꜱᴛʏʟᴇ: ${style}
│
│ 𝙿𝙾𝚆𝙴𝚁𝙰𝙳 𝙱𝚈 𝚁𝙰𝙷𝚄𝙻 𝙼𝙰𝚂𝚃𝙴𝚁
╰─────────◆────────╯`;

            await m.reply(imageBuffer, {
                caption,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '@newsletter',
                        newsletterName: '──ʀᴀʜᴜʟ-ᴀɪ「 𝙿𝙾𝚆𝙴𝚁𝙰𝙳 𝙱𝚈 𝚁𝙰𝙷𝚄𝙻 𝙼𝙰𝚂𝚃𝙴𝚁 」',
                        serverMessageId: 1
                    }
                }
            });
        } catch (error) {
            console.error('Error in textpro command:', error);
            await m.reply('❌ ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ. ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ.');
        }
    }
};
