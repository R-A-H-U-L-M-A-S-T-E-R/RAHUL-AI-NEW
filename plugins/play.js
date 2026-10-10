const axios = require('axios');
const pix = require('pixcore');
const yts = require('yt-search');

module.exports = {
    name: 'play',
    description: 'Search YouTube with image in loadingMsg',
    aliases: ['yt', 'song'],
    command: /^.?(play|yt|song)/i,

    async execute(sock, m, args) {
        await m.react('⚡');
        const prefix = global.BOT_PREFIX || '.';
        const chatId = m.key.remoteJid;
        const query = args.join(" ").trim();

        if (!query) {
            return m.reply(`> ⚠️ *Usage Error:* \`${prefix}play <song name or link>\``);
        }

        const imageUrl = 'https://sam-cdn.zone.id/files/QyFk2yt61I.jpg';

        // 1. Loading Message सोबत Image पाठवणे
        let loadingMsg = await sock.sendMessage(chatId, {
            image: { url: imageUrl },
            caption: `\`[ ⚡ 10% ]\` ───▸ *Searching for song...*`
        }, { quoted: m });

        try {
            // 150ms Fast Delay
            await new Promise(r => setTimeout(r, 150));

            let finalUrl = query;
            let title = "YouTube Media";
            let duration = "Unknown";
            let views = "Unknown";
            let author = "Unknown";

            // YouTube Search Workflow
            if (!query.includes("youtube.com") && !query.includes("youtu.be")) {
                const results = await yts(query);

                if (!results || !results.videos || results.videos.length === 0) {
                    return await sock.sendMessage(chatId, { text: `> ❌ *No results found on YouTube.*` }, { quoted: loadingMsg });
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

            // Next 150ms Fast Delay
            await new Promise(r => setTimeout(r, 150));

            // Clean Text Format (इमेज कॅप्शनसाठी)
            const fancyText = 
`📌 *Title:* \`${title}\`
👤 *Channel:* \`${author}\`
⏱️ *Duration:* \`${duration}\`
👁️ *Views:* \`${views.toLocaleString ? views.toLocaleString() : views}\`

─────────────────────
> *Select an option below to download:*
🔥 *Powered by RAHUL MASTER*`;

            // Delete loading image message to replace with final buttons or reply to loading message
            try { await sock.sendMessage(chatId, { delete: loadingMsg.key }); } catch {}

            // Send Final Interactive Message with Image & Buttons
            await sock.sendMessage(
                chatId,
                {
                    image: { url: imageUrl },
                    caption: fancyText,
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
                    headerType: 4
                },
                { quoted: m }
            );

        } catch (err) {
            console.error('Play error:', err);
            if (loadingMsg) {
                await sock.sendMessage(chatId, { text: `> ❌ *An error occurred during search.*` }, { quoted: loadingMsg });
            } else {
                m.reply('> ❌ *Failed to process request.*');
            }
        }
    }
};
