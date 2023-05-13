const { OpenaiController } = require("./controller/openaiController");
const { User } = require("./user");

const extrairIdentifiers = ( item ) => {
    const identificator = item.id
    const filename = item.filename
    return { identificator, filename }
}

( async () => {

    const openaiController = new OpenaiController("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")
    const listFineTune = await openaiController.listFiles()
    const listIdentifiers = listFineTune.map(extrairIdentifiers)
    User.fineTunes = [...listIdentifiers]
    console.log(User)
    const hasFineTune = User.fineTunes.find((item) => item.identificator === "file-RcFj7chNTlKDImpJlqRMTdby")
    console.log(hasFineTune)
    if(hasFineTune){
        console.log("Achei")
    }
})()