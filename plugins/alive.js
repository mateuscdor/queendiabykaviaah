const config = require('../config');
const prefix = '.'
async function alive(conn , mek) {
  const from = mek.key.remoteJid

  var alivemsg = ''
	if (config.ALIVEMSG == 'default') alivemsg = '```👋 ```Hey there, I\'m alive now```\n\n_Version:_ ```' + config.VERSION + '```\n\n_POWERED BY KAVIYAAH``` \n\n\n'
  if (!config.ALIVEMSG == 'default') alivemsg = config.ALIVEMSG
  const templateButtons = [
  {index: 1, urlButton: {displayText: '🌐 TAP ME', url: 'url ekak na halo'}},
  {index: 2, urlButton: {displayText: '👨🏻‍💻 TAP ME 👁️', url: 'mokuth na halo'}},
  {index: 3, quickReplyButton: {displayText: 'MENU', id: prefix +'menu' }} , 
  {index: 4, quickReplyButton: {displayText: 'OWNER', id: prefix +'owner' }}   
 ]
   const buttonMessage = {
    text: alivemsg ,
    footer: config.FOOTER,
    templateButtons: templateButtons,
    image: {url: config.ALIVE_LOGO}
}                             
await conn.sendMessage(from, buttonMessage )
}

module.exports =  alive ;
