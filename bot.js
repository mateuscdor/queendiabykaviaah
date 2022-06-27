const Config = require('./config');
const config = require('./config');
const events = require("./events");
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
const alive = require('./plugins/alive')
const react = require('./plugins/react')
const setvar = require('./plugins/heroku')
const emoji = require('./plugins/emojitest.js')
const axios = require('axios');
const prefix = '.'
const ownerNumber = ['94769370897']

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
			const msg = '*Queen Diana is Working Now! 👸*\n\n```Please do not try plugins here. This is your LOG number.```\n_You can use commands in any other chat :)_\n\n\nThanks for using Queen DIANA'
			

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
					
					
	case 'menu':	
		reply('no menu')		
	break
					
				case 'owner' :
					const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN:kavishka sandaruwan\n' // full name
            + 'ORG:Queen Diana;\n' // the organization of the contact
            + 'TEL;type=CELL;type=VOICE;waid=94769370897:+94 76 937 0897 \n' // WhatsApp ID + phone number
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
					if (!isMe) return
					 await git.fetch();
    var commits = await git.log([Config.BRANCH + '..origin/' + Config.BRANCH]);
    if (commits.total === 0) {
        reply('no updates')    
    } else {
    if (Config.HEROKU.HEROKU) {
            try {
                var app = await heroku.get('/apps/' + Config.HEROKU.APP_NAME)
            } catch {
               reply('invalid heroku app name')
            }

            git.fetch('upstream', Config.BRANCH);
            git.reset('hard', ['FETCH_HEAD']);

            var git_url = app.git_url.replace(
                "https://", "https://api:" + Config.HEROKU.API_KEY + "@"
            )
            
            try {
                await git.addRemote('heroku', git_url);
            } catch { console.log('heroku remote ekli'); }
            await git.push('heroku', Config.BRANCH);

           reply('updated')
            
        } 
    }
	break	
//===============================================CHECK UPDATE=========================================					
					
					case 'checkupdate' :	
					if (!isMe) return
					 await git.fetch();
    var commits = await git.log([Config.BRANCH + '..origin/' + Config.BRANCH]);
    if (commits.total === 0) {
        reply('no updates')    
    } else {

        var newzels = "YOU HAVE NEW UPDATE \n\n ";
        commits['all'].map(
            (commit) => {
                newzels += '🔹 [' + commit.date.substring(0, 10) + ']: ' + commit.message + ' ◁◁' + commit.author_name + '▷▷\n';
            }
        );
        reply(newzels)

    }
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
