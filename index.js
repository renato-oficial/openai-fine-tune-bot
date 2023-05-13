//https://docs.github.com/pt/get-started/getting-started-with-git/managing-remote-repositories

const { Telegraf, Markup } = require('telegraf');
const { message } = require('telegraf/filters');
const { uploadCommand } = require('./controller/uploadCommand');
const { User } = require('./user');
const { messageInitialCommand } = require('./controller/messageInitialComand');
const { listFineTunesCommand } = require('./controller/listFineTunesCommand');
const { createFineTuneComand } = require('./controller/createFineTuneCommand');
require('dotenv').config()



const { BOT_TOKEN } = process.env

const bot = new Telegraf(BOT_TOKEN, {
  polling: true,
});


bot.start(messageInitialCommand);

bot.telegram.setMyCommands([
    
    {
        command: "start",
        description: "inicio"
    },
    {
        command: "config",
        description: "Configurar chave da api"
    },
    {
        command: "upload",
        description: "Adicionar arquivo"
    },
    {
        command: "modelos",
        description: "Listar arquivo salvo"
    },
    {
        command: "treinados",
        description: "Listar arquivo treinados"
    }
    
])

bot.command('config', (ctx) =>{
    
    ctx.reply('⬇️ Digite sua chave da openai para que possamos treinar sua ia. ⬇️')
    bot.on(message('text'), (ctx) => {
    
       const isToken = /sk-(\w{0,51})/.test(ctx.message.text)
       if(!isToken) return ctx.reply("🚫 O token digitado é inválido!")
       User.openai_token = ctx.message.text
       return ctx.reply("✅ Chave adicionada com sucesso!")
    })

});

bot.on('callback_query', async (ctx) => {
    
    const { data }  = ctx.callbackQuery
    
    const hasFineTune = User.fineTunes.find((item) => item.key == String(data))
    
    if(hasFineTune){
        
        
         return await ctx.reply(`
** ✅ Escolha um modelo para treinar sua IA 😉
➡️ Nome do arquivo: ${hasFineTune["filename"]}
🆔 Identificador: ${hasFineTune["key"]} **`, Markup
             .inlineKeyboard([
                [ Markup.button.callback("• Sim, por favor!", "yep")],
                [Markup.button.callback("• Não, obrigado!", "not")]
            ])
        )
    }
    
    if( !hasFineTune && !data.includes("yes") ) return ctx.reply("⚠️ Você não possui arquivos.")

    if(data.includes("yep") && hasFineTune){
       await createFineTuneComand(hasFineTune.key)
    }
    
})

bot.command('modelos', listFineTunesCommand)
bot.on(message('document'), uploadCommand)
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));