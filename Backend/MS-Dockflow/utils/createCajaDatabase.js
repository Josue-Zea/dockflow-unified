const { client, createUUID } = require("../database/conection");

const createCajaDatabase = async (nombre, idestante) => {
    const uuidCaja = await createUUID();
    let result = null;
    if( idestante !== undefined ) {
        const query = 
        "INSERT INTO Caja (Id, Nombre, idEstante, Lleno) VALUES (?, ?, ?, ?)";
        result = await client.execute(query, [uuidCaja, nombre, idestante, 0], { prepare : true });        
    } else {
        const query = 
        "INSERT INTO Caja (Id, Nombre, Lleno) VALUES (?, ?, ?)";
        result = await client.execute(query, [uuidCaja, nombre, 0], { prepare : true });
    }

    if (result.hasError) {
        throw new Error(result.error);
    }
    return {
        correct: true,
        data: result
    };
}

module.exports = {
    createCajaDatabase
};