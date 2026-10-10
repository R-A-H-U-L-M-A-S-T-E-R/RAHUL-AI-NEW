const axios = require('axios');
const pix = require('pixcore');
const yts = require('yt-search');

module.exports = {
    name: 'play',
    description: 'Search YouTube and choose MP3 or MP4 to download with lightning effect',
    aliases: ['yt', 'song'],
    command: /^.?(play|yt|song)/i,

    async execute(sock, m, args) {
        await m.react('⚡');
        const prefix = global.BOT_PREFIX || '.';
        const chatId = m.key.remoteJid;
        const query = args.join(" ").trim();

        if (!query) {
            return m.reply(`> *⚠️ Usage Error:*\n> Type: \`${prefix}play <song name or youtube link>\``);
        }

        let sentMsg;
        try {
            // Step 1: Lightning effect initial message
            sentMsg = await sock.sendMessage(chatId, { 
                text: `\`⚡ █▒▒▒▒▒▒▒▒▒ 10%\`\n> *Igniting RAHUL-AI Engine...*` 
            });

            // Delay effect to give smooth lightning feel
            await new Promise(r => setTimeout(r, 600));
            await sock.sendMessage(chatId, { text: `\`⚡ █████▒▒▒▒▒ 50%\`\n> *Connecting to YouTube Matrix...*`, edit: sentMsg.key });

            let finalUrl = query;
            let title = "YouTube Media";
            let thumbUrl = null;
            let duration = "Unknown";
            let views = "Unknown";
            let author = "Unknown";

            if (!query.includes("youtube.com") && !query.includes("youtu.be")) {
                const results = await yts(query);

                if (!results || !results.videos || results.videos.length === 0) {
                    return await sock.sendMessage(chatId, { text: `> *❌ No results found on YouTube.*`, edit: sentMsg.key });
                }

                const v = results.videos[0];
                finalUrl = v.url;
                title = v.title;
                thumbUrl = v.thumbnail;
                duration = v.timestamp;
                views = v.views;
                author = v.author.name;
            } else {
                const results = await yts(query);
                if (results && results.videos && results.videos.length > 0) {
                    const v = results.videos[0];
                    title = v.title;
                    thumbUrl = v.thumbnail;
                    duration = v.timestamp;
                    views = v.views;
                    author = v.author.name;
                }
            }

            await new Promise(r => setTimeout(r, 600));
            await sock.sendMessage(chatId, { text: `\`⚡ ██████████ 100%\`\n> *Media Loaded Successfully!*`, edit: sentMsg.key });

            let thumb;
            try {
                const { data } = await axios.get(thumbUrl, { responseType: 'arraybuffer' });
                const img = await pix.read(Buffer.from(data));
                const resized = await img.resize(120, 120, { fit: 'cover' });
                thumb = await resized.toBuffer({ format: 'jpeg', quality: 85 });
            } catch {
                thumb = null;
            }

            // Styled text layout for media
            const fancyText = 
`┏━━━ ⚡ *RAHUL-AI PLAYER* ━━━
┃ 📌 *Title:* \`${title}\`
┃ 👤 *Channel:* \`${author}\`
┃ ⏱️ *Duration:* \`${duration}\`
┃ 👁️ *Views:* \`${views.toLocaleString ? views.toLocaleString() : views}\`
┗━━━━━━━━━━━━━━━━━━━━━━━

> *Select download option below:*`;

            // Delete the progress/lightning message to send clean interactive buttons message
            try { await sock.sendMessage(chatId, { delete: sentMsg.key }); } catch {}

            // Send Final Interactive Buttons Message
            await sock.relayMessage(
                chatId,
                {
                    buttonsMessage: {
                        text: fancyText,
                        contentText: fancyText,
                        footerText: '「 ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴜʟ ᴍᴀꜱᴛᴇ🇷 」',
                        locationMessage: {
                            name: title,
                            address: "RAHUL-AI Lightning Downloader",
                            jpegThumbnail: thumb
                        },
                        buttons: [
                            {
                                buttonId: `${prefix}ytmp3 ${finalUrl}`,
                                buttonText: { displayText: '🎧 AUDIO (MP3)' },
                                type: 1
                            },
                            {
                                buttonId: `${prefix}ymp4 ${finalUrl}`,
                                buttonText: { displayText: '🎥 VIDEO (MP4)' },
                                type: 1
                            }
                        ],
                        headerType: 6
                    }
                },
                {
                    additionalNodes: [
                        {
                            tag: 'biz',
                            attrs: {},
                            content: [
                                {
                                    tag: 'interactive',
                                    attrs: { type: 'native_flow', v: '1' },
                                    content: [
                                        { tag: 'native_flow', attrs: { v: '9', name: 'mixed' } }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            );

        } catch (err) {
            console.error('Play error:', err);
            if (sentMsg) {
                await sock.sendMessage(chatId, { text: `> *❌ Failed to process media request.*`, edit: sentMsg.key });
            } else {
                m.reply('> *❌ Failed to process request.*');
            }
        }
    }
};
