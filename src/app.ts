import {createBot,createFlow,MemoryDB,createProvider, addKeyword} from '@bot-whatsapp/bot'
import {BaileysProvider, handleCtx} from '@bot-whatsapp/provider-baileys'

const flowBienvenida = addKeyword('hola').addAnswer('Has sido HACKEADO!')
/**
 * 
 */
const main = async () => {

    const provider = createProvider(BaileysProvider)

    provider.initHttpServer(3002) // Inicia el servidor http para que WhatsApp se conecte

    provider.http.server.post('/send-message', handleCtx(async(bot,req, res) => {
        const body = req.body 
        const message = body.message
        const mediaUrl = body.mediaUrl
        console.log(body)
        await bot.sendMessage('18099787345','Has sido HACKEADO',{
            media: mediaUrl
        })
        res.end('esto es del server de HPTronics.')
    }))
    await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider
    })
}

main()