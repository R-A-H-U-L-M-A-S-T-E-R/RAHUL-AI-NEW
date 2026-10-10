/*------------------------------------------------------------------------------------------------------------------------------------------------------

   RAHUL-AI WhatsApp Bot Framework
   Developed & Maintained by: RAHUL-AI
   License: GPL-3.0

------------------------------------------------------------------------------------------------------------------------------------------------------*/

const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const { fromBuffer } = require('file-type');
const {
    config,
    System,
    isPrivate,
    toAudio,
    toVideo,
    sendUrl,
    webp2mp4,
    setData,
    getData,
    translate
} = require("../lib/");
const { 
    trim,
    removeBg,
    getBuffer,
    AddMp3Meta
} = require("./client/"); 
const fancy = require('./client/fancy');

// 1. Audio to MP3 Converter
System({
    pattern: "mp3",
    fromMe: isPrivate,
    desc: "Convert media to MP3 with metadata",
    type: "converter",
}, async (message) => {
    if (!message.reply_message?.video && !message.reply_message?.audio) {
        return await message.reply("_Media file (audio/video) reply kara._");
    }

    const downloadedMedia = await message.reply_message.download();
    const audioResult = await toAudio(downloadedMedia);
    
    // Default metadata set up
    const [title, author, image] = (config.AUDIO_DATA || "RAHUL-AI;RAHUL-AI;https://i.imgur.com/8N48x0b.jpg").split(";");
    const albumArt = await getBuffer(image);
    
    const finalAudio = await AddMp3Meta(audioResult, albumArt, { title, body: author });
    await message.reply(finalAudio, { mimetype: "audio/mp4" }, "audio");
});

// 2. Video to PTV (Picture in Title/Video note)
System({
    pattern: "ptv",
    fromMe: isPrivate,
    desc: "Convert video to video note (PTV)",
    type: "converter",
}, async (message) => {
    const isVideo = message.video || message.reply_message?.video;
    if (!isVideo) return await message.reply("_Video file reply kara._");

    const targetMsg = message.video ? message.msg : message.reply_message.msg;
    const buffer = await message.downloadMediaMessage(targetMsg);
    
    await message.reply(buffer, { ptv: true }, "video");
});

// 3. Audio to Waveform Voice Note
System({
    pattern: "wawe",
    fromMe: isPrivate,
    desc: "Convert audio to PTT voice note",
    type: "converter",
}, async (message) => {
    if (!message.reply_message?.audio && !message.reply_message?.video) {
        return await message.reply("_Audio kiwa Video reply kara._");
    }

    const mediaBuffer = await message.reply_message.download();
    const voiceNote = await toAudio(mediaBuffer, "opus");
    
    return await message.send(voiceNote, { mimetype: 'audio/mpeg', ptt: true, quoted: message.data }, "audio");
});

// 4. Sticker to MP4 Video
System({
    pattern: "mp4",
    fromMe: isPrivate,
    desc: "Convert animated sticker to MP4 video",
    type: "converter",
}, async (message) => {
    if (!message.reply_message?.sticker) return await message.reply("_Sticker reply kara._");
    if (!message.reply_message.isAnimatedSticker) return await message.reply("_Animated sticker reply kara._");

    const stickerBuffer = await message.reply_message.download();
    const videoBuffer = await webp2mp4(stickerBuffer);
    
    return await message.send(videoBuffer, {}, "video");
});

// 5. Audio to Black Screen Video
System({
    pattern: "black",
    fromMe: isPrivate,
    desc: "Convert audio to black screen video",
    type: "converter"
}, async (message) => {
    if (!message.reply_message?.audio) return await message.reply("_Audio message reply kara._");

    const blackImagePath = './plugins/client/black.jpg';
    const tempAudioPath = './lib/temp/audio.mp3';
    const tempOutputPath = './lib/temp/videoMixed.mp4';

    fs.writeFileSync(tempAudioPath, await message.reply_message.download());

    ffmpeg()
        .input(blackImagePath)
        .input(tempAudioPath)
        .output(tempOutputPath)
        .on('end', async () => {
            await message.send(fs.readFileSync(tempOutputPath), {}, 'video');
        })
        .on('error', async (err) => {
            console.error('RAHUL-AI FFmpeg Error:', err);
            await message.reply("_Video convert kartana error ala._");
        })
        .run();
});

// 6. Fancy Text Generator
System({
    pattern: "fancy",
    fromMe: isPrivate,
    desc: "Convert simple text to fancy font styles",
    type: "converter",
}, async (message, match) => {
    if (!match && !message.reply_message?.text) {
        return await message.reply(`\n*RAHUL-AI Fancy Text Generator*\n\n*Example:*\n- reply text + : fancy 7\n- command: fancy Rahul 5\n\n` + String.fromCharCode(8206).repeat(4001) + fancy.list('Text Here', fancy));
    }

    const styleId = match.match(/\d/g)?.join('');
    try {
        if (!styleId && !message.quoted) {
            return await message.reply(fancy.list(match, fancy));
        }
        
        const textToFormat = message.reply_message.text || match.replace(styleId, '');
        const selectedStyle = fancy[parseInt(styleId) - 1];
        
        return await message.reply(fancy.apply(selectedStyle, textToFormat));
    } catch {
        return await message.reply('_Style सापडली नाही._');
    }
});

