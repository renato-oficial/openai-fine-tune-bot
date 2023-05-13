const { database } = require("./prisma/prismaClient");

const createUser = async () => {
    await database.user.create({
        data: {
            chatId: "5549522685",
            username: "Renato",
            lastName: "A.",
        }
    })
}

const updateUser = async () => {
   const update = await database.user.update({
        where: { chatId : "5549522685" },
        data: { orderId: "56321082513"}
    })
    console.log(update)
}

const deleteUser = async () => {
    const del = await database.user.delete({
        where: { chatId: "5406166623" },
      })
    console.log(del)
}
deleteUser()
.then( async () => {
    await database.$disconnect()
}) 
.catch(async (e) => {
    console.error(e)
    await database.$disconnect()
    process.exit(1)
})