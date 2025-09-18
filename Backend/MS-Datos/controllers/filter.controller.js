const { filterLogsDB } = require("../utils/filterLogs");
const { getUsersDB } = require("../utils/getUsersDB");

const getUsers = async (_, res) => {
    const result = await getUsersDB();
    let code = 0, data = { message: "" };
    if (result.correct) {
        code = 200; data = result.data;
    } else {
        code = 400; data = { message: "Ocurrió algún error" };
    }
    res.status(code).send(data);
};

const filterLogs = async (req, res) => {
    const { begin, end, user, limit } = req.body;
    const result = await filterLogsDB(begin, end, user, limit);
    let code = 0, data = { message: "" };
    if (result.correct) {
        code = 200; data = result.data;
    } else {
        code = 400; data = { message: "Ocurrió algún error" };
    }
    res.status(code).send(data);
};

module.exports = {
    getUsers,
    filterLogs
};