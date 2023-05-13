const axios = require('axios');

const uploadCommand = async (ctx) => {
    console.log(ctx.update.message.document)
    const {file_id: fileId, file_name, mime_type} = ctx.update.message.document;
    const isJson = mime_type === "application/json"
    if(!isJson){
        console.log({ chat_id: ctx.message.id, status: "Enviou arquivo do tipo errado!", file: mime_type})
        return ctx.reply("Somente arquivo do tipo json é permitido")
    }
    const fileUrl = await ctx.telegram.getFileLink(fileId);
    const response = await axios.get(fileUrl);
    console.log(JSON.stringify(response.data))
}

module.exports = { uploadCommand }