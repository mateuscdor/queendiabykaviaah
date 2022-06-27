const { EmojiAPI } = require("emoji-api");
const config = require('../config');
const prefix = '.'
async function emoji(conn , mek , q ) {
  const from = mek.key.remoteJid


const emoji = new EmojiAPI();
emoji.get("🥺")
    .then(emoji => {
       // console.log(emoji.images[4].url);
  conn.sendMessage(from , { text: emoji.images[4].url }, { quoted: mek } )
    })

                          

}

module.exports =  emoji ;
