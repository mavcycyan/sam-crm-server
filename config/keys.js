const db_name = 'samcrm'
const db_user = 'samroot'
const db_password = process.env.DB_PASSWORD


module.exports = {
    db_uri : `mongodb+srv://${db_user}:${db_password}@cluster0.3gsa4.mongodb.net/${db_name}?retryWrites=true&w=majority`
}