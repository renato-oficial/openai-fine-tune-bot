const path = require("path")
const { Markup } = require("telegraf");

const messageInitialCommand =  async (ctx) => {
    const description = [
        `• Bem-vindo ${ctx.from.first_name}\n`,
        `• PIN de cliente: ${ctx.from.id}`,
        "• Para recarregar envie /recarga",
        "• Ou clique no botão recarregar \n",
        `• Canal: @${ctx.botInfo.username}`,
        `• Nosso suporte: @suporte_numero`,
      ];
    
      const { message_id } = await ctx.telegram.sendPhoto(
        ctx.from.id,
        {
          source: path.join(__dirname, "..","image", "capa.jpeg"),
        },
        {
          caption: description.join("\n"),
          parse_mode: "HTML",
          ...Markup.inlineKeyboard([
            [
              Markup.button.callback("• Nosso FAQ", "faq"),
              Markup.button.callback("• Recarregar", "/recarregar"),
            ],
          ]),
        }
      );
    
    setTimeout(() => ctx.deleteMessage(message_id), 60 * 1000);
    
}

module.exports = { messageInitialCommand }