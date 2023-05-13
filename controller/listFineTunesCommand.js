const { User } = require("../user")
const { OpenaiController } = require("./openaiController")
const { Markup } = require("telegraf");


const extrairIdentifiers = ( item ) => {
    const key = item.id
    const filename = item.filename
    return { key, filename }
}



const listFineTunesCommand = async (ctx) => {
    
    const hasToken = User.openai_token
    
    if(!hasToken) return ctx.reply("Você precisa adicionar uma chave primeiro")
    const openaiController = new OpenaiController(User.openai_token)
    
    const listFineTune = await openaiController.listFiles()
    if(!listFineTune.length) return ctx.reply("Você ainda não salvou nenhum modelo.")

    const listIdentifiers = listFineTune.map(extrairIdentifiers)
    User.fineTunes = [...listIdentifiers]
    
    //callback: Markup.button.callback(filename, id)
    

   for( identifier of listIdentifiers){
    await ctx.reply("Escolha um dos modelos abaixo se deja treinar.", Markup
        .inlineKeyboard([
            Markup.button.callback(`• ${identifier["filename"]}`, identifier.key)
        ])
    )
   }
}

module.exports = { listFineTunesCommand }