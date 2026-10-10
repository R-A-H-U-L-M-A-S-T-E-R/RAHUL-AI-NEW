const { sendInteractiveMessage } = require('gifted-btns');
const process = require('process');

module.exports = {
    name: 'uptime',
    aliases: ['up'],
    description: 'Check how long the bot has been running.',

    async execute(sock, m) {
        const uptime = process.uptime();

        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);

        const formattedTime = `${hours}h ${minutes}m ${seconds}s`;

        await sendInteractiveMessage(sock, m.from, {
            title: '⏱️ BOT UPTIME',
            text: `The bot has been running for:\n\n*${formattedTime}*`,
            footer: '𝚁𝙰𝙷𝚄𝙻-𝙰𝙸 - 𝙿𝙾𝚆𝙴𝚁𝙰𝙳 𝙱𝚈 𝚁𝙰𝙷𝚄𝙻 𝙼𝙰𝚂𝚃𝙴𝚁',
            interactiveButtons: [
                {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                        display_text: 'Visit Website',
                        url: 'https://abztech.my.id'
                    })
                }
            ]
        });
    }
};
