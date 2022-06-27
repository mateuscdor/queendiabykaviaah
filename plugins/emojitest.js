const { EmojiAPI } = require("emoji-api");
const config = require('../config');
const prefix = '.'
async function emoji(conn , mek , q ) {
  const from = mek.key.remoteJid


const emoji = new EmojiAPI();
emoji.get(q)
    .then(emoji => {
       // console.log(emoji.images[4].url);
  conn.sendMessage(from , { text: emoji.images[4].url }, { quoted: mek } )
  const buttons = [
    {buttonId: '.sticker', buttonText: {displayText: 'need it in sticker'}, type: 1}
  
  ]
  
  const buttonMessage = {
      image: {url: emoji.images[4].url },
      caption: "${q} converted to a image",
      footer: 'QUEEN DIANA EMOJI CONVERTER',
      buttons: buttons,
      headerType: 4
  }
  
   conn.sendMessage(from, buttonMessage) 
        })               

}

module.exports =  emoji ;


