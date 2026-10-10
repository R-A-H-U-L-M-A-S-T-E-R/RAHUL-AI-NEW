const axios = require('axios');
const pix = require('pixcore');
const yts = require('yt-search');

module.exports = {
    name: 'play',
    description: 'Search YouTube with image loading effect and percentage count',
    aliases: ['yt', 'song'],
    command: /^.?(play|yt|song)/i,

    async execute(sock, m, args) {
        await m.react('🔥');
        const prefix = global.BOT_PREFIX || '.';
        const chatId = m.key.remoteJid;
        const query = args.join(" ").trim();

        if (!query) {
            return m.reply(`> ⚠️ *Usage Error:* \`${prefix}play <song name or link>\``);
        }

        const customImageUrl = 'https://sam-cdn.zone.id/files/QyFk2yt61I.jpg';

        // 1. Initial Loading Message with Image (10%)
        let loadingMsg = await sock.sendMessage(chatId, { 
            image: { url: customImageUrl },
            caption: `\`[ 💎 STAGE 01 : HARVESTING RAHUL-AI ]\`\n✨ 🔮 \`[░░░░░░░░░░]\` 10%\n| *Searching song...*`
        }, { quoted: m });

        try {
            // 150ms delay for 50% edit
            await new Promise(r => setTimeout(r, 150));
            await sock.sendMessage(chatId, { 
                text: `\`[ 💎 STAGE 01 : HARVESTING RAHUL-AI ]\`\n✨ 🔮 \`[█████░░░░░]\` 50%\n| *Processing data...*`, 
                edit: loadingMsg.key 
            });

            let finalUrl = query;
            let title = "YouTube Media";
            let duration = "Unknown";
            let views = "Unknown";
            let author = "Unknown";

            // YouTube Search Workflow
            if (!query.includes("youtube.com") && !query.includes("youtu.be")) {
                const results = await yts(query);

                if (!results || !results.videos || results.videos.length === 0) {
                    return await sock.sendMessage(chatId, { text: `> ❌ *No results found on YouTube.*`, edit: loadingMsg.key });
                }

                const v = results.videos[0];
                finalUrl = v.url;
                title = v.title;
                duration = v.timestamp;
                views = v.views;
                author = v.author.name;
            } else {
                const results = await yts(query);
                if (results && results.videos && results.videos.length > 0) {
                    const v = results.videos[0];
                    title = v.title;
                    duration = v.timestamp;
                    views = v.views;
                    author = v.author.name;
                }
            }

            // 150ms delay for 100% edit
            await new Promise(r => setTimeout(r, 150));
            await sock.sendMessage(chatId, { 
                text: `\`[ 💎 STAGE 01 : HARVESTING RAHUL-AI ]\`\n✨ 🔮 \`[██████████]\` 100%\n| *Media Loaded Successfully!*`, 
                edit: loadingMsg.key 
            });

            // Thumbnail Buffer for Final Buttons
            let thumb;
            try {
                const { data } = await axios.get(customImageUrl, { responseType: 'arraybuffer' });
                const img = await pix.read(Buffer.from(data));
                const resized = await img.resize(120, 120, { fit: 'cover' });
                thumb = await resized.toBuffer({ format: 'jpeg', quality: 85 });
            } catch {
                thumb = null;
            }

            // Final Layout Text
            const fancyText = 
`📌 *Title:* \`${title}\`
👤 *Channel:* \`${author}\`
⏱️ *Duration:* \`${duration}\`
👁️ *Views:* \`${views.toLocaleString ? views.toLocaleString() : views}\`

> *Select an option below to download:*
🔥 *Powered by RAHUL MASTER*`;

            // Delete loading message
            try { await sock.sendMessage(chatId, { delete: loadingMsg.key }); } catch {}

            // Send Final Interactive Message with Buttons
            await sock.relayMessage(
                chatId,
                {
                    buttonsMessage: {
                        text: fancyText,
                        contentText: fancyText,
                        footerText: '🔥 Powered by RAHUL MASTER',
                        locationMessage: {
                            name: title,
                            address: "RAHUL-AI Fast Downloader",
                            jpegThumbnail: thumb
                        },
                        buttons: [
                            {
                                buttonId: `${prefix}ytmp3 ${finalUrl}`,
                                buttonText: { displayText: '🎵 AUDIO (MP3)' },
                                type: 1
                            },
                            {
                                buttonId: `${prefix}ytmp4 ${finalUrl}`,
                                buttonText: { displayText: '🎬 VIDEO (MP4)' },
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
            if (loadingMsg) {
                await sock.sendMessage(chatId, { text: `> ❌ *An error occurred during search.*`, edit: loadingMsg.key });
            } else {
                m.reply('> ❌ *Failed to process request.*');
            }
        }
    }
};
