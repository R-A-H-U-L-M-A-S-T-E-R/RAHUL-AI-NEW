const os = require('os');

module.exports = {
    name: 'ping',
    aliases: ['speed', 'latency', 'p'],
    description: 'Check bot ultra-speed and system performance',

    async execute(sock, m, args) {
        const start = Date.now();
        
        try {
            // Initial swift reaction
            await m.react('🔥');
            
            const sentMsg = await m.reply('> *Establishing connection to RAHUL-AI core...* 🛰️');
            const latency = Date.now() - start;

            // Speed gauge logic
            let speedBar = '🟩🟩🟩🟩🟩';
            let speedLabel = 'Lightning Fast ⚡';
            if (latency > 200 && latency <= 500) {
                speedBar = '🟨🟨🟨🟩🟩';
                speedLabel = 'Stable 🟢';
            } else if (latency > 500) {
                speedBar = '🟥🟥🟨🟩🟩';
                speedLabel = 'Sluggish 🐢';
            }

            // System Uptime Calculation
            const uptime = process.uptime();
            const h = Math.floor(uptime / 3600);
            const m_time = Math.floor((uptime % 3600) / 60);
            const s = Math.floor(uptime % 60);
            const uptimeFormatted = `${h}h ${m_time}m${s}s`;

            // Memory Usage
            const totalRAM = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
            const freeRAM = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
            const usedRAM = (totalRAM - freeRAM).toFixed(2);

            // Cyberpunk/VIP Box Layout
            const pingText = 
`╭━━━〔 ⚡ *RAHUL-AI SPEED* ⚡ 〕━━━╮
┃
┃  ❖ *Response Time* : \`${latency} ms\`
┃  ❖ *Performance*   : ${speedLabel}
┃  ❖ *Speed Meter*   : ${speedBar}
┃
┣━━━〔 💻 *SYSTEM STATS* 〕━━━┫
┃
┃  ❖ *Uptime*  : \`${uptimeFormatted}\`
┃  ❖ *RAM Use* : \`${usedRAM} GB / ${totalRAM} GB\`
┃  ❖ *Platform*: \`${os.platform().toUpperCase()}\`
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯`;

            // Update the message
            await sock.sendMessage(m.from, {
                text: pingText,
                edit: sentMsg.key
            });

        } catch (err) {
            console.error('Ping command error:', err);
            const fallbackLatency = Date.now() - start;
            await m.reply(`> *RAHUL-AI Latency:* \`${fallbackLatency} ms\``);
        }
    }
};
