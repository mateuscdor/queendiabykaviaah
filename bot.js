const Config = require('./config');
const config = require('./config');
const events = require("./events");
const lusifarapi = require('textmaker-kaviyaah');
const {
	default: makeWASocket,
	useSingleFileAuthState,
	DisconnectReason,
	getContentType
} = require('@adiwajshing/baileys')
const fs = require('fs')
const P = require('pino')
const qrcode = require('qrcode-terminal')
const simpleGit = require('simple-git');
const git = simpleGit();
const exec = require('child_process').exec;
const Heroku = require('heroku-client');
const { PassThrough } = require('stream');
const heroku = new Heroku({ token: Config.HEROKU.API_KEY })
const { state, saveState } = useSingleFileAuthState('./session.json')
const { song ,  asong ,  dsong , getyt , video , yt720p , yt480p , yt360p}  = require('./plugins/youtube');
const { kick , add } = require('./plugins/admin')
const sticker = require('./plugins/sticker')
const util = require('util')
const alive = require('./plugins/alive')
const react = require('./plugins/react')
const setvar = require('./plugins/heroku')
const { updiana , fixdiana } = require('./plugins/aupdater')
const Language = require('./language');
const Lang = Language.getString('updater');
const { mediafireDl } = require('./lib/mediafire.js')

//================================
const path = require("path");

const chalk = require('chalk');



const {Message, StringSession, Image, Video} = require('./DIANA/');
const { DataTypes } = require('sequelize');
const { getMessage } = require("./plugins/sql/greetings");


const got = require('got');

//=====================================

const { XeonBotIncTiktok } = require('./lib/tiktokbyxeon');




const emoji = require('./plugins/emojitest.js')
const axios = require('axios');
const prefix = '.'
const ownerNumber = ['94769370897']
const cantfind = "*can't find anything*"


//sql
const DIANADB = config.DATABASE.define('DIANA', {
    info: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

fs.readdirSync('./plugins/sql/').forEach(plugin => {
    if(path.extname(plugin).toLowerCase() == '.js') {
        require('./plugins/sql/' + plugin);
    }
});

const plugindb = require('./plugins/sql/plugin');


// Yalnızca bir kolaylık. https://stackoverflow.com/questions/4974238/javascript-equivalent-of-pythons-format-function //
String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
   });
};
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};










