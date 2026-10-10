module.exports = {
    name: 'update',
    alias: ['up', 'upgrade', 'deploy'],
    description: 'Triggers a fresh deployment on Koyeb via API to update the bot.',
    category: 'owner',
    async execute(conn, m, { reply }) {
        try {
            await reply('🔄 *Triggering update on Koyeb Cloud... Please wait.*');

            const KOYEB_API_TOKEN = process.env.KOYEB_API_TOKEN;
            // Aapki current service ID jo screenshot me hai
            const SERVICE_ID = process.env.KOYEB_SERVICE_ID || '5dda4504-94d8-446a-802b-0e807984bc4a';

            if (!KOYEB_API_TOKEN) {
                return reply('❌ *Configuration Missing:* Please add `KOYEB_API_TOKEN` in your Koyeb Environment Variables.');
            }

            const response = await fetch(`https://app.koyeb.com/v1/services/${SERVICE_ID}/redeploy`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${KOYEB_API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });

            const data = await response.json();

            if (response.ok) {
                await reply('✨ *Update triggered successfully!*\n\n🚀 Koyeb is pulling the latest changes from GitHub (`R-A-H-U-L-M-A-S-T-E-R/RAHUL-AI-NEW`) and rebuilding your bot. It will restart shortly.');
            } else {
                const errMsg = data.message || JSON.stringify(data);
                reply(`❌ *Koyeb API Error:* \n\`\`\`${errMsg}\`\`\``);
            }

        } catch (e) {
            console.error(e);
            reply(`❌ *Error running command:* \n\`\`\`${e.message}\`\`\``);
        }
    }
};
