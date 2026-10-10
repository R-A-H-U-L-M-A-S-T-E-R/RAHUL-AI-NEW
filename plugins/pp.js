module.exports = {
  name: 'profilepic',
  description: 'Get profile picture',
  aliases: ['pp', 'dp'],
  tags: ['tools'],
  command: /^\.?(profilepic|pp|dp)/i,

  async execute(sock, m) {
    try {
      
            await m.react('🖼️');
      const jid = m.quoted?.key?.participant || m.sender

      let ppUrl
      try {
        ppUrl = await sock.profilePictureUrl(jid, 'image')
      } catch {
        ppUrl = await sock.profilePictureUrl(jid, 'preview')
      }

      const quotedMsg = m.quoted || {
        key: {
          remoteJid: m.from,
          fromMe: false,
          id: m.id,
          participant: m.sender
        },
        message: {
          extendedTextMessage: {
            text: m.body
          }
        }
      }

      await sock.sendMessage(
        m.from,
        {
          image: { url: ppUrl },
          caption: 'Profile picture',
          contextInfo: {
            forwardedNewsletterMessageInfo: {
              newsletterJid: '@newsletter',
              newsletterName: 'ʀᴀʜᴜʟ-ᴀɪ「 𝙿𝙾𝚆𝙴𝚁𝙰𝙳 𝙱𝚈 𝚁𝙰𝙷𝚄𝙻 𝙼𝙰𝚂𝚃𝙴𝚁 」'
            },
            isForwarded: true,
            externalAdReply: {
              title: 'RAHUL-AI',
              body: '𝙿𝙾𝚆𝙴𝚁𝙰𝙳 𝙱𝚈 𝚁𝙰𝙷𝚄𝙻 𝙼𝙰𝚂𝚃𝙴𝚁',
              thumbnailUrl: ppUrl,
              mediaType: 1,
              mediaUrl: 'https://abztech.my.id',
              sourceUrl: 'https://abztech.my.id',
              showAdAttribution: true
            }
          }
        },
        { quoted: quotedMsg }
      )

    } catch (err) {
      console.error('Profile pic error:', err)
      m.reply('Failed to fetch profile picture.')
    }
  }
}
