const { client } = require("../database/conection");
const { userResponse } = require("../helpers/objectResponses");

const getUsersDB = async () => {
    try {
        const result   = await queryToDb();
        const parsedUsers = parseUsers(result);
        return {
            correct: true,
            data: parsedUsers
        };
    }catch(e){
        return {
            correct: false,
            data: {}
        };
    }
};

const queryToDb = async () => {
    const query = "SELECT ID, NOMBRE FROM USUARIO";
    const result = await client.execute(query, []);

    if (result.hasError) {
        throw new Error(result.error);
    }

    return result.rows;
}

const parseUsers = (users) => {
    let newUsers = [];
    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        const newUser = userResponse(
            element.id,
            element.nombre,
        );
        newUsers.push(newUser);
    }
    return [...newUsers];
}

module.exports = {
    getUsersDB
}