const getConnection = require('../database/connection.js');
const sql = require('mssql');

const getAdminSolicitations = async (req, res) => {
    const pool = await getConnection()

    let query = 'SELECT * FROM solicitations WHERE 1=1';
    let status = req.query.status;
    let name = req.query.name;
    let description = req.query.description;

    if (status && status !== 'null') query += ` AND status = '${status}'`;
    if (name && name !== 'null') query += ` AND name LIKE '%${name}%'`;
    if (description && description !== 'null') query += ` AND description LIKE '%${description}%'`;

    let result = await pool.request().query(query);

    res.status(200).json(result.recordset);
}

module.exports = {
    getAdminSolicitations,
};