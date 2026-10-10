const axios = require('axios');
const FormData = require('form-data');

Sparky({
		name: "mp3",
		fromMe: isPublic,
		category: "converters",
		desc: "Converts video/audio to MP3. Powered by RAHUL-AI"
	},
	async ({
		m,
		args
	}) => {
		if (!m.quoted || !(m.quoted.message.audioMessage || m.quoted.message.videoMessage || (m.quoted.message.documentMessage && m.quoted.message.documentMessage.mimetype === 'video/mp4'))) {
			return await m.reply("Please reply to an audio or video to convert it into MP3! - RAHUL-AI");
		}
		
		await m.react('⏫');

		try {
			// Download downloaded buffer from WhatsApp
			const mediaBuffer = await m.quoted.download();

			// Prepare Multipart Form Data for API
			const form = new FormData();
			form.append('file', mediaBuffer, { filename: 'media.tmp' });

			// Call your API Server
			const response = await axios.post('http://localhost:3000/api/convert/mp3', form, {
				headers: {
					...form.getHeaders()
				},
				responseType: 'arraybuffer'
			});

			const mp3Buffer = Buffer.from(response.data);

			// Send back converted audio
			await m.sendMsg(m.jid, mp3Buffer, { mimetype: "audio/mpeg", quoted: m }, 'audio');
			return await m.react('✅');

		} catch (error) {
			console.error("API Conversion Error:", error);
			await m.reply("Conversion failed! Please check API server. - RAHUL-AI");
			return await m.react('❌');
		}
	});
