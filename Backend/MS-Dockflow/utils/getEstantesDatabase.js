const { client } = require("../database/conection");

const getEstantesDatabase = async () => {
    const query =
    "SELECT * FROM estante ALLOW FILTERING";
    const result = await client.execute(query);

    if (result.hasError) {
        throw new Error(result.error);
    }
    return {
        correct: true,
        data: result.rows
    };
};

module.exports = {
    getEstantesDatabase
};