import { exec } from 'child_process'

let handler = async (m, { conn, text, isOwner }) => {
    if (!isOwner) {
        return m.reply('❌ Ye command sirf bot ka owner use kar sakta hai!')
    }

    m.reply('🔄 Bot ko update kiya ja raha hai, kripya intezaar karein...')

    exec('git pull', (err, stdout, stderr) => {
        if (err) {
            return m.reply(`❌ Update karne me error aayi:\n\`\`\`${err.message}\`\`\``)
        }
        
        if (stdout && stdout.includes('Already up to date.')) {
            return m.reply('✨ Aapka bot pehle se hi latest version par hai!')
        }

        exec('npm install', (npmErr, npmStdout, npmStderr) => {
            if (npmErr) {
                return m.reply(`❌ Dependencies install karne me error aayi:\n\`\`\`${npmErr.message}\`\`\``)
            }
            
            m.reply('✅ Bot successfully update ho gaya hai! Restart ho raha hai...')
            
            setTimeout(() => {
                process.exit(0)
            }, 2000)
        })
    })
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = /^update$/i
handler.rowner = true

export default handler
