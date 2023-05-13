require("dotenv").config();
const { BullMQQueue } = require("./controller/bullMQQueue"), queue = new BullMQQueue('recarga-queue', { connection: "redis://default:NUnNYFlr7tlVI1Qs91NsS6MjdJ5ZCRYp@redis-10596.c273.us-east-1-2.ec2.cloud.redislabs.com:10596"});


( async () => {
    await queue.addJob('recarga-request', {
        chatId: "vazio",
        email: "vazio",
        balance: "vazio"
      })
    await queue.initialize('recarga-queue', { connection: "redis://default:NUnNYFlr7tlVI1Qs91NsS6MjdJ5ZCRYp@redis-10596.c273.us-east-1-2.ec2.cloud.redislabs.com:10596"})
    queue.worker.on("completed", async (job) => {
        console.log("completed", job["data"])
    })
})()
