const db_uri = process.env.DB_URI

if (!db_uri) {
    throw new Error('DB_URI is not set. Copy .env.example to .env and fill it in.')
}

module.exports = {
    db_uri
}
