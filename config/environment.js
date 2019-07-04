const port = process.env.PORT || 4000
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/pet-app'
const secret = process.env.SECRET || 'shh its a secret'

module.exports = { port, dbURI, secret }
