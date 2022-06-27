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
    var emtestimg = await axios.get(`${emoji.images[4].url}`, { responseType: 'arraybuffer' })
  conn.sendMessage(from , (emtestimg.data), MessageType.image, { mimetype: Mimetype.jpg})
    })

// await conn.sendMessage(from , { text: emoji.images[4].url }, { quoted: mek } )                         

}

module.exports =  emoji ;


/* 
const { EmojiAPI } = require("emoji-api");
const config = require('../config');
const fs = require('fs');
const axios = require('axios');

const prefix = '.'


async function emoji(conn , mek , q ) {
  const from = mek.key.remoteJid


const emoji = new EmojiAPI();
emoji.get(q)
    .then(emoji => {
       // console.log(emoji.images[4].url);
  conn.sendMessage(from , { text: emoji.images[4].url }, { quoted: mek } )

  var emtestimg = await axios.get(`${emoji.images[4].url}`, { responseType: 'arraybuffer' })
  conn.sendMessage(from , (emtestimg.data), MessageType.image, { mimetype: Mimetype.jpg})
  
    })

                          

}

module.exports =  emoji ;*/