// 7. Media to Document
System({
    pattern: "doc",
    fromMe: isPrivate,
    desc: "Convert image/video/audio to document file",
    type: "converter",
}, async (message, match) => {
    const fileName = (match || "RAHUL-AI-Media").replace(/[^A-Za-z0-9]/g, '-');
    
    const isValidMedia = message.image || message.video || (message.quoted && (message.reply_message.image || message.reply_message.audio || message.reply_message.video));
    if (!isValidMedia) return await message.reply("_Video, Audio kiwa Image reply kara._");

    const targetMsg = (message.video || message.image) ? message.msg : message.reply_message.msg;
    const mediaBuffer = await message.downloadMediaMessage(targetMsg);
    
    const { ext, mime } = await fromBuffer(mediaBuffer);
    return await message.reply(mediaBuffer, { mimetype: mime, fileName: `${fileName}.${ext}` }, "document");
});

// 8. Media to URL
System({
    pattern: "url",
    fromMe: isPrivate,
    desc: "Convert media to CDN/Web URL",
    type: "converter",
}, async (message) => {
    const isMedia = message.quoted && (message.reply_message.image || message.reply_message.video || message.reply_message.audio || message.reply_message.sticker);
    if (!isMedia) return await message.reply('_Image, Video, Audio kiwa Sticker reply kara._');

    return await sendUrl(message);
});

// 9. Remove Background (RBG)
System({
    pattern: "rbg",
    fromMe: isPrivate,
    desc: "Remove image background using Remove.bg API",
    type: "converter",
}, async (message, match) => {
    if (match && match.includes("key")) {
        const apiKey = match.split(":")[1]?.trim();
        await setData(message.user.id, apiKey, "true", "removeBg");
        return await message.reply("*RAHUL-AI: API Key यशस्वीरीत्या सेव्ह झाली!*");
    }

    if (!message.image && !message.reply_message?.image) {
        return await message.reply("*Image reply करा.*");
    }

    const userData = await getData(message.user.id);
    if (!userData.removeBg) {
        return await message.reply(`*API Key आवश्यक आहे.* \n\n*Set करण्याचा पर्याय:* ${message.prefix} rbg key: _your_api_key_`);
    }

    const targetMsg = message.image ? message.msg : message.reply_message.msg;
    const savedImagePath = await message.downloadAndSaveMediaMessage(targetMsg);
    
    const processedBuffer = await removeBg(savedImagePath, userData.removeBg.message);
    if (!processedBuffer) return await message.reply("*API Key चूक आहे किंवा Upload करताना अडचण आली.*");

    await message.reply(processedBuffer, {}, "image");
});

// 10. Trim Audio/Video
System({
    pattern: "trim",
    fromMe: isPrivate,
    desc: "Trim audio or video length (e.g. .trim 1.0,3.0)",
    type: "converter",
}, async (message, text) => {
    const isValidMedia = message.video || (message.quoted && (message.reply_message.audio || message.reply_message.video));
    if (!isValidMedia) return await message.reply("*Audio/Video reply करा. उदा: .trim 1.0,3.0*");
    if (!text) return await message.reply("*Time specify करा उदा: .trim 1.0,3.0*");

    const times = text.split(',');
    const isValidNumbers = times.every(val => /^-?\d+(\.\d+)?$/.test(val.trim()));
    if (!isValidNumbers) return await message.reply("*Format बरोबर नाही. उदा: .trim 1.0,3.0*");

    const startTime = times[0].trim();
    const endTime = times[1].trim();

    if (message.video || message.reply_message?.video) {
        const targetMsg = message.video ? message.msg : message.reply_message.msg;
        const file = await message.downloadMediaMessage(targetMsg);
        const trimmed = await trim(file, startTime, endTime);
        
        if (!trimmed) return await message.reply("*Trim करताना एरर आला. Format तपासा.*");
        await message.reply(trimmed, {}, "video");
    } else if (message.reply_message?.audio) {
        const downloadedAudio = await message.reply_message.downloadAndSave();
        const convertedVideo = await toVideo(downloadedAudio);
        const trimmed = await trim(convertedVideo, startTime, endTime);

        if (!trimmed) return await message.reply("*Trim करताना एरर आला. Format तपासा.*");
        await message.reply(trimmed, { mimetype: "audio/mp4" }, "audio");
    }
});

// 11. Text Translation (TRT)
System({
    pattern: "trt",
    fromMe: isPrivate,
    desc: "Translate text to different languages",
    type: "converter",
}, async (message, match) => {
    let textToTranslate = match;
    
    if (message.quoted && message.reply_message.text) {
        textToTranslate = match ? `${message.reply_message.text};${match}` : message.reply_message.text;
    }

    if (!textToTranslate) return await message.reply("_भाषांतर करण्यासाठी टेक्स्ट द्या. उदा: hi;mr_");

    const lastSemicolonPos = textToTranslate.lastIndexOf(";");
    const [content, targetLang] = lastSemicolonPos === -1 
        ? [textToTranslate, config.LANGUAGE || "mr"] 
        : [textToTranslate.slice(0, lastSemicolonPos), textToTranslate.slice(lastSemicolonPos + 1)];

    const translatedResult = await translate(content, targetLang.trim());
    return await message.reply(translatedResult || "_भाषांतर अयशस्वी झाले._");
});
