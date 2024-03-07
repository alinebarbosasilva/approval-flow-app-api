const sql = require("mssql")

const dbSettings = {
    user: "aline",
    password: "thor1618",
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