const connectToWA = () => {
	const conn = makeWASocket({
		logger: P({ level: 'silent' }),
		printQRInTerminal: true,
		auth: state,
	})
	
	conn.ev.on('connection.update', async(update) => {
		const { connection, lastDisconnect } = update
		if (connection === 'close') {
			if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
				connectToWA()
			}
		} else if (connection === 'open') {
			console.log('conected')


            console.log(
                chalk.blueBright.italic('⬇️  Installing plugins...')
            );
            console.log(
                chalk.green.bold('👸𝚀𝚄𝙴𝙴𝙽 𝙳𝙸𝙰𝙽𝙰👸 𝚠𝚘𝚛𝚔𝚒𝚗𝚐 ' + config.WORKTYPE + ' 𝚗𝚘𝚠 👻'));
    
           /* fs.readdirSync('./plugins').forEach(plugin => {
                if(path.extname(plugin).toLowerCase() == '.js') {
                    require('./plugins/' + plugin);
                }
            });*/




			console.log('Queen Diana is Working'+ config.WORKTYPE +'  Now!')
			const msg = '*Queen Diana is Working'+ config.WORKTYPE +'  Now! 👸*\n\n```Please do not try plugins here. This is your LOG number.```\n_You can use commands in any other chat :)_\n\n\nThanks for using Queen DIANA'
			

const buttonMessage = {
    image: {url: 'https://telegra.ph/file/3217c19d381ae34b38012.jpg'},
    caption: msg  }
await conn.sendMessage(conn.user.id, buttonMessage)
		}
	})
	
	conn.ev.on('creds.update', saveState)
	
	conn.ev.on('messages.upsert', async(mek) => {
		try {
			mek = mek.messages[0]
			if (!mek.message) return
			
			mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
			if (mek.key && mek.key.remoteJid === 'status@broadcast') return
			const type = getContentType(mek.message)
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			
			const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
			const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : ( type == 'listResponseMessage') && mek.message.listResponseMessage.selectedRowId? mek.message.listResponseMessage.selectedRowId : (type == 'buttonsResponseMessage') && mek.message.buttonsResponseMessage.selectedButtonId  ? mek.message.buttonsResponseMessage.selectedButtonId  : (type == "templateButtonReplyMessage") && mek.message.templateButtonReplyMessage.selectedId ? mek.message.templateButtonReplyMessage.selectedId  :  (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
			
			const isCmd = body.startsWith(prefix)
			const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
			
			const args = body.trim().split(/ +/).slice(1)
			const q = args.join(' ')
			const isGroup = from.endsWith('@g.us')
			const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
			const senderNumber = sender.split('@')[0]
			const botNumber = conn.user.id.split(':')[0]
			const pushname = mek.pushName || 'Sin Nombre'
			
			const isMe = botNumber.includes(senderNumber)
			const isOwner = ownerNumber.includes(senderNumber) || isMe
			       
			
			
			
			const reply = async(teks) => {
				await conn.sendMessage(from, { text: teks }, { quoted: mek })
			}
			const sendtempimg = async( text , button , imgurl ) => {
				await conn.sendMessage(from, { text: text , footer: '👸 QUEEN DIANA MD Version', templateButtons: button , image: {url:  imgurl } }, { quoted: mek })
			}
			const sendbutimg = async( text , button , imgurl ) => {
			          	await conn.sendMessage(from, { image: {url:imgurl  }, caption: text, footer: '👸 QUEEN DIANA MD Version', buttons: button , headerType: 4} , { quoted: mek })
		         }
				
			
			
			
			// precence 
			
			 if (config.NO_ONLINE) {
            await conn.sendPresenceUpdate('unavailable' , mek.key.remoteJid);
        }
			
			const msg = mek
			
			// Block chat 
			
			if (config.BLOCKCHAT !== false) {     
            var abc = config.BLOCKCHAT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? abc.includes(msg.key.remoteJid.split('@')[0]) : abc.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        if (config.SUPPORT == '94769370897-1415817281') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        if (config.SUPPORT2 == '94769370897-1458298055') {     
            var tsup = config.SUPPORT2.split(',');                            
            if(msg.key.remoteJid.includes('-') ? tsup.includes(msg.key.remoteJid.split('@')[0]) : tsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        if (config.SUPPORT3 == '94769370897-1446476993') {     
            var nsup = config.SUPPORT3.split(',');                            
            if(msg.key.remoteJid.includes('-') ? nsup.includes(msg.key.remoteJid.split('@')[0]) : nsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
         if (config.Support4 == '94769370897-1630672792') {     
            var nsup = config.Support4.split(',');                            
            if(msg.key.remoteJid.includes('-') ? nsup.includes(msg.key.remoteJid.split('@')[0]) : nsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
         if (config.AMDI_1 == '94769370897-1533638214') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
       
         if (config.AMDI_3 == '94769370897-1631633729') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
         if (config.AMDI_4 == '94769370897-1631905677') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
         if (config.AMDI_5 == '94769370897-1636094186') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
         if (config.AMDI_6 == '972542559113-1376904403') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
         if (config.AMDI_7 == '94769370897-1636286090') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
			
			// commands
			
			switch (command) {





case 'alive':
alive(conn ,mek )

break


case 'mfire': 
	
if (!q) return reply("need url")
//if (!isUrl(args[0]) && !args[0].includes('mediafire.com')) return reply(`The link you provided is invalid`)
const baby1 = await mediafireDl(q)
if (baby1[0].size.split('MB')[0] >= 999) return reply('*File Over Limit* '+util.format(baby1))
const resuldiat4 = `*MEDIAFIRE DOWNLOADER*
				
*Name* : ${baby1[0].nama}
*Size* : ${baby1[0].size}
*Mime* : ${baby1[0].mime}
*Link* : ${baby1[0].link}`
reply(`${resuldiat4}`)
conn.sendMessage(from, { document : { url : baby1[0].link}, fileName : baby1[0].nama, mimetype: baby1[0].mime }, { quoted : mek }).catch ((err) => reply("error🥲"))

break

					
					
	case 'menu':	
		reply('no menu')		
	break
					
				case 'owner' :
					const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN:kavishka sandaruwan\n' // full name
            + 'ORG:Queen Diana;\n' // the organization of the contact
            + 'TEL;type=CELL;type=VOICE;waid=94789768567:+94 78 976 8567 \n' // WhatsApp ID + phone number
            + 'END:VCARD'
 await conn.sendMessage(
    from,
    { 
        contacts: { 
            displayName: 'kavishka sandaruwan (DIANA OWNEER)', 
            contacts: [{ vcard }] 
        }
    } , { quoted: mek }
)
					
					break
//================================================UPDATE=====================================================					
				case 'updatenow' :	

		if (!isMe) return await conn.sendMessage(from , { text: "*YOU ARE NOT BOT OWNER*" }, { quoted: mek } )
					 await git.fetch();
    var commits = await git.log([Config.BRANCH + '..origin/' + Config.BRANCH]);
    if (commits.total === 0) {
      //  reply('no updates')  
await  conn.sendMessage(from , { text: Lang.UPDATE }, { quoted: mek } )
  
    } else {
    if (Config.HEROKU.HEROKU) {
            try {
                var app = await heroku.get('/apps/' + Config.HEROKU.APP_NAME)
            } catch {
                conn.sendMessage(from , { text: Lang.INVALID_HEROKU + "\n\n" + IN_AF }, { quoted: mek } );
            }
            conn.sendMessage(from , { text: Lang.UPDATING }, { quoted: mek } );

            git.fetch('upstream', Config.BRANCH);
            git.reset('hard', ['FETCH_HEAD']);

            var git_url = app.git_url.replace(
                "https://", "https://api:" + Config.HEROKU.API_KEY + "@"
            )
            
            try {
                await git.addRemote('heroku', git_url);
            } catch { console.log('heroku remote ekli'); }
            await git.push('heroku', Config.BRANCH);

            conn.sendMessage(from , { text: Lang.UPDATED_LOCAL }, { quoted: mek } );
            conn.sendMessage(from , { text: Lang.AFTER_UPDATE }, { quoted: mek } );

        } 
    }
	break	
//===============================================CHECK UPDATE=========================================					
					
					case 'checkupdate' :	
					
		

					if (!isMe) return await conn.sendMessage(from , { text: "*YOU ARE NOT BOT OWNER*" }, { quoted: mek } )
					 await git.fetch();
    var commits = await git.log([Config.BRANCH + '..origin/' + Config.BRANCH]);
    if (commits.total === 0) {
       // reply('no updates')    
await  conn.sendMessage(from , { text: Lang.UPDATE }, { quoted: mek } )
    } else {

        var newzels = Lang.NEW_UPDATE ;
        commits['all'].map(
            (commit) => {
                newzels += '\n\n' +'🔹 [' + commit.date.substring(0, 10) + ']: ' + commit.message + ' ◁◁' + commit.author_name + '▷▷\n';
            }
        );
      //  reply(ne
await  conn.sendMessage(from , { text: newzels }, { quoted: mek } )

    }

	break
					
					



//===================================================================================
					
		
					
					
					
case 'tiktok':
if (!q) return reply('Need a Tik Tok video link')
  if (!q.includes('tiktok')) return reply(`That's not a tiktok link!`)
  
const buttons = [ {buttonId: `.ttwiwm ${q}`, buttonText: {displayText: '"WITH WATERMARK ✅'}, type: 1}, 
                   {buttonId: `.ttnowm ${q}`, buttonText: {displayText: 'WITHOUT WATERMARK ❌'}, type: 1}, 
                   {buttonId: `.ttonaud ${q}`, buttonText: {displayText: '"AUDIO 🎶'}, type: 1} ] 
          
          
          const buttonMessage = { 
          
                                   text: "SELECT YOUR TIKTOK VIDEO TYPR YOU WANT\n\n\n", 
                                   footer: 'Queen Diana',
                                   buttons: buttons, 
                                   headerType: 1 
                                   } 
          
        
         conn.sendMessage(from, buttonMessage, {quoted:mek})
break


					
 case 'ttnowm':
  		
  if (!q) return reply('Where is the link?')
  reply("Downloading")
  if (!q.includes('tiktok')) return reply(`That's not a tiktok link!`)
   const result = await XeonBotIncTiktok(`${q}`).catch(e => {
 reply("*Can't find anything :(*") 
} )
 
   const diatiktoknowm = result.result.nowatermark
    conn.sendMessage(from, { video: { url: diatiktoknowm }, caption: "Here you go!" }, { quoted: mek })
   
  break
  
case 'ttonaud':
	
	
  if (!q) return reply('Where is the audio?')
  if (!q.includes('tiktok')) return reply(`That's not a tiktok link!`)
   const diataresult = await XeonBotIncTiktok(`${q}`).catch(e => {
 reply("*Can't find anything :(*") 
} )
 
   const diatiktokaudio = diataresult.result.nowatermark
    conn.sendMessage(from, { audio: { url: diatiktokaudio }, mimetype: 'audio/mp4' }, { quoted: mek })
   
 break
 
 
 
case 'ttwiwm':
  		
  if (!q) return reply('Where is the link?')
  reply("Downloading")
  if (!q.includes('tiktok')) return reply(`That's not a tiktok link!`)
   const dianowmresult = await XeonBotIncTiktok(`${q}`).catch(e => {
 reply("*Can't find anything :(*") 
} )
 
   const diatiktokwiwm = dianowmresult.result.watermark
    conn.sendMessage(from, { video: { url: diatiktokwiwm }, caption: "Here you go!" }, { quoted: mek })
   
  break
//==================================================================================					
case 'devil':

    if (!q) return await conn.sendMessage(from , { text: "need text" }, { quoted: mek } )
lusifarapi.textpro("https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html",
        `${q}`
    ).then(async(data) => {
        try {
        
           
            await conn.sendMessage(from ,{ image: { url : data }  , caption: config.CAPTION } , { quoted: mek })


        } catch (err) {
                    await conn.sendMessage(from , { text: cantfind}, { quoted: mek } )  
        }
    });
break
					
					
					
case 'wolf':


    var topText, bottomText;
    if (q.includes('/')) {
        var split = q.split('/');
        topText = split[0];
        bottomText = split[1];
    } else {
        topText = q ;
        bottomText = '';
    }
    lusifarapi.textpro("https://textpro.me/create-wolf-logo-galaxy-online-936.html", [`${topText}`, `${bottomText}`]).then(async(data) => {
        try {
        
           
            await conn.sendMessage(from ,{ image: { url : data }  , caption: config.CAPTION } , { quoted: mek })


        } catch (err) {
                    await conn.sendMessage(from , { text: cantfind}, { quoted: mek } )
        }
    });
break					
//++++++++++++++++++++++++++++++++++++++++++++++UPDATE END+++++++++++++++++++++++++++++++++++++++++++++++++++				
				        case 'song' : 
					song(  conn , mek , q)
					break
				        case 'dsong' :
					dsong(  conn , mek , q)
					break
					case 'asong' :
					asong(  conn , mek , q)
					break
					case 'getyt' : 
					getyt(conn , mek , q)
					break
				        case 'kick' :
					kick(conn , mek , q)
					break
					case 'react' : 
					react(  conn , mek , q)
					break
				       
				case 'emoji':
				emoji(conn , mek , q)
				break
/*				
	case 'fixupdate':
               updiana(conn , mek , q )
          break


  case 'hasupdate':
               fixdiana(conn , mek , q )
          break*/
					case 'add' :
					add(conn , mek , q)
					break
				        case 'video' :
					video(conn , mek , q)
					break
					case 'vid360' :
					yt360p(conn , mek , q)
					break
					case 'vid480' :
					yt480p(conn , mek , q)
					break
					case 'vid720' :
					yt720p(conn , mek , q)
					break
					case 'sticker' :
				        case 'stic' :
					sticker(conn ,mek ,q)
					break
					case 'setvar' :
					setvar(conn , mek ,q)
					break
			}
			
		} catch (e) {
			const isError = String(e)
			console.log( isError )
		
		}
	})
}

connectToWA()







































































































































































































/*const Config = require('./config');
const config = require('./config');
const events = require("./events");
const lusifarapi = require('textmaker-kaviyaah');
const {
	default: makeWASocket,
	useSingleFileAuthState,
	DisconnectReason,
	getContentType
} = require('@adiwajshing/baileys')
const fs = require('fs')
const P = require('pino')
const qrcode = require('qrcode-terminal')
const simpleGit = require('simple-git');
const git = simpleGit();
const exec = require('child_process').exec;
const Heroku = require('heroku-client');
const { PassThrough } = require('stream');
const heroku = new Heroku({ token: Config.HEROKU.API_KEY })
const { state, saveState } = useSingleFileAuthState('./session.json')
const { song ,  asong ,  dsong , getyt , video , yt720p , yt480p , yt360p}  = require('./plugins/youtube');
const { kick , add } = require('./plugins/admin')
const sticker = require('./plugins/sticker')
const util = require('util')
const alive = require('./plugins/alive')
const react = require('./plugins/react')
const setvar = require('./plugins/heroku')
const { updiana , fixdiana } = require('./plugins/aupdater')
const Language = require('./language');
const Lang = Language.getString('updater');
const { mediafireDl } = require('./lib/mediafire.js')



const { XeonBotIncTiktok } = require('./lib/tiktokbyxeon');




const emoji = require('./plugins/emojitest.js')
const axios = require('axios');
const prefix = '.'
const ownerNumber = ['94769370897']
const cantfind = "*can't find anything*"
const connectToWA = () => {
	const conn = makeWASocket({
		logger: P({ level: 'silent' }),
		printQRInTerminal: true,
		auth: state,
	})
	
	conn.ev.on('connection.update', async(update) => {
		const { connection, lastDisconnect } = update
		if (connection === 'close') {
			if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
				connectToWA()
			}
		} else if (connection === 'open') {
			console.log('conected')
			console.log('Queen Diana is Working'+ config.WORKTYPE +'  Now!')
			const msg = '*Queen Diana is Working'+ config.WORKTYPE +'  Now! 👸*\n\n```Please do not try plugins here. This is your LOG number.```\n_You can use commands in any other chat :)_\n\n\nThanks for using Queen DIANA'
			

const buttonMessage = {
    image: {url: 'https://telegra.ph/file/3217c19d381ae34b38012.jpg'},
    caption: msg  }
await conn.sendMessage(conn.user.id, buttonMessage)
		}
	})
	
	conn.ev.on('creds.update', saveState)
	
	conn.ev.on('messages.upsert', async(mek) => {
		try {
			mek = mek.messages[0]
			if (!mek.message) return
			
			mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
			if (mek.key && mek.key.remoteJid === 'status@broadcast') return
			const type = getContentType(mek.message)
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			
			const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
			const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : ( type == 'listResponseMessage') && mek.message.listResponseMessage.selectedRowId? mek.message.listResponseMessage.selectedRowId : (type == 'buttonsResponseMessage') && mek.message.buttonsResponseMessage.selectedButtonId  ? mek.message.buttonsResponseMessage.selectedButtonId  : (type == "templateButtonReplyMessage") && mek.message.templateButtonReplyMessage.selectedId ? mek.message.templateButtonReplyMessage.selectedId  :  (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
			
			const isCmd = body.startsWith(prefix)
			const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
			
			const args = body.trim().split(/ +/).slice(1)
			const q = args.join(' ')
			const isGroup = from.endsWith('@g.us')
			const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
			const senderNumber = sender.split('@')[0]
			const botNumber = conn.user.id.split(':')[0]
			const pushname = mek.pushName || 'Sin Nombre'
			
			const isMe = botNumber.includes(senderNumber)
			const isOwner = ownerNumber.includes(senderNumber) || isMe
			       
			
			
			
			const reply = async(teks) => {
				await conn.sendMessage(from, { text: teks }, { quoted: mek })
			}
			const sendtempimg = async( text , button , imgurl ) => {
				await conn.sendMessage(from, { text: text , footer: '👸 QUEEN DIANA MD Version', templateButtons: button , image: {url:  imgurl } }, { quoted: mek })
			}
			const sendbutimg = async( text , button , imgurl ) => {
			          	await conn.sendMessage(from, { image: {url:imgurl  }, caption: text, footer: '👸 QUEEN DIANA MD Version', buttons: button , headerType: 4} , { quoted: mek })
		         }
				
			
			
			
			// precence 
			
			 if (config.NO_ONLINE) {
            await conn.sendPresenceUpdate('unavailable' , mek.key.remoteJid);
        }
			
			const msg = mek
			
			// Block chat 
			
			if (config.BLOCKCHAT !== false) {     
            var abc = config.BLOCKCHAT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? abc.includes(msg.key.remoteJid.split('@')[0]) : abc.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        if (config.SUPPORT == '94769370897-1415817281') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        if (config.SUPPORT2 == '94769370897-1458298055') {     
            var tsup = config.SUPPORT2.split(',');                            
            if(msg.key.remoteJid.includes('-') ? tsup.includes(msg.key.remoteJid.split('@')[0]) : tsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        if (config.SUPPORT3 == '94769370897-1446476993') {     
            var nsup = config.SUPPORT3.split(',');                            
            if(msg.key.remoteJid.includes('-') ? nsup.includes(msg.key.remoteJid.split('@')[0]) : nsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
         if (config.Support4 == '94769370897-1630672792') {     
            var nsup = config.Support4.split(',');                            
            if(msg.key.remoteJid.includes('-') ? nsup.includes(msg.key.remoteJid.split('@')[0]) : nsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
         if (config.AMDI_1 == '94769370897-1533638214') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
       
         if (config.AMDI_3 == '94769370897-1631633729') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
         if (config.AMDI_4 == '94769370897-1631905677') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
         if (config.AMDI_5 == '94769370897-1636094186') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
         if (config.AMDI_6 == '972542559113-1376904403') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
         if (config.AMDI_7 == '94769370897-1636286090') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
			
			// commands
			
			switch (command) {

case 'alive':
alive(conn ,mek )

break


case 'mfire': 
	
if (!q) return reply("need url")
//if (!isUrl(args[0]) && !args[0].includes('mediafire.com')) return reply(`The link you provided is invalid`)
const baby1 = await mediafireDl(q)
if (baby1[0].size.split('MB')[0] >= 999) return reply('*File Over Limit* '+util.format(baby1))
const resuldiat4 = `*MEDIAFIRE DOWNLOADER*
				
*Name* : ${baby1[0].nama}
*Size* : ${baby1[0].size}
*Mime* : ${baby1[0].mime}
*Link* : ${baby1[0].link}`
reply(`${resuldiat4}`)
conn.sendMessage(from, { document : { url : baby1[0].link}, fileName : baby1[0].nama, mimetype: baby1[0].mime }, { quoted : mek }).catch ((err) => reply("error🥲"))

break

					
					
	case 'menu':	
		reply('no menu')		
	break
					
				case 'owner' :
					const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN:kavishka sandaruwan\n' // full name
            + 'ORG:Queen Diana;\n' // the organization of the contact
            + 'TEL;type=CELL;type=VOICE;waid=94789768567:+94 78 976 8567 \n' // WhatsApp ID + phone number
            + 'END:VCARD'
 await conn.sendMessage(
    from,
    { 
        contacts: { 
            displayName: 'kavishka sandaruwan (DIANA OWNEER)', 
            contacts: [{ vcard }] 
        }
    } , { quoted: mek }
)
					
					break
//================================================UPDATE=====================================================					
				case 'updatenow' :	

		if (!isMe) return await conn.sendMessage(from , { text: "*YOU ARE NOT BOT OWNER*" }, { quoted: mek } )
					 await git.fetch();
    var commits = await git.log([Config.BRANCH + '..origin/' + Config.BRANCH]);
    if (commits.total === 0) {
      //  reply('no updates')  
await  conn.sendMessage(from , { text: Lang.UPDATE }, { quoted: mek } )
  
    } else {
    if (Config.HEROKU.HEROKU) {
            try {
                var app = await heroku.get('/apps/' + Config.HEROKU.APP_NAME)
            } catch {
                conn.sendMessage(from , { text: Lang.INVALID_HEROKU + "\n\n" + IN_AF }, { quoted: mek } );
            }
            conn.sendMessage(from , { text: Lang.UPDATING }, { quoted: mek } );

            git.fetch('upstream', Config.BRANCH);
            git.reset('hard', ['FETCH_HEAD']);

            var git_url = app.git_url.replace(
                "https://", "https://api:" + Config.HEROKU.API_KEY + "@"
            )
            
            try {
                await git.addRemote('heroku', git_url);
            } catch { console.log('heroku remote ekli'); }
            await git.push('heroku', Config.BRANCH);

            conn.sendMessage(from , { text: Lang.UPDATED_LOCAL }, { quoted: mek } );
            conn.sendMessage(from , { text: Lang.AFTER_UPDATE }, { quoted: mek } );

        } 
    }
	break	
//===============================================CHECK UPDATE=========================================					
					
					case 'checkupdate' :	
					
		

					if (!isMe) return await conn.sendMessage(from , { text: "*YOU ARE NOT BOT OWNER*" }, { quoted: mek } )
					 await git.fetch();
    var commits = await git.log([Config.BRANCH + '..origin/' + Config.BRANCH]);
    if (commits.total === 0) {
       // reply('no updates')    
await  conn.sendMessage(from , { text: Lang.UPDATE }, { quoted: mek } )
    } else {

        var newzels = Lang.NEW_UPDATE ;
        commits['all'].map(
            (commit) => {
                newzels += '\n\n' +'🔹 [' + commit.date.substring(0, 10) + ']: ' + commit.message + ' ◁◁' + commit.author_name + '▷▷\n';
            }
        );
      //  reply(ne
await  conn.sendMessage(from , { text: newzels }, { quoted: mek } )

    }

	break
					
					

/*
case 'tiktok':
  	
  if (!q) return reply('Where is the link?')
  reply("idqpn tikak")
  if (!q.includes('tiktok')) return reply(`That's not a tiktok link!`)
   const musim_rambutan = await XeonBotIncTiktok(`${q}`).catch(e => {
 reply("error🥲") 
} )
   console.log(musim_rambutan)
   const xeontiktokop = musim_rambutan.result.watermark
texttk = `Wanna download no watermark or audio?
_Please choose the button below_`
let buttons = [
{buttonId: `.ttnowm ${q}`, buttonText: {displayText: 'No Watermark ❌'}, type: 1},
{buttonId: `.ttaud ${q}`, buttonText: {displayText: 'Audio 🎶'}, type: 1}
]
let buttonMessage = {
video: {url:xeontiktokop},
caption: texttk,
footer: `kaviyyattc`,
buttons: buttons,
headerType: 4
}
conn.sendMessage(from, buttonMessage, {quoted:mek})

break




case 'tktok':
  	
  if (!q) return reply('Where is the link?')
  reply("Downloading")
  if (!q.includes('tiktok')) return reply(`That's not a tiktok link!`)
   const result = await XeonBotIncTiktok(`${q}`).catch(e => {
 reply("*Can't find anything :(*") 
} )
   
   const xeontiktokop = result.result.watermark
texttk = `Your tiktik video type\n\n



_Please choose the button below_`
let buttons = [
{buttonId: `ttwm ${q}`, buttonText: {displayText: :With Watermark 🖇️'}, type: 1},
{buttonId: `ttnowm ${q}`, buttonText: {displayText: 'No Watermark ❌'}, type: 1},
{buttonId: `ttaud ${q}`, buttonText: {displayText: 'Audio 🎶'}, type: 1}


]
let buttonMessage = {
image: {url: "https://telegra.ph/file/3217c19d381ae34b38012.jpg"},
caption: texttk,
footer: `Queen diana TikTok downloader`,
buttons: buttons,
headerType: 4
}
conn.sendMessage(from, buttonMessage, {quoted:mek})

break




*b  /


case 'tiktok':
if (!q) return reply('Need a Tik Tok video link')
  if (!q.includes('tiktok')) return reply(`That's not a tiktok link!`)
  
const buttons = [ {buttonId: `.ttwiwm ${q}`, buttonText: {displayText: 'With water mark'}, type: 1}, 
                   {buttonId: `.ttnowm ${q}`, buttonText: {displayText: 'Without water mark'}, type: 1}, 
                   {buttonId: `.ttonaud ${q}`, buttonText: {displayText: 'Audio Only'}, type: 1} ] 
          
          
          const buttonMessage = { 
          
                                   text: "Select your choice in here\n\n\n", 
                                   footer: 'QUEEN DIANA',
                                   buttons: buttons, 
                                   headerType: 1 
                                   } 
          
        
         conn.sendMessage(from, buttonMessage, {quoted:mek})
break

/*
 case 'ttnowm':
  	
	
  if (!q) return reply('Where is the link?')
  reply("Downloading")
  if (!q.includes('tiktok')) return reply(`That's not a tiktok link!`)
   const result = await XeonBotIncTiktok(`${q}`).catch(e => {
 reply("*Can't find anything :(*") 
} )
 
   const xeonytiktoknowm = result.result.nowatermark
    conn.sendMessage(from, { video: { url: xeonytiktoknowm }, caption: "Here you go!" }, { quoted: mek })
   
  break 
  
case 'ttaud':
	
	
  if (!q) return reply('Where is the audio?')
  if (!q.includes('tiktok')) return reply(`That's not a tiktok link!`)
   const result = await XeonBotIncTiktok(`${q}`).catch(e => {
 reply("*Can't find anything :(*") 
} )
 
   const xeonytiktokaudio = result.result.nowatermark
    conn.sendMessage(from, { audio: { url: xeonytiktokaudio }, mimetype: 'audio/mp4' }, { quoted: mek })
   
 break
 
/
 
case 'ttwm':
  	
	
  if (!q) return reply('Where is the link?')
  reply("Downloading")
  if (!q.includes('tiktok')) return reply(`That's not a tiktok link!`)
   const result = await XeonBotIncTiktok(`${q}`).catch(e => {
 reply("*Can't find anything :(*") 
} )
 
   const xeonytiktokwm = result.result.watermark
    conn.sendMessage(from, { video: { url: xeonytiktokwm }, caption: "Here you go!" }, { quoted: mek })
   
  break
  
*==/
					
 case 'ttnowm':
  		
  if (!q) return reply('Where is the link?')
  reply("Downloading")
  if (!q.includes('tiktok')) return reply(`That's not a tiktok link!`)
   const result = await XeonBotIncTiktok(`${q}`).catch(e => {
 reply("*Can't find anything :(*") 
} )
 
   const diatiktoknowm = result.result.nowatermark
    conn.sendMessage(from, { video: { url: diatiktoknowm }, caption: "Here you go!" }, { quoted: mek })
   
  break
  
case 'ttonaud':
	
	
  if (!q) return reply('Where is the audio?')
  if (!q.includes('tiktok')) return reply(`That's not a tiktok link!`)
   const diataresult = await XeonBotIncTiktok(`${q}`).catch(e => {
 reply("*Can't find anything :(*") 
} )
 
   const diatiktokaudio = diataresult.result.nowatermark
    conn.sendMessage(from, { audio: { url: diatiktokaudio }, mimetype: 'audio/mp4' }, { quoted: mek })
   
 break
 
 
 
case 'ttwiwm':
  		
  if (!q) return reply('Where is the link?')
  reply("Downloading")
  if (!q.includes('tiktok')) return reply(`That's not a tiktok link!`)
   const dianowmresult = await XeonBotIncTiktok(`${q}`).catch(e => {
 reply("*Can't find anything :(*") 
} )
 
   const diatiktokwiwm = dianowmresult.result.watermark
    conn.sendMessage(from, { video: { url: diatiktokwiwm }, caption: "Here you go!" }, { quoted: mek })
   
  break
					
case 'devil':

    if (!q) return await conn.sendMessage(from , { text: "need text" }, { quoted: mek } )
lusifarapi.textpro("https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html",
        `${q}`
    ).then(async(data) => {
        try {
        
           
            await conn.sendMessage(from ,{ image: { url : data }  , caption: config.CAPTION } , { quoted: mek })


        } catch (err) {
                    await conn.sendMessage(from , { text: cantfind}, { quoted: mek } )  
        }
    });
break
					
					
					
case 'wolf':


    var topText, bottomText;
    if (q.includes('/')) {
        var split = q.split('/');
        topText = split[0];
        bottomText = split[1];
    } else {
        topText = q ;
        bottomText = '';
    }
    lusifarapi.textpro("https://textpro.me/create-wolf-logo-galaxy-online-936.html", [`${topText}`, `${bottomText}`]).then(async(data) => {
        try {
        
           
            await conn.sendMessage(from ,{ image: { url : data }  , caption: config.CAPTION } , { quoted: mek })


        } catch (err) {
                    await conn.sendMessage(from , { text: cantfind}, { quoted: mek } )
        }
    });
break					
//++++++++++++++++++++++++++++++++++++++++++++++UPDATE END+++++++++++++++++++++++++++++++++++++++++++++++++++				
				        case 'song' : 
					song(  conn , mek , q)
					break
				        case 'dsong' :
					dsong(  conn , mek , q)
					break
					case 'asong' :
					asong(  conn , mek , q)
					break
					case 'getyt' : 
					getyt(conn , mek , q)
					break
				        case 'kick' :
					kick(conn , mek , q)
					break
					case 'react' : 
					react(  conn , mek , q)
					break
				       
				case 'emoji':
				emoji(conn , mek , q)
				break
/*				
	case 'fixupdate':
               updiana(conn , mek , q )
          break


  case 'hasupdate':
               fixdiana(conn , mek , q )
          break*==/
					case 'add' :
					add(conn , mek , q)
					break
				        case 'video' :
					video(conn , mek , q)
					break
					case 'vid360' :
					yt360p(conn , mek , q)
					break
					case 'vid480' :
					yt480p(conn , mek , q)
					break
					case 'vid720' :
					yt720p(conn , mek , q)
					break
					case 'sticker' :
				        case 'stic' :
					sticker(conn ,mek ,q)
					break
					case 'setvar' :
					setvar(conn , mek ,q)
					break
			}
			
		} catch (e) {
			const isError = String(e)
			console.log( isError )
		
		}
	})
}

connectToWA()  */
