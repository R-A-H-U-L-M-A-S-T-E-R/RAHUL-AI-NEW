const axios = require('axios');

module.exports = {
    name: 'instadl',
    aliases: ['insta', 'instagram', 'ig'],
    
    async execute(sock, m, args) {
        await m.react('📥');
        
        if (!args.length) {
            return m.reply(`📸 ɪɴsᴛᴀɢʀᴀᴍ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ\n\nᴜsᴀɢᴇ: .ɪɢᴅʟ <ɪɴsᴛᴀɢʀᴀᴍ ᴜʀʟ>\n\nexᴀᴍᴘʟᴇ: .ɪɢᴅʟ ʜᴛᴛᴘs://ᴡᴡᴡ.ɪɴsᴛᴀɢʀᴀᴍ.ᴄᴏᴍ/ʀᴇᴇʟ/xxxxxxxx`);
        }
        
        const url = args[0];
        
        if (!url.includes('instagram.com')) {
            return m.reply('❌ ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴠᴀʟɪᴅ ɪɴsᴛᴀɢʀᴀᴍ ᴜʀʟ');
        }
        
        await m.reply(`⏳ ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ɪɴsᴛᴀɢʀᴀᴍ ᴄᴏɴᴛᴇɴᴛ...`);
        
        try {
            // Navin API URL encode karun takli ahe
            const apiUrl = `https://api.sayan-nexuswork.workers.dev/insta?url=${encodeURIComponent(url)}`;
            
            const response = await axios({
                method: 'get',
                url: apiUrl,
                timeout: 30000
            });
            
            // API response check karat ahe
            if (!response.data) {
                throw new Error('API returned empty response');
            }
            
            // Sayan api structures nusar data extract karat ahe (fallback handle kelay)
            const resultData = response.data.data || response.data.result || response.data;
            const mediaUrl = Array.isArray(resultData) ? resultData[0] : (resultData.url || resultData.downloadUrl || resultData);
            
            if (!mediaUrl) {
                throw new Error('Could not find media URL from API response');
            }

            // Direct media download buffer sathi
            const mediaResponse = await axios({
                method: 'get',
                url: typeof mediaUrl === 'string' ? mediaUrl : mediaUrl.url,
                responseType: 'arraybuffer',
                timeout: 60000
            });
            
            const buffer = Buffer.from(mediaResponse.data);
            const isVideo = true; // Most reels/videos sathi default true thevlay, or check extension/mimetype
            
            const caption = `📸 *ɪɴsᴛᴀɢʀᴀᴍ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*\n\n` +
                           `> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴜʟ ᴍᴀꜱᴛᴇʀ`;
            
            // Video kinwa image pathavnyasathi logic
            try {
                await m.reply(buffer, { 
                    caption: caption,
                    video: buffer,
                    mimetype: 'video/mp4'
                });
            } catch (e) {
                // Jar video nsel kinwa error ala tar document/image sarkha send hoil
                await m.reply(buffer, { 
                    caption: caption,
                    image: buffer
                });
            }
            
        } catch (err) {
            console.error('instadl error:', err);
            await m.reply(`❌ ғᴀɪʟᴇᴅ ᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ ɪɴsᴛᴀɢʀᴀᴍ ᴄᴏɴᴛᴇɴᴛ\n\n${err.message}`);
        }
    }
};
