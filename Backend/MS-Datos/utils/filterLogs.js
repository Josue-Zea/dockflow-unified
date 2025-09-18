const { client } = require("../database/conection");
const { logResponse } = require("../helpers/objectResponses");

const filterLogsDB = async (begin, end, user, limit) => {
    try {
        const result = await queryToDb(begin, end, user, limit);
        const parsedLogs = parseLogs(result);
        return {
            correct: true,
            data: parsedLogs
        };
    } catch (e) {
        return {
            correct: false,
            data: {}
        };
    }
};

const queryToDb = async (begin, end, user, limit) => {
    const head = `SELECT * FROM BITACORA`;
    const dates = begin === undefined ?
        "" : `FECHA >= toTimestamp('${begin}') AND FECHA < toTimestamp('${end}')`;
    const userFilter = user === undefined ?
        "" : `IDUSUARIO = ${user}`;
    const limitFilter = limit === undefined ?
        "" : `LIMIT ${limit}`;

    let query = `${head}`;
    console.log(begin, end, user, limit);
    if (dates !== "" || userFilter !== "") {
        query = `${query} WHERE `
    }
    query = dates !== "" ? `${query} ${dates}` : query;
    if (dates !== "" && userFilter !== "") query = `${query} AND`;
    query = userFilter !== "" ? `${query} ${userFilter}` : query;
    query = limitFilter !== "" ? `${query} ${limitFilter}` : query;
    query = `${query} ALLOW FILTERING`;
    console.log(query);
    const result = await client.execute(query, []);

    if (result.hasError) {
        throw new Error(result.error);
    }
    return result.rows;
}

const parseLogs = (logs) => {
    let newLogs = [];
    for (let i = 0; i < logs.length; i++) {
        const element = logs[i];
        const newLog = logResponse(
            element.id,
            element.descripcion,
            element.fecha,
            element.idusuario,
            element.operacion,
        );
        newLogs.push(newLog);
    }
    return [...newLogs];
}

module.exports = {
    filterLogsDB
}