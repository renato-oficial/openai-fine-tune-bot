const { PrismaClient } = require('@prisma/client')

module.exports = {
    database: new PrismaClient()
}