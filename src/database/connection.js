const sql = require("mssql")

const dbSettings = {
    user: "user",
    password: "Senha@123",
    database: "approval_flow",
    server: "localhost",
    options: {
        encrypt: true,
        trustServerCertificate: true,
        enableArithAbort: true
    }
}

const getConnection = async () => {
    try {
        return await sql.connect(dbSettings);
    } catch (error){
        console.error(error);
    }
}
module.exports = getConnection;