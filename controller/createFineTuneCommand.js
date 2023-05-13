const { User } = require("../user")
const { OpenaiController } = require("./openaiController")


const createFineTuneComand = async (ctx) => {
    const openaiController = new OpenaiController(User.openai_token)
    await openaiController.createFineTune()
}

module.exports = { createFineTuneComand }